// solve next.js errors with zustand:
// - Text content does not match server-rendered HTML
// - Hydration failed because the initial UI does not match what was rendered on the server
// - There was an error while hydrating. Because the error happened outside of a Suspense boundary, the entire root will switch to client rendering
// to solve these errors, create a custom hook so that Zustand waits a little before changing your components.
import {useState, useEffect} from 'react'

const useStore = <T, F>(
  store: (callback: (state: T) => unknown) => unknown,
  callback: (state: T) => F,
) => {
  const result = store(callback) as F
  const [data, setData] = useState<F>()

  useEffect(() => {
    setData(result)
  }, [result])

  return data
}

export default useStore
