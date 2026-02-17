import { type Int, type AsNumber, type AnyInt, type Lower, type Succ, type Sum, type Prec, type Diff, type IsGreaterStrict, type Range, type _0, number, type GreaterThan } from "./integers"

export class SizedArray<T, N extends AnyInt> {
    readonly #arr: T[]

    constructor(...t: T[] & { length: AsNumber<N> }) {
        this.#arr = t
    }

    get length(): AsNumber<N> {
        return this.#arr.length
    }

    at<I extends Range<_0, Prec<N>>>(i: I): T;
    at(i: Lower<Prec<N>>): T;
    at<I extends number>(i: I & GreaterThan<T, I>): T | undefined;
    at(i: Lower<Prec<N>> | AnyInt | number): T | undefined {
        return this.#arr.at(number(i))
    }

    slice<I extends Range<_0, Prec<N>>>(start: I): SizedArray<T, Diff<N, I>>;
    slice<S extends Range<_0, Prec<N>>, E extends Range<_0, Prec<N>>>(start: S, end: E): SizedArray<T, Diff<E, S>>;
    slice<S extends Range<_0, Prec<N>>, E extends Range<_0, Prec<N>>>(start: S, end?: E): SizedArray<T, AnyInt> {
        return new SizedArray(...this.#arr.slice(number(start), end !== undefined ? number(end) : undefined))
    }

    concat<M extends AnyInt>(other: SizedArray<T, M>): SizedArray<T, Sum<N, M>>;
    concat(other: SizedArray<T, AnyInt>): SizedArray<T, AnyInt> {
        const newArr = this.#arr.concat(...other) as unknown as T[]
        return new SizedArray(...newArr)
    }

    push(t: T): SizedArray<T, Succ<N>> {
        const newArr = this.#arr.concat(t) as T[]
        return new SizedArray(...newArr)
    }

    pop(): IsGreaterStrict<N, _0> extends true ? [T, SizedArray<T, Prec<N>>] : [undefined, SizedArray<T, _0>] {
        const newArr = [...this.#arr] as T[]
        const popped = newArr.pop()
        return [popped, new SizedArray(...newArr)] as any
    }

    map<U>(f: (t: T) => U): SizedArray<U, N> {
        return new SizedArray(...this.#arr.map(f))
    }

    toRaw(): Array<T> {
        return [...this.#arr]
    }

    *[Symbol.iterator]() {
        yield* this.#arr
    }

    get [Symbol.toStringTag]() {
        return this.#arr.toString()
    }
}