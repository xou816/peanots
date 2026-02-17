type DigitToNum = {
    "0": 0,
    "1": 1,
    "2": 2,
    "3": 3,
    "4": 4,
    "5": 5,
    "6": 6,
    "7": 7,
    "8": 8,
    "9": 9
}

const isInteger = (n: unknown): n is number => Number.isInteger(n)
export const number = <I extends AnyInt>(i: I | number) => isInteger(i) ? i : i.length
export const int = <I extends Lower<Int<100>>>(i: I) => {
    const arr = Array.from({ length: i }, () => 1)
    return arr as Int<I>
}

function sum<A extends AnyInt, B extends AnyInt>(a: A, b: B): Sum<A, B> {
    return a.concat(...b) as Sum<A, B>
}

export type AnyInt = unknown[]
export type _0 = []
export type Succ<Num> = Num extends [...infer N] ? [...N, 1] : never
export type Prec<Num> = Num extends [...infer N, infer _Last] ? [...N] : _0

export type _1 = Succ<_0>
export type _2 = Succ<_1>
export type _3 = Succ<_2>
export type _4 = Succ<_3>
export type _5 = Succ<_4>
export type _6 = Succ<_5>
export type _7 = Succ<_6>
export type _8 = Succ<_7>
export type _9 = Succ<_8>
export type _10 = Succ<_9>

type NumStrLowerThan<Num extends AnyInt> = `${number}` & keyof Num

export type AsNumber<Num extends AnyInt> = Num["length"] // StrToNum[Exclude<ValidIndicesStr<Succ<Num>>, ValidIndicesStr<Num>> & keyof StrToNum]

export type IsGreater<A, B extends AnyInt> = A extends [...B, ...infer _Rest] ? true : false
export type IsGreaterStrict<A, B extends AnyInt> = IsGreater<A, Succ<B>>

export type Equal<A, B> = A extends B ? B extends A ? true : false : false

export type Sum<A, B> = IsGreaterStrict<B, _1> extends true ?
    Succ<Sum<A, Prec<B>>> :
    IsGreaterStrict<B, _0> extends true ?
    Succ<A> : A

type Mul<A, B> = IsGreaterStrict<B, _1> extends true ?
    Sum<Mul<A, Prec<B>>, A> :
    IsGreaterStrict<B, _0> extends true ?
    A : _0

export type Int<N extends number, _Start extends AnyInt = _0> = N extends AsNumber<_Start> ? _Start : Int<N, Succ<_Start>>

type StrToNum<N extends `${number}`> = N extends keyof DigitToNum ? DigitToNum[N] :
    N extends `${infer A extends 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9}${infer D extends keyof DigitToNum}` ? AsNumber<Sum<Mul<_10, Int<A>>, Int<DigitToNum[D]>>> :
    never

export type Lower<Num extends AnyInt> = number & keyof { [K in NumStrLowerThan<Succ<Num>> as StrToNum<K>]: never }
export type Greater<Num> = Exclude<Lower<Int<99>>, Lower<Prec<Num>>>
export type InRange<LowBound extends AnyInt, UpBound extends AnyInt> = Lower<UpBound> & Greater<LowBound>

export type Range<N, Max extends AnyInt> = IsGreaterStrict<Succ<N>, Max> extends true ? N : N | Range<Succ<N>, Max>

export type Diff<A, B extends AnyInt> = IsGreaterStrict<B, _0> extends true ?
    Prec<Diff<A, Prec<B>>> :
    A

// Unit tests

const prec2Is1: Equal<_1, Prec<_2>> = true;

const _2Plus3Is5: Equal<_5, Sum<_2, _3>> = true;

const _2Times3Is6: Equal<_6, Mul<_2, _3>> = true;

const _2NotGreaterThan2: IsGreaterStrict<_2, _2> = false;

const _6Minus4Is2: Equal<_2, Diff<_6, _4>> = true;

const parseNum: Equal<42, StrToNum<"42">> = true;

const lowerThan3: Lower<Int<3>> = 2;
const higherThan3: Greater<Int<3>> = 3;
const inRange: InRange<Int<9>, Int<10>> = 10;

const isInRange: _2 extends Range<_1, _5> ? true : false = true