// eslint-disable-next-line @typescript-eslint/ban-types
type EmptyObject = {}

/**
 * Builder type.
 */
export type BuilderType<T, O = T> = (EmptyObject extends T
  ? {
      build(): O
    }
  : EmptyObject) &
  {
    [K in keyof T]-?: (value: T[K]) => BuilderType<Omit<T, K>, O>
  }

/**
 * create a builder.
 *
 * @param build build function
 */
export function createBuilder<T extends EmptyObject, U = T>(
  build?: (data: T) => U
): BuilderType<T, U> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const data: any = {}

  const builder = new Proxy(
    {},
    {
      get(_, p) {
        if (p === 'build') {
          return build ? () => build(data) : () => data
        }

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return (value: any): any => {
          data[p] = value

          return builder
        }
      },
    }
  )

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return builder as any
}
