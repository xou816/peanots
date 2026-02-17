# peanots 🥜

(EXPERIMENTAL!) Type-level natural integers powering advanced types. Inspired by Rust's `const` generics.

## `SizedArray`

Constant-sized immutable array.

```ts
const arr = new SizedArray<string, Int<2>>("a", "b")

// safe array access (no undefined)
const inBounds: string = arr.at(1)

// keeps track of size when creating new arrays
const arr2 = arr.push("c")

// length is known at compile time
const len: 3 = arr2.length
```

## `BoundedInt`

A natural integer between known bounds.

```ts
const a = new BoundedInt<Int<4>, Int<8>>(4)
const value: 4 | 5 | 6 | 7 | 8 = a.value

// addition and comparison
const sumGreaterThan6: true = a.plus(int(2)).greaterThan(6)
```
