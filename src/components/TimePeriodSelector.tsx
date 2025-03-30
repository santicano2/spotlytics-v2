"use client";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import type { TimePeriod } from "@/lib/types";

interface TimePeriodSelectorProps {
  value: TimePeriod;
  onChange: (value: TimePeriod) => void;
}

export default function TimePeriodSelector({
  value,
  onChange,
}: TimePeriodSelectorProps) {
  return (
    <div className="bg-[#282828] p-3 sm:p-4 rounded-lg">
      <h2 className="text-base sm:text-lg font-medium mb-2 sm:mb-3">
        Time Period
      </h2>
      <RadioGroup
        value={value}
        onValueChange={(value) => onChange(value as TimePeriod)}
        className="flex flex-wrap gap-3 sm:gap-4"
      >
        <div className="flex items-center space-x-1 sm:space-x-2">
          <RadioGroupItem
            value="short_term"
            id="short_term"
            className="border-[#1DB954] text-[#1DB954] cursor-pointer"
          />
          <Label
            htmlFor="short_term"
            className="cursor-pointer text-sm sm:text-base"
          >
            Last 4 weeks
          </Label>
        </div>
        <div className="flex items-center space-x-1 sm:space-x-2">
          <RadioGroupItem
            value="medium_term"
            id="medium_term"
            className="border-[#1DB954] text-[#1DB954] cursor-pointer"
          />
          <Label
            htmlFor="medium_term"
            className="cursor-pointer text-sm sm:text-base"
          >
            Last 6 months
          </Label>
        </div>
        <div className="flex items-center space-x-1 sm:space-x-2">
          <RadioGroupItem
            value="long_term"
            id="long_term"
            className="border-[#1DB954] text-[#1DB954] cursor-pointer"
          />
          <Label
            htmlFor="long_term"
            className="cursor-pointer text-sm sm:text-base"
          >
            Last 1 year
          </Label>
        </div>
      </RadioGroup>
    </div>
  );
}
