import { createBuilder } from '@/index'

describe('createBuilder test', () => {
  test('all required', () => {
    const builder = createBuilder<{ name: string; age: number }>()

    expect(builder.name('hoge').age(17).build()).toMatchObject({
      name: 'hoge',
      age: 17,
    })
  })

  test('with optional fields', () => {
    const builder = createBuilder<{
      name: string
      twitter?: string
      github?: string
    }>()

    expect(builder.name('hota1024').build()).toMatchObject({
      name: 'hota1024',
    })
    expect(builder.name('hota1024').github('hota1024').build()).toMatchObject({
      name: 'hota1024',
      github: 'hota1024',
    })
    expect(builder.name('hota1024').twitter('hota1024').build()).toMatchObject({
      name: 'hota1024',
      twitter: 'hota1024',
    })
    expect(
      builder.name('hota1024').github('hota1024').twitter('hota1024').build()
    ).toMatchObject({
      name: 'hota1024',
      github: 'hota1024',
      twitter: 'hota1024',
    })
  })

  test('class', () => {
    class Person {
      constructor(
        public name: string,
        public age: number,
        public usingTwitter: boolean
      ) {}
    }

    const builder = createBuilder<
      {
        name: string
        age: number
        usingTwitter?: boolean
      },
      Person
    >((d) => new Person(d.name, d.age, d.usingTwitter ?? false))

    expect(builder.name('hota1024').age(17).build()).toMatchObject({
      name: 'hota1024',
      age: 17,
      usingTwitter: false,
    })
    expect(
      builder.name('hota1024').age(17).usingTwitter(true).build()
    ).toMatchObject({
      name: 'hota1024',
      age: 17,
      usingTwitter: true,
    })
  })
})
