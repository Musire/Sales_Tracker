"use client"

import { endOfDay, format, startOfMonth } from "date-fns"
import { CalendarIcon } from "lucide-react"
import * as React from "react"
import { type DateRange } from "react-day-picker"

import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

export function DateRange() {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: startOfMonth(new Date()),
    to: endOfDay(new Date()),
  })

  return (
    <div className="flex w-full items-center justify-between gap-2">
      {/* Date text on the left */}
      <span className="text-sm font-medium text-main whitespace-nowrap">
        {date?.from ? (
          date.to ? (
            <>
              {format(date.from, "MMM dd")} - {format(date.to, "MMM dd")}
            </>
          ) : (
            format(date.from, "MMM dd")
          )
        ) : (
          <span>Pick a date</span>
        )}
      </span>

      {/* Tiny square button locked to the far right */}
      <Popover>
        <PopoverTrigger
          render={
            <button
              type="button"
              aria-label="Select Date Range"
              className="size-7 flex h-7 w-7 shrink-0 items-center justify-center rounded-md hover:bg-surface-2 transition-colors cursor-pointer"
            >
              <CalendarIcon size={16} className="shrink-0 text-main" />
            </button>
          }
        />

        <PopoverContent className="w-auto p-0" align="end">
          <Calendar
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={1}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}