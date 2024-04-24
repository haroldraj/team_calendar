import * as React from "react";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";

interface DateRangePickerProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  onChange: (params: { start: Date; end?: Date }) => void;
  value?: {
    start: Date;
    end?: Date | undefined;
  };
}

export function DateRangePicker({
  className,
  onChange,
  value
}: DateRangePickerProps) {
  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[300px] justify-start text-left font-normal",
              !value && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {value?.start ? (
              value.end ? (
                <>
                  {format(value.start, "LLL dd, y")} -{" "}
                  {format(value.end, "LLL dd, y")}
                </>
              ) : (
                format(value.start, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={value?.start}
            selected={{ from: value?.start, to: value?.end }}
            onSelect={(values) => {
              if (values && values.from)
                onChange({
                  start: values.from,
                  end: values.to
                });
            }}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
