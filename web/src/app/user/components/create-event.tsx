import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { PlusIcon } from "@radix-ui/react-icons";
import React from "react";
import { useActionData } from "@/lib/hooks";
import { createUserEvent } from "@/services";
import { toast } from "sonner";
import { EventForm } from "./event-form";
import { EventType } from "@/lib/types";

interface CreateEventProps {
  onEventCreated?: () => void;
}

export default function CreateEvent({ onEventCreated }: CreateEventProps) {
  const [open, setopen] = React.useState(false);

  const { pending, handleAction } = useActionData({
    actionFn: (inputs: Omit<EventType, "id">) => createUserEvent(inputs),
    onSucceed: () => {
      toast("Event created successfully");
      onEventCreated?.();
    },
    onError: () => toast("An error occured when creating your event"),
    onFinally: () => setopen(false)
  });

  return (
    <Dialog open={open} onOpenChange={setopen} defaultOpen={false}>
      <DialogTrigger asChild>
        <Button variant={"outline"} onClick={() => setopen(true)}>
          <PlusIcon className="size-4 mr-2" />
          Add an event
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a new event</DialogTitle>
        </DialogHeader>
        <EventForm
          pending={pending}
          onCreate={handleAction}
          onCancel={() => setopen(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
