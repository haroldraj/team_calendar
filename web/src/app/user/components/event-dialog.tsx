import { EventInputType, EventType } from "@/lib/types";
import { EventForm } from "./event-form";
import { Dialog } from "@headlessui/react";
import { useActionData } from "@/lib/hooks";
import { deleteEvent, updateEvent } from "@/services";
import { toast } from "sonner";

interface EventDialogProps {
  open: boolean;
  closeModal: () => void;
  event: EventType;
  reload: () => void;
}

export default function EventDialog({
  open,
  event,
  closeModal,
  reload
}: EventDialogProps) {
  const { pending: updatePending, handleAction: onUpdate } = useActionData({
    actionFn: (inputs: EventInputType) => updateEvent(event.id, inputs),
    onSucceed: () => {
      closeModal();
      toast("Updated!");
      reload();
    },
    onError: () => toast("An error occured when updating this event")
  });
  const { pending: deletePending, handleAction: onDelete } = useActionData({
    actionFn: () => deleteEvent(event.id),
    onSucceed: () => {
      closeModal();
      toast("Deleted!");
      reload();
    },
    onError: () => toast("An error occured when deleting this event")
  });

  return (
    <Dialog open={open} onClose={closeModal} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-sm rounded-2xl bg-white p-10 space-y-6">
          <Dialog.Title className="text-3xl font-semibold">Event</Dialog.Title>
          <EventForm
            pending={deletePending || updatePending}
            initialValues={event}
            onUpdate={onUpdate}
            onDelete={onDelete}
            onCancel={closeModal}
          />
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
