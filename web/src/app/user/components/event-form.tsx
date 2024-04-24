import React from "react";
import { Input } from "@/components/ui/input";
import { DateRangePicker } from "./date-range-picker";
import { cn } from "@/lib/utils";
import { EventInputType, EventType } from "@/lib/types";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { ActionButton } from "@/components/common";
import { isEqual } from "date-fns";

// eslint-disable-next-line react-refresh/only-export-components
export function useEventForm(params?: EventInputType) {
  const [event, setEvent] = React.useState<Omit<EventType, "id">>(() => ({
    title: "",
    description: "",
    start: new Date(),
    ...params
  }));

  const title = React.useMemo(
    () => ({
      value: event.title,
      onChange: (value: string) =>
        setEvent((state) => ({ ...state, title: value })),
      id: "create-event-title"
    }),
    [event]
  );

  const description = React.useMemo(
    () => ({
      value: event.description,
      onChange: (value: string) =>
        setEvent((state) => ({ ...state, description: value })),
      id: "create-event-description"
    }),
    [event]
  );

  const date = React.useMemo(
    () => ({
      value: { start: event.start, end: event.end },
      onChange: ({ start, end }: { start: Date; end?: Date }) =>
        setEvent((state) => ({ ...state, start, end })),
      id: "create-event-date"
    }),
    [event]
  );

  return { title, description, date };
}

type EventFormType = {
  title: string;
  description: string;
  date: {
    start: Date;
    end?: Date;
  };
};

interface EventFormProps {
  initialValues?: EventType;
  className?: string;
  onCreate?: (inputs: Omit<EventType, "id">) => void;
  onUpdate?: (inputs: EventInputType) => void;
  onDelete?: (id: number) => void;
  onCancel?: () => void;
  pending: boolean;
}

export function EventForm({
  className,
  initialValues,
  onCreate,
  onUpdate,
  onDelete,
  onCancel,
  pending
}: EventFormProps) {
  const form = useForm<Omit<EventFormType, "id">>({
    defaultValues: initialValues
      ? {
          ...initialValues,
          date: { start: initialValues.start, end: initialValues.end }
        }
      : undefined
  });

  const handleCreate = React.useCallback(() => {
    const { title, description, date } = form.getValues();
    onCreate?.({ title, description, ...date });
  }, [form, onCreate]);

  const handleUpdate = React.useCallback(() => {
    const { title, description, date } = form.getValues();
    onUpdate?.({
      title: title === initialValues?.title ? undefined : title,
      description:
        description === initialValues?.description ? undefined : description,
      start:
        initialValues && isEqual(date.start, initialValues.start)
          ? undefined
          : date.start,
      end:
        (!initialValues?.end && !date.end) ||
        (initialValues?.end && date.end && isEqual(initialValues.end, date.end))
          ? undefined
          : date.end
    });
  }, [form, onUpdate, initialValues]);

  const handleDelete = React.useCallback(() => {
    if (initialValues && onDelete) onDelete(initialValues.id);
  }, [onDelete, initialValues]);

  return (
    <Form {...form}>
      <form className={cn("space-y-6", className)}>
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="space-y-0">
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="space-y-0">
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea placeholder="Additionnal note..." {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="date"
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            render={({ field: {ref:_, ...field} }) => (
              <FormItem className="space-y-0">
                <FormLabel>Starting and ending date</FormLabel>
                <FormControl>
                  <DateRangePicker {...field} />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <div className="flex justify-start items-center gap-2">
          {onCreate && (
            <ActionButton
              pending={pending}
              onClick={handleCreate}
              label={(isPending) => (isPending ? "Creating..." : "Create")}
            />
          )}
          {onUpdate && (
            <ActionButton
              label={(isPending) => (isPending ? "Saving..." : "Save")}
              onClick={handleUpdate}
              pending={pending}
            />
          )}
          {onDelete && (
            <ActionButton
              label={(isPending) => (isPending ? "Deleting..." : "Delete")}
              variant="destructive"
              onClick={handleDelete}
              pending={pending}
            />
          )}
          <Button variant="outline" onClick={onCancel}>
            Close
          </Button>
        </div>
      </form>
    </Form>
  );
}
