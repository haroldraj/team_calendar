import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ActionTypeList } from './components'

export default function ActionTypes() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Action categories management
        </CardTitle>
        <CardDescription>
          Here you can create, modify or delete action categories.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ActionTypeList />
      </CardContent>
    </Card>
  )
}
