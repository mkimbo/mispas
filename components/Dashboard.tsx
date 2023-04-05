import * as React from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
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
  Public,
} from "@mui/icons-material";
//import Link from "@mui/material/Link";
import { useRouter } from "next/dist/client/router";
//import useAuth from "../hook/auth";
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
    text: "Create Alert",
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
    text: "Utilities",
    href: "/utilities",
    icon: <Public />,
  },
];

const MenuDrawer: React.FunctionComponent<{
  open: boolean;
  toggleDrawer: () => void;
}> = ({ open, toggleDrawer }) => {
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
    </Box>
  );
  return (
    <Drawer anchor="left" open={open} onClose={toggleDrawer}>
      {list()}
    </Drawer>
  );
};

/* function HomePageContent({ children }) {
  const [open, setOpen] = React.useState(false);
  const toggleDrawer = () => {
    console.log("toggle called");
    setOpen(!open);
  };

  return (
    <>
      <NavBar toggleDrawer={toggleDrawer} />
      <MenuDrawer open={open} toggleDrawer={toggleDrawer} />
      <main>{children}</main>
    </>
  );
} */

function DashboardContent({ children }) {
  return (
    <>
      {/*    <NavBar toggleDrawer={toggleDrawer} />
      <MenuDrawer open={open} toggleDrawer={toggleDrawer} />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          //height: "100vh",
          overflow: "auto",
        }}
      >
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          {children}
        </Container>
      </Box> */}
    </>
  );
}

export default function Dashboard({ children }) {
  const router = useRouter();
  if (router.pathname !== "/") {
    return <DashboardContent children={children} />;
  } else {
    //return <HomePageContent children={children} />;
  }
}
