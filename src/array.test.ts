import { SizedArray } from "./array"
import { int, type Equal, type Int, type Range } from "./integers"

function typeAssert<T extends true>() { }

describe("SizedArray", () => {
    it("should grow when you push", () => {
        const arr: SizedArray<string, Int<2>> = new SizedArray("a", "b")
        const res = arr.push("c")

        expect(res.length).toBe(3)
        typeAssert<Equal<3, typeof res.length>>()
    })

    it("should shrink when you pop", () => {
        const arr: SizedArray<string, Int<2>> = new SizedArray("a", "b")

        let [, res] = arr.pop()
        expect(res.length).toBe(1)
        typeAssert<Equal<1, typeof res.length>>()

        const [, res2] = res.pop()
        typeAssert<Equal<0, typeof res2.length>>()

        const [lastPop,] = res2.pop()
        typeAssert<Equal<undefined, typeof lastPop>>()
    })

    it("should make item access safe", () => {
        const arr: SizedArray<string, Int<2>> = new SizedArray("a", "b")

        const outOfBounds: string | undefined = arr.at(2)
        const inBounds: string = arr.at(1)
    })

    it("should compute the new size with concat", () => {
        const arr: SizedArray<string, Int<2>> = new SizedArray("a", "b")
        const arr2: SizedArray<string, Int<3>> = new SizedArray("c", "d", "e")

        const res = arr.concat(arr2)
        expect(res.length).toBe(5)
        typeAssert<Equal<5, typeof res.length>>()
    })

    it("should preserve the size when mapping", () => {
        const arr: SizedArray<string, Int<2>> = new SizedArray("a", "b")
        const res = arr.map(() => "whatever!")

        expect(res.length).toBe(2)
        typeAssert<Equal<2, typeof res.length>>()
    })

    it("should compute the proper size with slice", () => {
        const arr: SizedArray<string, Int<5>> = new SizedArray("a", "b", "c", "d", "e")

        const slice = arr.slice(int(2))
        expect(slice.at(0)).toBe("c")

        expect(slice.length).toBe(3)
        typeAssert<Equal<3, typeof slice.length>>()
    })

    it("should work with ranges too", () => {
        const arr: SizedArray<string, Range<Int<2>, Int<4>>> = new SizedArray("a", "b", "c")
        const lenIsKnown: 2 | 3 | 4 = arr.length

        const maybeOutOfBounds: string | undefined = arr.at(2)
        const inBounds: string = arr.at(1)

        const res = arr.push("d")
        const lenIsKnown2: 3 | 4 | 5 = res.length
    })
})