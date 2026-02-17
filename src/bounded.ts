import { number, type _0, type _MAX, type AnyInt, type AsNumber, type Diff, type Greater, type InRange, type Int, type Lower, type NatInt, type Succ, type Sum } from "./integers";

export class BoundedInt<L extends AnyInt, U extends AnyInt> {
    readonly #value: InRange<L, U>
    readonly #min: AsNumber<L>
    readonly #max: AsNumber<U>

    private constructor(n: InRange<L, U>, [min, max]: [number, number]) {
        this.#value = n
        this.#min = min
        this.#max = max
    }

    static range<L extends number, U extends number>(l: L, u: U) {
        return (n: InRange<Int<L>, Int<U>>) => new BoundedInt(n, [l, u])
    }

    get value(): InRange<L, U> {
        return this.#value
    }

    greaterThan(other: Lower<L>): true;
    greaterThan(other: Greater<Succ<U>>): false;
    greaterThan(other: number): boolean;
    greaterThan(other: number): boolean {
        return this.#value >= other
    }

    add<I extends AnyInt>(other: I): BoundedInt<Sum<L, I>, Sum<U, I>>;
    add<L2 extends AnyInt, U2 extends AnyInt>(other: BoundedInt<L2, U2>): BoundedInt<Sum<L, L2>, Sum<U, U2>>;
    add(other: BoundedInt<AnyInt, AnyInt> | AnyInt): BoundedInt<AnyInt, AnyInt> {
        let v: number, min: number, max: number;
        if (other instanceof BoundedInt) {
            v = this.#value + other.#value
            min = this.#min + other.#min
            max = this.#max + other.#max
        } else {
            v = this.#value + number(other)
            min = this.#min + number(other)
            max = this.#max + number(other)
        }
        return new BoundedInt(v as never, [min, max])
    }

    sub<I extends AnyInt>(other: I): BoundedInt<Diff<L, I>, Diff<U, I>>;
    sub<L2 extends AnyInt, U2 extends AnyInt>(other: BoundedInt<L2, U2>): BoundedInt<Diff<L, U2>, Diff<U, L2>>;
    sub(other: BoundedInt<AnyInt, AnyInt> | AnyInt | number): BoundedInt<AnyInt, AnyInt> {
        let v: number, min: number, max: number;
        if (other instanceof BoundedInt) {
            v = Math.max(0, this.#value - other.#value)
            min = this.#min - other.#max
            max = this.#max - other.#min
        } else {
            v = Math.max(0, this.#value - number(other))
            min = this.#min - number(other)
            max = this.#max - number(other)
        }
        return new BoundedInt(v as never, [min, max])
    }

    addSaturating(other: NatInt): BoundedInt<L, U>;
    addSaturating(other: number): BoundedInt<L, U> | never;
    addSaturating(other: number): BoundedInt<L, U> | never {
        if (!Number.isInteger(other) || other < 0) {
            throw `Unexpected number ${other}, expected a natural integer`
        }
        const v = Math.max(Math.min(this.#value + other, this.#max), this.#min)
        return new BoundedInt(v as any, [this.#min, this.#max])
    }

    addOverflowing(other: NatInt): BoundedInt<L, U>;
    addOverflowing(other: number): BoundedInt<L, U> | never;
    addOverflowing(other: number): BoundedInt<L, U> | never {
        if (!Number.isInteger(other) || other < 0) {
            throw `Unexpected number ${other}, expected a natural integer`
        }
        const v = (this.#value - this.#min + other) % (this.#max - this.#min + 1) + this.#min
        return new BoundedInt(v as any, [this.#min, this.#max])
    }

    [Symbol.toPrimitive]() {
        return this.#value
    }
}