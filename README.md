# peanots 🥜

(EXPERIMENTAL! MADE FOR FUN!) Type-level *natural* integers powering advanced types. Inspired by Rust's `const` generics.

There are currently technical limitations that prevent some things from working with integers above 99.

# Data structures

## `SizedArray`

Constant-sized immutable array.

```ts
const arr = new SizedArray<string, Int<2>>("a", "b")

// Safe array access
const inBounds: string = arr.at(1) // ✔️ (no undefined!)
const outOfBounds: string = arr.at(2) // ❌ Type 'string | undefined' is not assignable to type 'string'

// Keeps track of length when creating new arrays
const arr2 = arr.push("c")
const len: 3 = arr2.length
```

## `BoundedInt`

A natural integer between known bounds.

```ts
const _ = BoundedInt.range(4, 8)
const five = _(5)

// Compile-time comparison
const isGreaterThan4: true = five.greaterThan(4)

// Addition keeps track of range
const seven = five.add(int(2))
const sumGreaterThan6: true = seven.greaterThan(6)
```

## Roll out your own

Take a look at the definition of those types to get a feel for what is possible.

# Type-level integers

The following types represent type-level natural integers.

* `AnyInt` is the type of all type-level natural integers
* `Int<1>` is the type-level natural integer representing 1
* `Succ<T>`, `Prec<T>` are respectively the integers coming before and after T
* `Sum<A, B>` is the type that represents the sum of integers A and B; similarly, `Diff` is for substraction and `Mul` for multiplication
* `Range<A, B>` is the type that represents all integers from A to B: `A | Succ<A> | Succ<Succ<A>> | ... | Prec<B>, B`

The chosen representation 🥜🥜🥜 should not be taken for granted. These integers should be treated as opaque types.

The following types narrow the number type.

* `AsNumber<T>` is the narrowed type of a `number` that matches the integer T, e.g. `AsNumber<Int<1>>` is the type `1`
* `Lower<T>` are numbers that are also valid integers lower than T, e.g. `Lower<Int<3>>` is the type `0 | 1 | 2 | 3`; `Greater<T>` is the opposite, up to 99 (technical limitation)
* `InRange<A, B>` is a combination of the two

Sometimes, a method calls for a type-level integer value (because type inference has limits), i.e. a constant integer. It only makes sense to use constant expressions to create a type-level integer value.

```ts
const a: Int<2> = int(2)
const a: Int<2> = int(1 + 1) // ❌ Argument of type 'number' is not assignable to parameter of type 'Lower<...>'
```

The value of that integer can be read back with `number`.

```ts
number(a) // === 2
```