export type UserType = {
  name: string
  email: string
  id: number
}

export type UserEditInput = {
  name?: string
  email?: string
  password?: string
}

export type UserInput = {
  name: string
  email: string
  password: string
  role: number
}

export type UserListType = Array<UserType>

export type ActionTypeType = {
  id: number
  name: string
}

export type ActionTypeListType = Array<ActionTypeType>

export type EventType = {
  id: number
  start: Date
  end?: Date
  title: string
  description: string
}

export type EventInputType = {
  title?: string
  description?: string
  start?: Date
  end?: Date
}

export type EventListType = Array<EventType>