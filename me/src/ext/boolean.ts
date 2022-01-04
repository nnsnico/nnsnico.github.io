import * as E from 'fp-ts/lib/Either';
import * as O from 'fp-ts/lib/Option';

export function fold<T>(expr: boolean, trueCase: T, falseCase: T): T {
  if (expr) {
    return trueCase;
  } else {
    return falseCase;
  }
}

export function option<A>(expr: boolean, a: A): O.Option<A> {
  return fold(expr, O.some(a), O.none);
}

export function either<L, R>(expr: boolean, l: L, r: R): E.Either<L, R> {
  return fold(expr, E.right(r), E.left(l));
}
