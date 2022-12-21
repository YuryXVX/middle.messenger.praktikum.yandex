export function Observer<T extends <U>(args: U) => void>() {
  let listeners = [] as T[];

  function sub(cb: T) {
    listeners.push(cb)
  }

  function pub<U>(agrs: U) {
    listeners.forEach(
      cb => cb(agrs)
    )
  }

  function cleanup() {
    listeners = [];
  }

  return {
    sub, pub, cleanup
  }
}