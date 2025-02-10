"use client";

import { Drawer, List, ListItem, ListItemText, ListItemIcon, Typography } from "@mui/material";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const [active, setActive] = useState<string>(pathname.split("/")[1] || "add");

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 240,
          backgroundColor: "#1E2533",
          color: "white",
          padding: "1rem",
          position: "relative",
        },
      }}
    >
      <div className="flex items-center justify-center space-x-2 mb-6">
        <img src="/img/InvoiceHub_logo.png" alt="InvoiceHub Logo" className="w-3/4 h-full" />
      </div>

      <List>
        <ListItem>
          <Typography variant="caption" className="text-gray-400">
            MENU
          </Typography>
        </ListItem>
        <ListItem
          component="button"
          sx={{ opacity: active === "add" ? 1 : 0.6 }}
          onClick={() => {
            setActive("add");
            router.push("/add");
          }}
        >
          <ListItemIcon sx={{ minWidth: "auto", mr: 1 }}>
            <img
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAAsTAAALEwEAmpwYAAABh0lEQVR4nO1VvUrEQBiMnoiCIApai6XdvYHNyWnjKdr5Ejb2/oDgA4g/KGIp1laCL2BhISoiNlYRPMPOLAEVPlndkzUkd6cmZ3EZmGbzZWd2v8kXz8tRB0qpMQDzhlrrmSAIBr1WgWQRwCtJcXgpIp2tMrAZEf8ggPG4egDDJG/i3okhtNbTieIi0kXy0Qo+AFh0DGwlGCg1KV7bZ6fe6ctO4YaIdAC4t2tPItIdY7oAYIXkUSMC2AvDcCTRAIADx23Rrq07a1NeVhCRHpKBPf0LgG3LE+dWDjMzoJSabaKHSkR6MzHAzz41DJFSai51cd/3+wBoe80XQRAMuDR5cEwcp24AwIIjsJRQc24NhtVqtT+VORCG4SiAfZJ3TtGp1roS+czWSN46NWcAVu2z388BALsJhc+1GpITdTYr/WkOaK0rJtmRTd/M5xe54usYA1dKqaE0o9CGEJECycnavz9rGi2j+WXAJPknCU6DJrD/bWA52oJyC1tQ/taCHDkknwPI50Ab4x0cs1tPN7b+HAAAAABJRU5ErkJggg=="
              alt="external-article-neu-text-neu-royyan-wijaya"
              className="w-6"
            />
          </ListItemIcon>
          <ListItemText primary="Add Invoice" />
        </ListItem>
        <ListItem
          component="button"
          sx={{ opacity: active === "list" ? 1 : 0.6 }}
          onClick={() => {
            setActive("list");
            router.push("/list");
          }}
        >
          <ListItemIcon sx={{ minWidth: "auto", mr: 1 }}>
            <img
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAACOklEQVR4nO2aO4sUQRSFS1dT32ugKIhmrvoPxEDcVANzQUEDDQRfgS8MREx84Oa7CiomC+JuKCbCspqZqZGBJsNMT32negLRktYZGEbmUfOy7O0PTtQ09Olbfe/tumVMQUFBX0g6IOk58L6NloHHSZLsMbEC7ANqknwPStI03WliBJjr0cRvAXdNjABLgUZemhgBllsedgY43pCkJy1GXjXfnyTJbkn3Jb0Yop4B5733E4MYOdF8XdLFdka892uALyERDYz+7bEYqdVqu0ZlQn/0ZlwRWSXpwwgjcnYQI9kavdwQsNDlG9kk6RRwZ4i6JelIzybqRt4GvqV5EyOSHgWG/JqJEefcNuBrjyY+lcvl9SZWrLWT2ZvO8nebvP5U0qVSqbTuXz/rysFaOwkcAg63ylp7sFKpbDAx471fLekh8LNLtvoO3DSx4pw7E5K1nHPHTIwAi4F1ZNbECC2VHZCkckNA2qmyZ3jv1yZJsnFYKveT4gfpterXL9TND7vX+gxMjcVItVrdDPwYYdM4XxhR+NK6KokRROQjsHdFfuyLuUi/zrnTgQXxqIm4RXnQS4si6YaJHWvtlv+6acwVwNZs2XT5sboS9Y+Vc2478K3XtiHaJSZpJrBQXTcxQl62g/i7si80b5ZJet2psmeVWNLJ5k29IWl6ICOhW6bAuxF2v+fGYiRPm9gTMY8VZvoY9NyLYdCzlJfR22xehqFTAePpSpqmO0ysAPvr67LTgYG5qA8MFBQUmAa/AIBcLg45To+LAAAAAElFTkSuQmCC"
              alt="list"
              className="w-7"
            />
          </ListItemIcon>
          <ListItemText primary="My Invoices" />
        </ListItem>
      </List>
    </Drawer>
  );
}
