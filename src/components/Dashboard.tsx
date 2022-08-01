import * as React from "react";
import {
  styled,
  createTheme,
  ThemeProvider,
} from "@mui/material/styles";
import {
  CssBaseline,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemButton,
  Box,
  Drawer,
  Typography,
  Divider,
  Container,
} from "@mui/material";
import {
  Mail,
  Home,
  PersonSearch,
  PersonPinCircle,
  CrisisAlert,
} from "@mui/icons-material";
//import Link from "@mui/material/Link";
import { useRouter } from "next/dist/client/router";
import useAuth from "../hook/auth";
import ToggleTheme from "./ToggleTheme";
import { useTranslation } from "../i18n";
import { useMediaQuery } from "@mui/material";
import NavBar from "./AppBar";
import InboxIcon from "@mui/icons-material/MoveToInbox";

import Link from "next/link";

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export type TNavLink = {
  text: string;
  href: string;
  icon: React.ReactElement;
};

const navLinks: TNavLink[] = [
  {
    text: "Home",
    href: "/",
    icon: <Home />,
  },
  {
    text: "Amber Alert",
    href: "/report/missing",
    icon: <CrisisAlert />,
  },
  {
    text: "Missing Persons",
    href: "/missing",
    icon: <PersonPinCircle />,
  },
  {
    text: "Search",
    href: "/search",
    icon: <PersonSearch />,
  },
  {
    text: "Admin",
    href: "/admin",
    icon: <PersonSearch />,
  },
];

function DashboardContent({ children }) {
  const [open, setOpen] = React.useState(false);
  const t = useTranslation();

  const toggleDrawer = () => {
    console.log("toggle called");
    setOpen(!open);
  };

  const list = () => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer}
      onKeyDown={toggleDrawer}
    >
      <List>
        {navLinks.map((item, index) => (
          <Link key={item.href} href={item.href}>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
      <Divider />
      {/*  <List>
        {["All mail", "Trash", "Spam"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <Mail />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List> */}
    </Box>
  );
  console.log("toggleDrawer", open);
  return (
    <>
      <NavBar toggleDrawer={toggleDrawer} />
      <Drawer anchor="left" open={open} onClose={toggleDrawer}>
        {list()}
      </Drawer>
      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,
          height: "100vh",
          overflow: "auto",
        }}
      >
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          {children}
        </Container>
      </Box>
    </>
  );
}

export default function Dashboard({ children }) {
  const auth = useAuth();

  const router = useRouter();
  return <DashboardContent children={children} />;
  /* if (router.pathname !== "/login") {
   
  } else {
    return <DashboardContent children={children} />;
  } */
}
