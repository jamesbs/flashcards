export type Typed<T> = {
  type: T
}

export const asTyped = <T>({ type }: Typed<T>) => ({ type })
