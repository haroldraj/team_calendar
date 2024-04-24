import { Alert, AlertDescription, AlertTitle } from '../ui/alert'
import { ExclamationTriangleIcon, InfoCircledIcon } from '@radix-ui/react-icons'
import { Loader } from 'lucide-react'

interface AlertMessageProps {
  type?: 'loading' | 'error' | 'message'
  title: string
  description: string
}

export default function AlertMessage({
  type='message', title, description
}:AlertMessageProps) {
  let icon = <InfoCircledIcon className='size-4' />

  if(type === 'loading') icon = <Loader className='size-4 animate-spin' />

  if(type === 'error') icon = <ExclamationTriangleIcon className='size-4' />

  return (
    <Alert variant={type==='error' ? 'destructive' : 'default'}>
      {icon}
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{description}</AlertDescription>
    </Alert>
  )
}
