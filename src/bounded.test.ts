import { BoundedInt } from "./bounded"
import { int, type Equal, type Int } from "./integers"

function typeAssert<T extends true>() { }

describe("BoundedInt", () => {
    it("should be convertible to a number", () => {
        const a = new BoundedInt<Int<4>, Int<8>>(4)
        const value: 4 | 5 | 6 | 7 | 8 = a.value
        const castValue: number = +a

        expect(castValue).toBe(4)
        expect(value).toBe(4)
    })

    it("should be comparable", () => {
        const a = new BoundedInt<Int<4>, Int<8>>(5)

        const isGreaterThan4: true = a.greaterThan(4)
        const isGreaterThan9: false = a.greaterThan(9)
    })

    it("should support simple operations", () => {
        const a = new BoundedInt<Int<4>, Int<8>>(6)

        const b: 6 | 7 | 8 | 9 | 10 = a.plus(int(2)).value
    })
})