import type { Int, AsNumber, ConstInt, NumberLowerThan, Succ, Sum, Prec, Diff } from "./integers.ts"

type ArrayLengthInitializer<N extends ConstInt> = AsNumber<N>[]
type ArrayContentInitializer<T, N extends ConstInt> = T[] & { length: AsNumber<N> }
type ArrayInitializer<T, N extends ConstInt> = ArrayContentInitializer<T, N> | ArrayLengthInitializer<N>

function _isArrayLengthInitializer<T, N extends ConstInt>(n: ArrayInitializer<T, N>): n is ArrayLengthInitializer<N> {
    return n.length === 1 && Number.isInteger(n[0])
}

export class SizedArray<T, N extends ConstInt> {
    readonly #arr: T[]
    readonly #len: AsNumber<N>

    constructor(length: AsNumber<N>);
    constructor(...t: T[] & { length: AsNumber<N> });
    constructor(...t: ArrayInitializer<T, N>) {
        if (_isArrayLengthInitializer(t)) {
            const len = t[0]!
            this.#arr = new Array(len)
            this.#len = len
        } else {
            this.#arr = t
            this.#len = t.length
        }
    }

    get length(): AsNumber<N> {
        return this.#len
    }

    at(i: NumberLowerThan<N>): T {
        return this.#arr.at(i)!
    }

    slice(start: 1 & NumberLowerThan<N>): SizedArray<T, Diff<N, Int<1>>>;
    slice(start: 2 & NumberLowerThan<N>): SizedArray<T, Diff<N, Int<2>>>;
    slice(start: 3 & NumberLowerThan<N>): SizedArray<T, Diff<N, Int<3>>>;
    slice(start: 4 & NumberLowerThan<N>): SizedArray<T, Diff<N, Int<4>>>;
    slice(start: 5 & NumberLowerThan<N>): SizedArray<T, Diff<N, Int<5>>>;
    slice(start: 6 & NumberLowerThan<N>): SizedArray<T, Diff<N, Int<6>>>;
    slice(start: number): SizedArray<T, ConstInt> {
        return new SizedArray(...this.#arr.slice(start))
    }

    concat(other: SizedArray<T, Int<1>>): SizedArray<T, Sum<N, Int<1>>>;
    concat(other: SizedArray<T, Int<2>>): SizedArray<T, Sum<N, Int<2>>>;
    concat(other: SizedArray<T, Int<3>>): SizedArray<T, Sum<N, Int<3>>>;
    concat(other: SizedArray<T, Int<4>>): SizedArray<T, Sum<N, Int<4>>>;
    concat(other: SizedArray<T, Int<5>>): SizedArray<T, Sum<N, Int<5>>>;
    concat(other: SizedArray<T, Int<6>>): SizedArray<T, Sum<N, Int<6>>>;
    // concat<M extends ConstInt>(other: SizedArray<T, M>): SizedArray<T, Sum<N, M>>;
    concat(other: SizedArray<T, ConstInt>): SizedArray<T, ConstInt> {
        const newArr = this.#arr.concat(...other) as unknown as T[]
        return new SizedArray(...newArr)
    }

    push(t: T): SizedArray<T, Succ<N>> {
        const newArr = this.#arr.concat(t) as unknown as T[]
        return new SizedArray(...newArr)
    }

    pop(): [T | undefined, SizedArray<T, Prec<N>>] {
        const newArr = [...this.#arr] as unknown as T[]
        const popped = newArr.pop()
        return [popped, new SizedArray(...newArr)]
    }

    map<U>(f: (t: T) => U): SizedArray<U, N> {
        return new SizedArray(...this.#arr.map(f))
    }

    *[Symbol.iterator]() {
        yield* this.#arr
    }
}

const a = new SizedArray<number, Int<2>>(1, 2)
const b = a.push(3)
const [_, c] = b.pop()
const d = c.map(i => `${i}`)
const e = b.concat(c)
const l = e.length
const f = e.slice(3)
b.at(2)
// b.at(3)