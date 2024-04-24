import React from "react";
import { Loader2 } from "lucide-react";
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
import { PlusIcon } from "@radix-ui/react-icons";
import ActionType from "../action-type/action-type";
import { createActionType, getActionTypes } from "@/services";
import { toast } from "sonner";
import { useActionData, useLoadData } from "@/lib/hooks";
import { AlertMessage } from "@/components/common";

interface CreateActionTypeProps {
  onCreated?: () => void;
}

function CreateActionType({ onCreated }: CreateActionTypeProps) {
  const [value, setvalue] = React.useState("");
  const [open, setopen] = React.useState(false);
  const { pending, handleAction } = useActionData({
    actionFn: createActionType,
    onSucceed: () => {
      toast("User has been created");
      onCreated?.()
    },
    onError: () => toast("Error when creating user"),
    onFinally: () => setopen(false)
  })

  const handleConfirm = React.useCallback(() => {
    handleAction(value)
  }, [handleAction, value]);

  return (
    <Dialog open={open} onOpenChange={setopen} defaultOpen={false}>
      <DialogTrigger asChild>
        <Button variant={"outline"} onClick={() => setopen(true)}>
          <PlusIcon className="size-4 mr-2" />
          Create Action Type
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New action category name :</DialogTitle>
        </DialogHeader>
        <div>
          <Input value={value} onChange={(e) => setvalue(e.target.value)} />
        </div>
        <DialogFooter>
          <Button onClick={handleConfirm} disabled={pending}>
            {pending && <Loader2 className="mr-2 size-4 animate-spin" />}
            {pending ? "Saving..." : "Save"}
          </Button>
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

export default function ActionTypeList() {
  const { data, error, loading, reloadData } = useLoadData(getActionTypes);

  return (
    <div className="space-y-4">
      <CreateActionType onCreated={reloadData} />
      <div className="flex justify-start items-center flex-wrap gap-4">
        {!loading && data ? (
          data.map((actionType) => (
            <ActionType
              {...actionType}
              key={`action-type-${actionType.name}`}
              className="flex-none w-48 justify-between"
              onActionEdited={reloadData}
              onActionDeleted={reloadData}
            />
          ))
        ) : (
          <AlertMessage
            type={error ? "error" : "loading"}
            title={error ? "Oups! Something went wrong" : "Loading your data"}
            description={
              error
                ? "An error occured wwhen loading your data."
                : `Please wait till we get your data.`
            }
          />
        )}
      </div>
    </div>
  );
}
