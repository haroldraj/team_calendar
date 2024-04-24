import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { UserList } from './components'

export default function Users() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          User management
        </CardTitle>
        <CardDescription>
          Here you can create, modify or delete users.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <UserList />
      </CardContent>
    </Card>
  )
}
