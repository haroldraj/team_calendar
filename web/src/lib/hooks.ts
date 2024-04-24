import * as React from 'react'

export function useLoadData<T>(
  query: () => Promise<T>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onRejected?: (err: any) => void
) {
  const [index, updateIndex] = React.useState(0)
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState(false)
  const [data, setData] = React.useState<T | undefined>(undefined)

  React.useEffect(() => {
    query()
      .then(value => {
        setLoading(false)
        setData(value)
      })
      .catch(err => {
        setError(false)
        onRejected?.(err)
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index])

  const reloadData = React.useCallback(() => {
    updateIndex(idx => idx + 1)
  }, [])

  return { loading, error, data, reloadData }
}

type UseActionDataParams<T> = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  actionFn: (...params:any[]) => Promise<T>
  onSucceed: (params: T) => void
  onError?: (err:unknown) => void
  onFinally?: () => void
}

export function useActionData<T>({
  actionFn,onSucceed,onError,onFinally
}:UseActionDataParams<T>) {
  const [pending,setPending] = React.useState(false)

  const handleAction = React.useCallback(
    (...params:Parameters<typeof actionFn>) => {
      setPending(true)
      actionFn(...params).then((value) => {
        onSucceed(value)
      }).catch(err => {
        onError?.(err)
      }).finally(() => {
        onFinally?.()
        setPending(false)
      })
    },[actionFn, onError, onFinally, onSucceed]
  )

  return { pending, handleAction }
}