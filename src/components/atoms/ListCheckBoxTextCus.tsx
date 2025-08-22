import {
  Checkbox,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListSubheader,
} from "@mui/material";
import { useState } from "react";
import LoadingCus from "../atoms/LoadingCus";

export default function ListCheckBoxTestCus({ title, items, onChange }) {
  const [checked, setChecked] = useState<string[]>([]);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
    onChange?.(newChecked);
  };

  return !items ? (
    <LoadingCus />
  ) : (
    <List
      subheader={
        <ListSubheader sx={{ fontWeight: "bold", color: "black" }}>
          {title}
        </ListSubheader>
      }
      sx={{ width: "100%", borderTop: "3px solid grey", mt: 2 }}
    >
      {items.map((value, index) => (
        <ListItem key={value} disablePadding>
          <ListItemButton onClick={handleToggle(value)} dense sx={{ gap: 1 }}>
            <Checkbox
              checked={checked.indexOf(value) !== -1}
              sx={{ p: 0, m: 0 }}
            />
            <ListItemText
              id={index}
              primary={value}
              sx={{ margin: 0 }}
              primaryTypographyProps={{ fontSize: 14 }}
            />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
}
