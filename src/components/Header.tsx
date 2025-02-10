"use client";

import {
  AppBar,
  Toolbar,
  IconButton,
  Avatar,
  Typography,
  Menu,
  MenuItem,
  Tooltip,
  Badge,
  Stack,
} from "@mui/material";
import { NotificationsOutlined, ExpandMoreRounded } from "@mui/icons-material";
import { useEffect, useState } from "react";
import MaterialUISwitch from "./MaterialUISwitch";
import { User } from "@/lib/types/user";

export default function Header() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isDarkTheme, setIsDarkTheme] = useState<boolean>(false);
  const [user, setUser] = useState<User>();

  useEffect(() => {
    fetch("/api/users/507f1f77bcf86cd799439011")
      .then((res) => res.json())
      .then((user) => {
        setUser(user);
      });
  }, []);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="fixed" elevation={0} sx={{ backgroundColor: "white", color: "black" }}>
      <Toolbar className="flex justify-between px-4">
        {/* Left empty for spacing */}
        <div></div>

        {/* Icons Section */}
        <div className="flex items-center space-x-4">
          <Tooltip title={isDarkTheme ? "Switch to light mode" : "Switch to dark mode"}>
            <MaterialUISwitch val={isDarkTheme} handleOnChange={setIsDarkTheme} />
          </Tooltip>

          <Tooltip title="Notifications">
            <IconButton className="p-1 rounded-lg" sx={{ backgroundColor: "#EFF4FB" }}>
              <NotificationsOutlined />
            </IconButton>
          </Tooltip>

          <Tooltip title="Messages">
            <IconButton className="p-1 rounded-lg" sx={{ backgroundColor: "#EFF4FB" }}>
              <Badge color="error" variant="dot">
                <img
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAACC0lEQVR4nN1VvWtUQRBfRcQvFCHoH2AULVUQQW1E8A8QC4mg3sy9xIDK25mLIpItvTezZyKKlVraqYWV2EbLCBrTiElv4UcUooWJ7L29I3Dn5T1NGn+wxXvz29987OysMf81kqv1bUg6hCxPgWUGWb7H9QFInwDLYOCUFnbOrQPSUSD9gqyLvZd8RtIbYU8hcbg8vhNJX7UFSJ8jy3lIG/2Jc5vCGqxlu4H0Qm7LecDycoh0x7IlAdLXccMMsBxZLqDE+qNAOhuzmexZMmR5GInvEuv7CqWcO+lD0ukY2P3upFp2AFkWkHQ+YdllSgLSRn/YGzQq1u/vJLCMx+hvlRVvAUjHmlmQjnUzTjWNI/VD5i+BaeNwLNObTiPpXDAOXLq9tf2P8w4p+t28N3nnzXU6YPn6rw7StLExZvBjdUpE/mA8x7flDqggkMX9sVVDa7XaNLScKYmL125uR9KPwUGV5UT3CEgfxEOaLnPRApD0XqzAlDGLa0w35F0gk5E4i7XsmCkAtP4MkP6KwR3vSQ4DC0kn2kOM9EWlllXQ+j1nSTcPD9/dkli/t8pyKoqfRNKf8XDvFB7XaLPrQPqp56i2fqAlHgI57dx6UwbhTiD5BFkeI8v78NgAy7clb8FCFH92zrkNZqWAS7IAlkelIy/kgHS+av2VFRVuOyCdgJH6vlURD3DOrS1K/g1e+YhdniVYdwAAAABJRU5ErkJggg=="
                  alt="speech-bubble-with-dots"
                  style={{ transform: "scaleX(-1)" }}
                />
              </Badge>
            </IconButton>
          </Tooltip>

          {/* Profile Section */}
          <div className="flex items-center space-x-2">
            <Stack>
              <Typography
                variant="caption"
                sx={{ fontWeight: 600, textAlign: "right", fontSize: 10 }}
              >
                {user?.username}
              </Typography>
              <Typography variant="caption" className="text-gray-500" sx={{ fontSize: 10 }}>
                {user?.isVerified ? "Verified Member" : "Not yet verified"}
              </Typography>
            </Stack>
            <Stack
              direction="row"
              onClick={handleMenuOpen}
              sx={{ alignItems: "center", cursor: "pointer" }}
            >
              <Avatar alt="John Doe" src="https://i.pravatar.cc/40" className="cursor-pointer" />
              <ExpandMoreRounded />
            </Stack>
          </div>

          {/* Dropdown Menu */}
          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
            <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
            <MenuItem onClick={handleMenuClose}>Settings</MenuItem>
            <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
  );
}
