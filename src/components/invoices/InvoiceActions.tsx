"use client";

import * as React from "react";
import Popover from "@mui/material/Popover";
import { IconButton, Stack } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import DeleteIcon from "@mui/icons-material/Delete";
import EditNoteIcon from "@mui/icons-material/EditNote";
import { useRouter } from "next/navigation";

const InvoiceActions: React.FC<{ onClickDelete(invoNum: string): void; invoNum: string }> = ({
  onClickDelete,
  invoNum,
}) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

  const router = useRouter();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div>
      <IconButton aria-describedby={id} onClick={handleClick}>
        <MenuIcon />
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Stack direction="row">
          <IconButton color="error" onClick={() => onClickDelete(invoNum)}>
            <DeleteIcon />
          </IconButton>
          <IconButton color="inherit" onClick={() => router.push(`edit/${invoNum}`)}>
            <EditNoteIcon />
          </IconButton>
        </Stack>
      </Popover>
    </div>
  );
};

export default InvoiceActions;
