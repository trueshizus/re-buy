"use client";

import { useState } from "react";

interface RangeInputProps {
  min: number;
  max: number;
  step: number;
  defaultValue: number;
}

export default function RangeInput({
  min,
  max,
  step,
  defaultValue,
}: RangeInputProps) {
  const [value, setValue] = useState(defaultValue);

  return (
    <div className="mb-4">
      <label
        htmlFor="bidAmount"
        className="block text-sm font-medium text-gray-700 mb-2"
      >
        Bid Amount: $<span>{value}</span>
      </label>
      <input
        type="range"
        id="bidAmount"
        name="bidAmount"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => setValue(Number(e.target.value))}
        className="w-full"
      />
    </div>
  );
}
