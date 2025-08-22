import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Collapse, List, ListItemButton, ListItemText } from "@mui/material";
import { useEffect, useState } from "react";
import LoadingCus from "../atoms/LoadingCus";

export default function ListTextCus({
  title,
  value,
  items,
  onSelect,
}: {
  title: string;
  value?: string;
  items?: { id: string | undefined; text: string }[];
  onSelect?: (id: string | undefined) => void;
}) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (items && items.length > 0 && selected === undefined) {
      let newSelected: string | undefined;
      let newId: string | undefined;

      if (value) {
        const found = items.find((i) => i.id === value);
        if (found) {
          newSelected = found.text;
          newId = found.id;
        }
      }

      if (!newSelected) {
        newSelected = items[0].text;
        newId = items[0].id;
      }

      setSelected(newSelected);
      onSelect?.(newId);
    }
  }, [items]);

  const handleClick = () => {
    setOpen(!open);
  };

  const handleSelect = (item: { id: string | undefined; text: string }) => {
    setSelected(item.text);
    onSelect?.(item.id);
    setOpen(false);
  };

  return !items ? (
    <LoadingCus />
  ) : (
    <List sx={{ bgcolor: "#ff6600", p: 0 }}>
      <ListItemButton onClick={handleClick}>
        <ListItemText
          primary={`${title}: ${selected ?? ""}`}
          primaryTypographyProps={{
            style: { fontSize: 14, color: "black", fontWeight: "bold" },
          }}
        />
        {open ? (
          <ExpandLessIcon sx={{ color: "white" }} />
        ) : (
          <ExpandMoreIcon sx={{ color: "white" }} />
        )}
      </ListItemButton>

      <Collapse in={open}>
        <List component="div" disablePadding>
          {items.map((item, index) => (
            <ListItemButton
              key={index}
              sx={{
                pl: 4,
                bgcolor: selected === item.text ? "#ff9933" : "#f9c659",
              }}
              onClick={() => handleSelect(item)}
            >
              <ListItemText
                primary={item.text}
                primaryTypographyProps={{
                  style: { color: "#000000" },
                }}
              />
            </ListItemButton>
          ))}
        </List>
      </Collapse>
    </List>
  );
}
