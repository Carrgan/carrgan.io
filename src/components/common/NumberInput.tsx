import React, { ChangeEvent, useEffect, useState } from "react";
import { Input } from "@mui/joy";

export interface INumberInput {
  value: number;
  onChange: (value: number) => void;
  max?: number;
  min?: number;
}

const NumberInput = ({ value, onChange, max, min }: INumberInput) => {
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

  return <Input type={"number"} value={displayValue} onChange={handleValueChange} />;
};

export default NumberInput;
