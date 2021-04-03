import * as A from 'fp-ts/lib/Array';
import * as E from 'fp-ts/lib/Either';
import * as O from 'fp-ts/lib/Option';
import * as TE from 'fp-ts/lib/TaskEither';
import { pipe } from 'fp-ts/lib/function';

import { KeycapSize, KeyFrame } from '../../types';

export default async function getPcb(name: string): Promise<KeyFrame[]> {
  const rawCsvOrError = await readCsvFile(name)();
  if (E.isLeft(rawCsvOrError)) {
    throw new Error(rawCsvOrError.left);
  } else {
    return parseCsv(rawCsvOrError.right);
  }
}

function parseCsv(csvRaw: string): KeyFrame[] {
  const rows: string[] = csvRaw.trim().split('\n');
  const rowToKeyFrames: (y: number, row: string) => KeyFrame[] = (y, row) =>
    pipe(
      row.split(',').filter((v) => v != ''),
      A.mapWithIndex(
        (x, size) =>
          ({
            position: { x, y },
            size: toKeycapSize(size),
            isPut: false,
            keycap: O.none,
          } as KeyFrame)
      )
    );

  return pipe(
    rows,
    A.chainWithIndex((y, raw) => rowToKeyFrames(y, raw))
  );
}

function readCsvFile(pcbName: string): TE.TaskEither<string, string> {
  return pipe(
    TE.tryCatch(
      () =>
        fetch(`/pcb/${pcbName}`).then((resp) => {
          if (resp.ok) {
            const readerOrError = E.fromNullable(
              "Unexpected error: Can't read body"
            )(resp.body?.getReader());

            return pipe(
              TE.fromEither(readerOrError),
              TE.chain((reader) => decode(reader))
            );
          } else {
            throw new Error('PCB template is not found.');
          }
        }),
      String
    ),
    TE.flatten
  );
}

// TODO: Eitherに切り替えたいかも
function toKeycapSize(strNum: string): KeycapSize {
  if (parseFloat(strNum)) {
    return `${strNum}U` as KeycapSize;
  } else if (strNum === 'ISOEnter') {
    return strNum;
  } else {
    throw new Error(`Can't parse to keycap size: ${strNum}`);
  }
}

function decode(
  reader: ReadableStreamDefaultReader<Uint8Array>
): TE.TaskEither<string, string> {
  const decoder = new TextDecoder('utf-8');
  return TE.tryCatch(
    () => reader.read().then((r) => decoder.decode(r.value)),
    String
  );
}
