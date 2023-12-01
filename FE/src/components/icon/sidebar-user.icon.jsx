import { BadgePlus, BookA, Home, LogOut, Scroll, SlidersHorizontal } from "lucide-react";

export const sidebarIconsUser = [
    {
        name: "Home",
        icon: <Home />,
        link: 'user/home'
    },
    {
        name: "INFO",
        icon: <BookA />,
        link: 'user/details'
    },
    {
        name: "CREATE",
        icon: <BadgePlus />,
        link: 'user/create'
    },
    {
        name: "LIST",
        icon: <Scroll />,
        link: 'user/list'
    },
    {
        name: "SETTINGS",
        icon: <SlidersHorizontal />,
        link: 'user/set_password'
    },
    {
        name: "Logout",
        icon: <LogOut />,
        link: '/logout'
    },
];
