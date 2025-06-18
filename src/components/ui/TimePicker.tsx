"use client"

import * as React from "react"
import Input from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function TimePicker({
  time,
  setTime,
}: {
  time: string
  setTime: (val: string) => void
}) {
  return (
    <div className="flex flex-col gap-3">
      <Label htmlFor="time-picker" className="px-1">
        Time
      </Label>
      <Input
        type="time"
        id="time-picker"
        step="1"
        value={time}
        onChange={(e) => setTime(e.target.value)}
        className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
      />
    </div>
  )
}
