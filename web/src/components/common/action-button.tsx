import * as React from 'react'
import { Button } from '../ui/button'
import { Loader } from 'lucide-react'

interface ActionButtonProps extends React.ComponentProps<typeof Button> {
  pending?: boolean
  label: ((pending?: boolean) => string) | string
}

export default function ActionButton({
  pending, label, ...props
}:ActionButtonProps) {
  return (
    <Button {...props} disabled={pending}>
      {pending && <Loader className='size-4 animate-spin' />}
      {typeof label === 'string' ? label : label(pending)}
    </Button>
  )
}
