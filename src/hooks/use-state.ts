export const useState = <T extends Record<string, any>>(initialState: T) => {
  const state = new Map<keyof T, T[keyof T]>()

  Object.entries(initialState).forEach(([key, value]) => {
    state.set(key as keyof T, value)
  })

  const patch = <K extends keyof T>(key: K, part: Partial<T[K]>) => {
    const value = state.get(key)
    state.set(key, {...value, ...part} as T[K])
  }

  const set = <K extends keyof T>(key: K, value: T[K]) => {
    state.set(key, value)
  }

  const get = <K extends keyof T>(key: K) => state.get(key) as T[K]

  return {get, set, patch}
}
