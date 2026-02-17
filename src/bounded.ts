import { number, type _0, type AnyInt, type AsNumber, type Greater, type InRange, type Int, type Lower, type Succ, type Sum } from "./integers";

export class BoundedInt<L extends AnyInt, U extends AnyInt> {
    readonly #value: InRange<L, U>

    constructor(n: InRange<L, U>) {
        this.#value = n
    }

    static range<L extends number, U extends number>(l: L, u: U) {
        return (n: InRange<Int<L>, Int<U>>) => new BoundedInt(n)
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

    plus(other: InRange<L, U>): BoundedInt<Sum<L, L>, Sum<U, U>>;
    plus<I extends AnyInt>(other: I): BoundedInt<Sum<L, I>, Sum<U, I>>;
    plus<L2 extends AnyInt, U2 extends AnyInt>(other: BoundedInt<L2, U2>): BoundedInt<Sum<L, L2>, Sum<U, U2>>;
    plus(other: BoundedInt<AnyInt, AnyInt> | AnyInt | number): BoundedInt<AnyInt, AnyInt> {
        const v = other instanceof BoundedInt ? other.#value : number(other);
        return new BoundedInt(this.#value + v as never)
    }

    [Symbol.toPrimitive]() {
        return this.#value
    }
}

const a = new BoundedInt<Int<3>, Int<4>>(3)
const gt: false = a.greaterThan(5)
const b = a.plus(3)
const gt2: true = b.greaterThan(5)
