import * as React from "react";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { UserEditInput, UserType } from "@/lib/types";
import { Pencil1Icon, TrashIcon } from "@radix-ui/react-icons";
import { CheckedState } from "@radix-ui/react-checkbox";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useActionData } from "@/lib/hooks";
import { deleteUser, editUser } from "@/services";
import { toast } from "sonner";
import { ActionButton } from "@/components/common";

interface EditUserProps extends UserType {
  onValidate?: (id: number, inputs: UserEditInput) => void;
}

function EditUser({ name, email, id, onValidate }: EditUserProps) {
  const [userName, setUserName] = React.useState(name);
  const [userMail, setUserMail] = React.useState(email);
  const [open, setopen] = React.useState(false);
  const { pending, handleAction } = useActionData({
    actionFn: () =>
      editUser(id, {
        name: name === userName ? undefined : userName,
        email: email === userMail ? undefined : userMail
      }),
    onSucceed: () => {
      toast(`User ${userName} edited successfully`);
      onValidate?.(id, {
        name: name === userName ? undefined : userName,
        email: email === userMail ? undefined : userMail
      });
    },
    onError: () => toast("An error occured when editing user data"),
    onFinally: () => setopen(false)
  });

  const handleConfirm = React.useCallback(() => {
    handleAction();
  }, [handleAction]);

  return (
    <Dialog open={open} onOpenChange={setopen}>
      <DialogTrigger asChild>
        <Button variant={"outline"} size={"icon"} onClick={() => setopen(true)}>
          <Pencil1Icon className="size-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Change action name :</DialogTitle>
        </DialogHeader>
        <div>
          <label htmlFor={`edit-user-${email}-name`}>Name :</label>
          <Input
            id={`edit-user-${email}-name`}
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor={`edit-user-${email}-email`}></label>
          <Input
            id={`edit-user-${email}-email`}
            value={userMail}
            onChange={(e) => setUserMail(e.target.value)}
          />
        </div>
        <DialogFooter>
          <ActionButton
            label={(isPending) => (isPending ? "Saving..." : "Save")}
            pending={pending}
            onClick={handleConfirm}
          />
          <DialogClose asChild>
            <Button variant={"outline"}>Cancel</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

interface DeleteUserProps extends UserType {
  onValidate?: (id: number) => void;
}

function DeleteUser({ name, email, id, onValidate }: DeleteUserProps) {
  const [open, setopen] = React.useState(false);
  const { pending, handleAction } = useActionData({
    actionFn: deleteUser,
    onSucceed: () => {
      toast(`User ${name} deleted successfully`);
      onValidate?.(id);
    },
    onError: () => toast("An error occured when deleting user"),
    onFinally: () => setopen(false)
  });

  const handleConfirm = React.useCallback(() => {
    handleAction(id);
  }, [handleAction, id]);

  return (
    <Dialog open={open} onOpenChange={setopen}>
      <DialogTrigger asChild>
        <Button variant={"ghost"} size={"icon"} onClick={() => setopen(true)}>
          <TrashIcon className="size-4 text-destructive" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Change action name :</DialogTitle>
        </DialogHeader>
        <div className="text-wrap">
          {`Are you sure you want to delete the user ${name} with the email ${email} ?`}
        </div>
        <DialogFooter>
          <ActionButton
            variant="destructive"
            pending={pending}
            onClick={handleConfirm}
            label={(isPending) => (isPending ? "Deleting..." : "Delete")}
          />
          <DialogClose asChild>
            <Button variant={"outline"}>Cancel</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

interface UserCardProps extends UserType {
  onSelectedChange: (state: boolean, id: number) => void;
  selected?: boolean;
  className?: string;
  onUserEdited?: (id: number, input: UserEditInput) => void;
  onUserDeleted?: (id: number) => void;
}

export default function UserCard({
  id,
  name,
  email,
  onSelectedChange,
  selected,
  className,
  onUserEdited,
  onUserDeleted
}: UserCardProps) {
  const handleCheckChange = React.useCallback(
    (check: CheckedState) => {
      if (check === true) onSelectedChange(true, id);
      else onSelectedChange(false, id);
    },
    [id, onSelectedChange]
  );

  return (
    <Card className={cn("p-4", "flex items-center", className)}>
      <div className="size-9 grid content-center ml-2">
        <Checkbox
          id={email}
          checked={selected}
          onCheckedChange={handleCheckChange}
        />
      </div>
      <label
        htmlFor={email}
        className={cn(
          "flex flex-col gap-1",
          "font-medium leading-none",
          "cursor-pointer"
        )}
      >
        <span className="font-semibold">{name}</span>
        <span className="text-sm text-muted-foreground">{email}</span>
      </label>
      <div className="ml-auto flex justify-end items-center gap-2">
        <EditUser id={id} name={name} email={email} onValidate={onUserEdited} />
        <DeleteUser
          id={id}
          name={name}
          email={email}
          onValidate={onUserDeleted}
        />
      </div>
    </Card>
  );
}
