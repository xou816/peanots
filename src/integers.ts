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

export type ConstInt = unknown[]
export type _0 = []
export type Succ<Num> = Num extends [...infer N] ? [...N, never] : never
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

type ValidIndicesStr<Num extends ConstInt> = `${number}` & keyof Num

export type AsNumber<Num extends ConstInt> = Num["length"] // StrToNum[Exclude<ValidIndicesStr<Succ<Num>>, ValidIndicesStr<Num>> & keyof StrToNum]
type AsStr<Num extends ConstInt> = Exclude<ValidIndicesStr<Succ<Num>>, ValidIndicesStr<Num>>

type IsGreater<A, B extends ConstInt> = A extends [...B, ...infer _Rest] ? true : false
type IsGreaterStrict<A, B extends ConstInt> = IsGreater<A, Succ<B>>

type Equal<A, B> = A extends B ? B extends A ? true : false : false

export type Sum<A, B> = IsGreaterStrict<B, _1> extends true ?
    Succ<Sum<A, Prec<B>>> :
    IsGreaterStrict<B, _0> extends true ?
    Succ<A> : A

type Mul<A, B> = IsGreaterStrict<B, _1> extends true ?
    Sum<Mul<A, Prec<B>>, A> :
    IsGreaterStrict<B, _0> extends true ?
    A : _0

export type Int<N extends number, S extends ConstInt = _0> = N extends AsNumber<S> ? S : Int<N, Succ<S>>
type FromStr<N extends string, S extends ConstInt = _0> = N extends AsStr<S> ? S : FromStr<N, Succ<S>>

type StrToNum<N extends `${number}`> = N extends keyof DigitToNum ? DigitToNum[N] :
    N extends `1${infer D extends keyof DigitToNum}` ? AsNumber<Sum<Int<10>, Int<DigitToNum[D]>>> :
    N extends `2${infer D extends keyof DigitToNum}` ? AsNumber<Sum<Int<20>, Int<DigitToNum[D]>>> :
    N extends `3${infer D extends keyof DigitToNum}` ? AsNumber<Sum<Int<30>, Int<DigitToNum[D]>>> :
    N extends `4${infer D extends keyof DigitToNum}` ? AsNumber<Sum<Int<40>, Int<DigitToNum[D]>>> :
    N extends `5${infer D extends keyof DigitToNum}` ? AsNumber<Sum<Int<50>, Int<DigitToNum[D]>>> :
    N extends `6${infer D extends keyof DigitToNum}` ? AsNumber<Sum<Int<60>, Int<DigitToNum[D]>>> :
    N extends `7${infer D extends keyof DigitToNum}` ? AsNumber<Sum<Int<70>, Int<DigitToNum[D]>>> :
    N extends `8${infer D extends keyof DigitToNum}` ? AsNumber<Sum<Int<80>, Int<DigitToNum[D]>>> :
    N extends `9${infer D extends keyof DigitToNum}` ? AsNumber<Sum<Int<90>, Int<DigitToNum[D]>>> :
    never

export type NumberLowerThan<Num extends ConstInt> = number & keyof { [K in ValidIndicesStr<Num> as StrToNum<K>]: never }

export type Diff<A, B extends ConstInt> = IsGreaterStrict<B, _0> extends true ?
    Prec<Diff<A, Prec<B>>> :
    A

// Unit tests

const Prec2Is1: Equal<_1, Prec<_2>> = true;

const _2Plus3Is5: Equal<_5, Sum<_2, _3>> = true;

const _2Times3Is6: Equal<_6, Mul<_2, _3>> = true;

const _2NotGreaterThan2: IsGreaterStrict<_2, _2> = false;

const _6Minus4Is2: Equal<_2, Diff<_6, _4>> = true;

const ParseNum: Equal<42, StrToNum<"42">> = true;