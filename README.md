# peanots

(EXPERIMENTAL!) Type-level natural integers powering advanced types. Inspired by Rust's `const` generics.

## `SizedArray`

Constant-sized immutable array.

```ts
const arr = new SizedArray<string, Int<2>>("a", "b")
const inBounds: string = arr.at(1)

const arr2 = arr.push("c")
const len: 3 = arr2.length
```

## `BoundedInt`

```ts
const a = new BoundedInt<Int<4>, Int<8>>(4)
const value: 4 | 5 | 6 | 7 | 8 = a.value
```
