export default {
  try: <T>(fn: () => T) =>
    new Promise<T>((resolve, reject) => {
      try {
        resolve(fn())
      } catch (error) {
        reject(error)
      }
    }),
  catch: <T>(fn: () => T) =>
    new Promise<T>(resolve => {
      try {
        resolve(fn())
      } catch (error) {}
    }),
}
