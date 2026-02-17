type DigitToInt = {
    "0": _0,
    "1": _1,
    "2": _2,
    "3": _3,
    "4": _4,
    "5": _5,
    "6": _6,
    "7": _7,
    "8": _8,
    "9": _9,
    "a": _10,
    "b": Int<11>,
    "c": Int<12>,
    "d": Int<13>,
    "e": Int<14>,
    "f": Int<15>
}

const isInteger = (n: unknown): n is number => Number.isInteger(n)
export const number = <I extends AnyInt>(i: I | number) => isInteger(i) ? i : i.length
export const int = <I extends Lower<_MAX>>(i: I) => {
    const arr = Array.from({ length: i }, () => "🥜")
    return arr as Int<I>
}

export type AnyInt = unknown[]
export type _0 = []
export type Succ<Num> = Num extends [...infer N] ? [...N, "🥜"] : never
export type Prec<Num> = Num extends [...infer N, "🥜"] ? [...N] : _0

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
export type _100 = Mul<_10, _10>
export type _MAX = _100

type NumStrLowerThan<Num extends AnyInt> = `${number}` & keyof Num

export type AsNumber<Num extends AnyInt> = Num["length"]

export type IsGreater<A, B extends AnyInt> = A extends [...B, ...infer _Rest] ? true : false
export type IsGreaterStrict<A, B extends AnyInt> = IsGreater<A, Succ<B>>

export type Equal<A, B> = A extends B ? B extends A ? true : false : false

export type Sum<A, B> = IsGreaterStrict<B, _1> extends true ?
    Succ<Sum<A, Prec<B>>> :
    IsGreaterStrict<B, _0> extends true ?
    Succ<A> : A

export type Mul<A, B> = IsGreaterStrict<B, _1> extends true ?
    Sum<Mul<A, Prec<B>>, A> :
    IsGreaterStrict<B, _0> extends true ?
    A : _0

export type Int<n extends number, _Start extends AnyInt = _0> = n extends AsNumber<_Start> ? _Start :
    IsGreater<_Start, _100> extends true ? never : Int<n, Succ<_Start>>


type StrToInt<N extends string, _Base = Int<10>, _Acc = _0> = N extends keyof DigitToInt ? Sum<Mul<_Base, _Acc>, DigitToInt[N]> :
    N extends `${infer D extends keyof DigitToInt}${infer Rest extends string}` ? StrToInt<Rest, _Base, Sum<Mul<_Base, _Acc>, DigitToInt[D]>> :
    never

type Hmmm = AsNumber<StrToInt<"1a4", Int<16>>>

type StrToNum<N extends `${number}`> = AsNumber<StrToInt<N>>

export type Lower<Num extends AnyInt> = number & keyof { [K in NumStrLowerThan<Succ<Num>> as StrToNum<K>]: never }
export type _Greater<Num> = Exclude<Lower<_MAX>, Lower<Prec<Num>>>
export type GreaterThan<Num, n extends number> = n extends Lower<Prec<Num>> ? never : n & Natural<n>


export type InRange<LowBound extends AnyInt, UpBound extends AnyInt> = Lower<UpBound> & _Greater<LowBound>

export type Range<LowerBound, UpperBound extends AnyInt> = IsGreaterStrict<Succ<LowerBound>, UpperBound> extends true ? LowerBound : LowerBound | Range<Succ<LowerBound>, UpperBound>

export type Diff<A, B extends AnyInt> = IsGreaterStrict<B, _0> extends true ?
    Prec<Diff<A, Prec<B>>> :
    A

type IsNaturalInt<n extends number | `${number}`> = `${n}` extends `${infer _N extends 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9}${infer Rest extends string}` ?
    Rest extends "" ? true :
    Rest extends `${number}` ? IsNaturalInt<Rest> :
    false : false

export type Natural<n extends number> = IsNaturalInt<n> extends true ? n : never

// Unit tests

const prec2Is1: Equal<_1, Prec<_2>> = true;

const _2Plus3Is5: Equal<_5, Sum<_2, _3>> = true;

const _2Times3Is6: Equal<_6, Mul<_2, _3>> = true;

const _2NotGreaterThan2: IsGreaterStrict<_2, _2> = false;

const _6Minus4Is2: Equal<_2, Diff<_6, _4>> = true;

const parseNum: Equal<420, StrToNum<"420">> = true;

const lowerThan3: Lower<Int<3>> = 2;
const higherThan3: _Greater<Int<3>> = 99;
const higherThan3_Better: GreaterThan<Int<2>, 54546465> = 54546465
const inRange: InRange<Int<9>, Int<10>> = 10;

const isInRange: _2 extends Range<_1, _5> ? true : false = true