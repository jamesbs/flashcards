// UNFINISHED! DO NOT USE!
export const memoize = <TDecorated>(resolveDeps: (decorated: TDecorated) => any) => {
  const memoizeDecorator: MethodDecorator = <T>(target, propertyKey, descriptor: TypedPropertyDescriptor<T>) => {
    return {
      enumerable: descriptor.enumerable,
      configurable: descriptor.configurable,
      set: descriptor.set,
      get: generateMemoizingFunction(resolveDeps, target, descriptor.get),
    }
  }

  return memoizeDecorator
}

const generateMemoizingFunction = <T, TDecorated>(
  resolveDeps: (decorated: TDecorated) => any,
  target: TDecorated,
  func: () => T) => {
  const map = new Map<any, boolean>()

  return function() {
    const deps = resolveDeps(target)
    const stored = map[deps]

    if(stored !== undefined) {
      return stored
    } else {
      const executed = func.apply(target)
      map[deps] = executed

      return executed
    }
  }
}

export const memo = <T>(func: Func<T>) => {
  const map = new Map<any, T>()

  const memoized: Func<T> = function(...args) {
    const stored = map.get(args)

    if(stored !== undefined) {
      return stored
    } else {
      const executed = func(...args)
      map.set(args, executed)
      return executed
    }
  }

  return memoized
}

export interface Func<T> {
  (...args: any[]): T
}
