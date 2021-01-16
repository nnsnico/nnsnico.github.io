import * as E from 'fp-ts/lib/Either';
import * as O from 'fp-ts/lib/Option';

import * as B from './boolean';

test('suceed all', function () {
  // fold

  expect(B.fold(true, 't', 'f')).toEqual('t');

  expect(B.fold(false, 't', 'f')).toEqual('f');

  // option

  expect(B.option(true, 1)).toEqual(O.some(1));

  expect(B.option(false, 1)).toEqual(O.none);

  // either

  expect(B.either(true, 'error', 1)).toEqual(E.right(1));

  expect(B.either(false, 'error', 1)).toEqual(E.left('error'));
});
