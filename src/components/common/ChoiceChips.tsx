import * as React from "react";
import Checkbox from "@mui/joy/Checkbox";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
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
    <List
      orientation="horizontal"
      wrap
      sx={{
        "--List-gap": "8px",
        "--ListItem-radius": "20px",
        "--ListItem-minHeight": "32px"
      }}
    >
      {items.map((item, index) => (
        <ListItem key={item.value}>
          {includeItem(item) && (
            <Done
              fontSize="medium"
              color="primary"
              sx={{ ml: -0.5, mr: 0.5, zIndex: 2, pointerEvents: "none" }}
            />
          )}
          <Checkbox
            size="sm"
            disabled={item.disable}
            disableIcon
            overlay
            label={item.title}
            checked={includeItem(item)}
            variant={includeItem(item) ? "soft" : "outlined"}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              if (event.target.checked) {
                onChange([...selectedItems, item]);
              } else {
                onChange(selectedItems.filter(selectedItem => selectedItem.value !== item.value));
              }
            }}
            slotProps={{
              action: ({ checked }) => ({
                sx: checked
                  ? {
                      border: "1px solid",
                      borderColor: "primary.500"
                    }
                  : {}
              })
            }}
          />
        </ListItem>
      ))}
    </List>
  );
};

export default ChoiceChips;
