import { LogOutButton } from '@/components/common'
import { ActionTypes, Users } from './components'

export default function Admin() {
  return (
    <>
      <LogOutButton/>
      <ActionTypes/>
      <Users/>
    </>
  )
}
