import {faker} from '@faker-js/faker'
import { ActionTypeListType, ActionTypeType, EventListType, EventType, UserListType, UserType } from "./types";
import { addMonths, subMonths } from 'date-fns';

export function fakeUser():UserType {
  return {
    id: faker.number.int(),
    email: faker.internet.email(),
    name: faker.person.fullName()
  }
}

export function fakeUserList():UserListType {
  const array:UserListType = []
  const length = faker.number.int({min: 15, max: 150})

  for (let index = 0; index <= length; index++) {
    array.push(fakeUser())
  }

  return array
}


export function fakeActionType():ActionTypeType{
  return {
    id: faker.number.int(),
    name: faker.word.sample()
  }
}

export function fakeActionTypeList():ActionTypeListType {
  const array:ActionTypeListType = []
  const length = faker.number.int({min: 3, max: 5})

  for (let index = 0; index <= length; index++) {
    array.push(fakeActionType())
  }

  return array
}

export function fakeUserEvent():EventType {
  const id = faker.number.int()
  const start = faker.date.between({from: subMonths(new Date(),3), to: addMonths(new Date(),3)})
  const end = id % 3 === 0 ? faker.date.soon({refDate: start}) : undefined

  
  return {
    id,
    title: faker.word.verb(),
    description: faker.lorem.sentence(),
    start,
    end
  }
}

export function fakeEventList():EventListType {
  const array:EventListType = []
  const length = faker.number.int({min: 50, max: 500})

  for (let index = 0; index <= length; index++) {
    array.push(fakeUserEvent())
  }

  return array
}
