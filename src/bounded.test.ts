import { BoundedInt } from "./bounded"
import { int, type Equal, type Int } from "./integers"

function typeAssert<T extends true>() { }

describe("BoundedInt", () => {

    const _ = BoundedInt.range(4, 8)

    it("should be convertible to a number", () => {
        const a = _(4)
        const value: 4 | 5 | 6 | 7 | 8 = a.value
        const castValue: number = +a

        expect(castValue).toBe(4)
        expect(value).toBe(4)
    })

    it("should be comparable", () => {
        const a = _(5)

        const isGreaterThan4: true = a.greaterThan(4)
        const isGreaterThanBigNum: false = a.greaterThan(4564545645644)
    })

    it("should support addition", () => {
        const a = _(6)

        const b: 6 | 7 | 8 | 9 | 10 = a.add(int(2)).value

        const c: 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 = a.add(_(7)).value
    })

    it("should support substraction", () => {
        const a = _(6)

        const b: 2 | 3 | 4 | 5 | 6 = a.sub(int(2)).value

        const c: 0 | 1 | 2 | 3 | 4 = a.sub(_(7)).value
        expect(c).toBe(0)
    })

    it("should support saturating addition", () => {
        const a = _(6)

        const b = a.addSaturating(1234567890)

        typeAssert<Equal<typeof a, typeof b>>()
        expect(+b).toBe(8)
    })

    it("should support overflowing addition", () => {
        const a = _(6)

        const b = a.addOverflowing(3)
        typeAssert<Equal<typeof a, typeof b>>()

        expect(+a.addOverflowing(1)).toBe(7)
        expect(+a.addOverflowing(2)).toBe(8)
        expect(+a.addOverflowing(3)).toBe(4)
        expect(+a.addOverflowing(4)).toBe(5)
    })
})