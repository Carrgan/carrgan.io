import React, { ChangeEvent, useEffect, useState } from "react";
import { Input } from "@mui/joy";

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
    <Input
      type={"number"}
      startDecorator={"21"}
      value={displayValue}
      startDecorator={startDecorator}
      onChange={handleValueChange}
    />
  );
};

export default NumberInput;
