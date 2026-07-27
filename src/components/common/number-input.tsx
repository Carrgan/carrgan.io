import React, { ChangeEvent, useEffect, useState } from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";

export interface INumberInput {
  value: number;
  onChange: (value: number) => void;
  max?: number;
  min?: number;
  startDecorator?: React.ReactNode;
}

const NumberInput = ({ value, onChange, max, min, startDecorator }: INumberInput) => {
  const [displayValue, setDisplayValue] = useState<number | "">(value);

  useEffect(() => {
    setDisplayValue(value);
  }, [value]);

  const handleValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;
    if (v === "") {
      setDisplayValue("");
      return;
    }
    const numberValue = Number(v);
    if ((max && numberValue > max) || (min && numberValue < min)) {
      return;
    }
    setDisplayValue(numberValue);
    onChange(numberValue);
  };

  return (
    <OutlinedInput
      type={"number"}
      value={displayValue}
      startAdornment={
        startDecorator ? (
          <InputAdornment position="start">{startDecorator}</InputAdornment>
        ) : undefined
      }
      onChange={handleValueChange}
      sx={{ maxWidth: 300 }}
    />
  );
};

export default NumberInput;
