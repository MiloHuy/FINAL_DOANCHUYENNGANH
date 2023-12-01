import { BadgePlus, Home, LogOut, Scroll, SlidersHorizontal } from "lucide-react";

export const sidebarIcons = [
  {
    name: "Home",
    icon: <Home />,
    link: 'manage_account'
  },
  {
    name: "CREATE",
    icon: <BadgePlus />,
    link: 'create'
  },
  {
    name: "LIST",
    icon: <Scroll />,
    link: 'list'
  },
  {
    name: "SETTINGS",
    icon: <SlidersHorizontal />,
    link: 'set_password'
  },
  {
    name: "Logout",
    icon: <LogOut />,
    link: '/logout'
  },
];
