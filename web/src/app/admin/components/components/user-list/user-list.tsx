import * as React from "react";
import useList from "./useList";
import { Button } from "@/components/ui/button";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon
} from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";
import { UserCard } from "../user-card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useActionData, useLoadData } from "@/lib/hooks";
import { createUser, deleteUsers, getUsers } from "@/services";
import { ActionButton, AlertMessage } from "@/components/common";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { PlusIcon } from "@radix-ui/react-icons";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface CreateUserProps {
  onCreated?: () => void;
}

function CreateUser({ onCreated }: CreateUserProps) {
  const [name, setname] = React.useState("");
  const [email, setemail] = React.useState("");
  const [password, setpassword] = React.useState("");
  const [roleId, setrole] = React.useState("");
  const [open, setopen] = React.useState(false);
  const { pending, handleAction } = useActionData({
    actionFn: createUser,
    onSucceed: () => {
      toast("Action type has been created");
      onCreated?.();
    },
    onError: () => toast("Error when creating Action type"),
    onFinally: () => setopen(false)
  });

  const handleConfirm = React.useCallback(() => {
    handleAction({ name, email, password, roleId });
  }, [handleAction, name, email, password, roleId]);

  return (
    <Dialog open={open} onOpenChange={setopen} defaultOpen={false}>
      <DialogTrigger asChild>
        <Button variant={"outline"} onClick={() => setopen(true)}>
          <PlusIcon className="size-4 mr-2" />
          Create User
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New user :</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-1">
            <Label>Name</Label>
            <Input value={name} onChange={(e) => setname(e.target.value)}/>
          </div>
          <div className="space-y-1">
            <Label>Email</Label>
            <Input value={email} onChange={(e) => setemail(e.target.value)}/>
          </div>
          <div className="space-y-1">
            <Label>Password</Label>
            <Input
                value={password}
                onChange={(e) => setpassword(e.target.value)}
                type="password"
            />
          </div>
          <div className="space-y-1">
            <Label>Role</Label>
            <Input value={roleId} onChange={(e) => setrole(e.target.value)}/>
          </div>
        </div>
        <DialogFooter className="mt-4">
          <ActionButton
              onClick={handleConfirm}
              pending={pending}
              label={(isPending) => (isPending ? `Saving...` : `Save`)}
          />
          <DialogClose asChild>
            <Button variant={"outline"} disabled={pending}>
              Cancel
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default function UserList() {
  const { data, error, loading, reloadData } = useLoadData(getUsers);
  const {
    users,
    handleUserSelect,
    changePageSize,
    firstPage,
    lastPage,
    nextPage,
    prevPage,
    pageSize,
    selectedUsers,
    currentPage,
    pageCount,
    toggleSelectAll
  } = useList(data || []);
  const { pending, handleAction } = useActionData({
    actionFn: deleteUsers,
    onSucceed: () => {
      toast(`${selectedUsers.size} users deleted!`);
      reloadData();
      toggleSelectAll(false);
    },
    onError: () => toast("An error occured when deleting multiple users")
  });

  const handleDeleteUsers = React.useCallback(
    () => handleAction(Array.from(selectedUsers)),
    [handleAction, selectedUsers]
  );

  const loader = (
    <AlertMessage
      type="loading"
      title="Loading users"
      description={`We're loading your data, please wait!`}
    />
  );

  const errorMessage = (
    <AlertMessage
      type="error"
      title="Oups! Something went wrong"
      description={`An error occured while loading your data, please try again later`}
    />
  );

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex justify-start items-center gap-2">
          <CreateUser onCreated={reloadData} />
          {selectedUsers.size > 0 && (
            <ActionButton
              variant="destructive"
              pending={pending}
              label={(isPending) =>
                isPending ? `Deleting...` : "Delete selected users"
              }
              onClick={handleDeleteUsers}
            />
          )}
        </div>
        <div className="flex justify-end gap-2 items-center">
          <div className="text-muted-foreground text-nowrap">Rows per page</div>
          <Select
            value={`${pageSize}`}
            onValueChange={(value) => changePageSize(Number(value))}
          >
            <SelectTrigger className="w-16">
              <SelectValue placeholder={`${pageSize}`} />
            </SelectTrigger>
            <SelectContent side="bottom">
              {[5, 10, 15, 20, 30, 50].map((size) => (
                <SelectItem key={`pageSize-${size}`} value={`${size}`}>
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="space-y-4">
        {loading && loader}
        {error && errorMessage}
        {data && (
          <>
            {users.map((user) => (
              <UserCard
                {...user}
                key={user.email}
                selected={selectedUsers.has(user.id)}
                onSelectedChange={handleUserSelect}
                onUserEdited={reloadData}
                onUserDeleted={reloadData}
              />
            ))}
          </>
        )}
      </div>
      <div className="flex justify-between items-center">
        <div className="flex justify-start items-center gap-4">
          <div className="flex gap-2 justify-start items-center">
            <Checkbox
              checked={selectedUsers.size > 0}
              onCheckedChange={() => toggleSelectAll()}
              id="all-users-selection"
            />
            <label
              className="text-muted-foreground cursor-pointer"
              htmlFor="all-users-selection"
            >
              {selectedUsers.size > 0 ? `Unselect all` : `Select all`}
            </label>
          </div>
          {data && (
            <p>{`${selectedUsers.size} of ${data.length} user(s) selected.`}</p>
          )}
        </div>
        <div className={cn("flex justify-start items-center gap-2")}>
          <Button
            variant={"outline"}
            size={"icon"}
            onClick={firstPage}
            disabled={currentPage === 0}
          >
            <DoubleArrowLeftIcon className="size-4" />
          </Button>
          <Button
            variant={"outline"}
            size={"icon"}
            onClick={prevPage}
            disabled={currentPage === 0}
          >
            <ChevronLeftIcon className="size-4" />
          </Button>
          <div className="text-muted-foreground">
            {`Page ${currentPage} of ${pageCount}`}
          </div>
          <Button
            variant={"outline"}
            size={"icon"}
            onClick={nextPage}
            disabled={currentPage >= pageCount}
          >
            <ChevronRightIcon className="size-4" />
          </Button>
          <Button
            variant={"outline"}
            size={"icon"}
            onClick={lastPage}
            disabled={currentPage >= pageCount}
          >
            <DoubleArrowRightIcon className="size-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
