![vuilder](https://user-images.githubusercontent.com/24543982/109286874-2d7b8880-7866-11eb-8a4c-93cf380beb76.png)

<h1 align="center">🏗️ vuilder 🏗️</h1>
<h2 align="center">build type-safe builder</h2>

---

## 🚀 Installation

```shell
yarn add vuilder
# or
npm install vuilder
```

## 🍿 Examples

### `type` pattern

```ts
import { createBuilder } from 'vuilder'

type Person = {
  name: string
  age: number
  usingTwitter?: boolean
}

const builder = createBuilder<Person>()
const person = builder
  .name('hoge')
  .age(32)
  .usingTwitter()
  .build()

console.log(person)
```

### `class` pattern

```ts
import { createBuilder } from 'vuilder'

class Person {
  constructor(
    public name: string,
    public age: number,
    public usingTwitter: boolean
  ) {}
}

const builder = createBuilder<{
  name: string
  age: number
  usingTwitter?: boolean
}, Person>((d) => new Person(d.name, d.age, d.usingTwitter ?? false))
const person = builder
  .name('hoge')
  .age(32)
  .usingTwitter()
  .build()

console.log(person)
```
