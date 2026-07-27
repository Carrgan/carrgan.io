import * as React from "react";
import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";
import Done from "@mui/icons-material/Done";
import { useCallback, useMemo } from "react";

export interface IChoiceChipsItem {
  title: string;
  value: any;
  disable?: boolean;
}

interface IChoiceChips {
  selectedItems: IChoiceChipsItem[];
  items: IChoiceChipsItem[];
  onChange: (items: IChoiceChipsItem[]) => void;
}

const ChoiceChips = ({ selectedItems, items, onChange }: IChoiceChips) => {
  const selectedValues = useMemo(() => selectedItems.map(i => i.value), [selectedItems]);
  const includeItem = useCallback(
    (currentItem: IChoiceChipsItem) => selectedValues.includes(currentItem.value),
    [selectedValues]
  );
  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
      {items.map((item) => (
        <Chip
          key={item.value}
          label={item.title}
          icon={includeItem(item) ? <Done /> : undefined}
          variant={includeItem(item) ? "filled" : "outlined"}
          color={includeItem(item) ? "primary" : "default"}
          disabled={item.disable}
          onClick={() => {
            if (includeItem(item)) {
              onChange(selectedItems.filter(s => s.value !== item.value));
            } else {
              onChange([...selectedItems, item]);
            }
          }}
        />
      ))}
    </Box>
  );
};

export default ChoiceChips;
