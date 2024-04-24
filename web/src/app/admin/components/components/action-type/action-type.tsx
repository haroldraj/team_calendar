import * as React from 'react'
import { Card } from '@/components/ui/card'
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { ActionTypeType } from '@/lib/types'
import { Button } from '@/components/ui/button'
import { Pencil1Icon, TrashIcon } from '@radix-ui/react-icons'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { deleteActionType, editActionType } from '@/services'
import { toast } from 'sonner'
import { ActionButton } from '@/components/common'

interface ActionTypeEditProps extends ActionTypeType {
  onValidate?: (id:number,name:string) => void
}

function ActionTypeEdit({name,id,onValidate}:ActionTypeEditProps) {
  const [value,setvalue] = React.useState(name)
  const [pending, setPending] = React.useState(false);
  const [open,setopen] = React.useState(false)

  const handleConfirm = React.useCallback(() => {
    setPending(true)
    editActionType(id,value).then(() => {
      toast('Action edited')
      onValidate?.(id,value)
    }).catch(() => {
      toast('Error when updating action type!', {className: 'text-destructive'})
    }).finally(() => {
      setopen(false)
      setPending(false)
    })
  },[id, value, onValidate])

  return (
    <Dialog
      open={open}
      onOpenChange={setopen}
    >
      <DialogTrigger asChild>
        <Button
          variant={'ghost'}
          size={'icon'}
          onClick={() => setopen(true)}
        >
          <Pencil1Icon className='size-4'/>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Change action name :</DialogTitle>
        </DialogHeader>
        <div>
          <Input
            value={value}
            onChange={e => setvalue(e.target.value)}
          />
        </div>
        <DialogFooter>
          <ActionButton
            onClick={handleConfirm}
            pending={pending}
            label={isPending => isPending ? `Saving...` : 'Save'}
          />
          <DialogClose asChild>
            <Button
              variant={'outline'}
            >
              Cancel
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

interface ActionTypeDeleteProps extends ActionTypeType {
  onValidate?: (id:number) => void
}

function ActionTypeDelete({name,id,onValidate}:ActionTypeDeleteProps) {
  const [open,setopen] = React.useState(false)
  const [pending, setPending] = React.useState(false);

  const handleConfirm = React.useCallback(() => {
    setPending(true)
    deleteActionType(id).then(() => {
      toast('Action type deleted.')
      onValidate?.(id)
    }).catch(() => {
      toast('Error when deleting your action')
    }).finally(() => {
      setopen(false)
      setPending(false)
    })
  },[id, onValidate])

  return (
    <Dialog
      open={open}
      onOpenChange={setopen}
    >
      <DialogTrigger asChild>
        <Button
          variant={'ghost'}
          size={'icon'}
          onClick={() => setopen(true)}
        >
          <TrashIcon className='size-4 text-destructive'/>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm delete action category :</DialogTitle>
        </DialogHeader>
        <div className='text-wrap'>
          {`Are you sure you want to delete the ${name} action category ?`}
        </div>
        <DialogFooter>
          <ActionButton
            variant={'destructive'}
            onClick={handleConfirm}
            pending={pending}
            label={isPending => isPending ? 'Deleting...' : 'Delete'}
          />
          <DialogClose asChild>
            <Button
              variant={'outline'}
            >
              Cancel
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

interface ActionTypeProps extends ActionTypeType {
  className?: string
  onActionEdited?: (id:number,name:string) => void
  onActionDeleted?: (id:number) => void
}

export default function ActionType({
  id,name,className,
  onActionDeleted,onActionEdited
}:ActionTypeProps) {
  return (
    <Card
      className={cn(
        'flex justify-start items-center',
        'p-1 gap-2 w-fit',
        className
      )}
    >
      <ActionTypeEdit id={id} name={name} onValidate={onActionEdited}/>
      <p className='truncate text-center'>{name}</p>
      <ActionTypeDelete id={id} name={name} onValidate={onActionDeleted}/>
    </Card>
  )
}
