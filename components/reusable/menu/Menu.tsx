import React, { useState } from "react";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import MDMenu from "@mui/material/Menu";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

interface MenuProps {
  id: string;
  label: string;
  items: any[];
}

const Menu = ({ id, label, items }: MenuProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id={`${id}-button`}
        aria-controls={open ? `${id}-menu` : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        sx={{
          color: "var(--black)",
          fontWeight: "normal",
        }}
      >
        {label} {open ? <ExpandLess /> : <ExpandMore />}
      </Button>

      <MDMenu
        id={`${id}-menu`}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": `${id}-button`,
        }}
      >
        {items.map((item: any, index: number) => (
          <MenuItem key={index} onClick={handleClose} selected={item.selected}>
            {item.content}
          </MenuItem>
        ))}
      </MDMenu>
    </div>
  );
};

export default Menu;
