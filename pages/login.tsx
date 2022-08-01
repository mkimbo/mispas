import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import GoogleIcon from "@mui/icons-material/Google";
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";
import GithubIcon from "@mui/icons-material/Github";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { withPublic } from "../src/hook/route";

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
        Mispas Alert System
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

const Login = ({ auth }) => {
  const { user, loginWithGoogle, error } = auth;
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar
          sx={{
            m: 1,
            bgcolor: "transparent",
            border: "0.1px solid #fc7914",
          }}
        >
          <LockOutlinedIcon color="primary" />
        </Avatar>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Button
            fullWidth
            variant="outlined"
            sx={{ mt: 1, mb: 1, width: "100%" }}
            onClick={loginWithGoogle}
            startIcon={<GoogleIcon />}
          >
            Google
          </Button>
          <Button
            fullWidth
            variant="outlined"
            sx={{ mt: 1, mb: 1, width: "100%" }}
            onClick={loginWithGoogle}
            disabled={true}
            startIcon={<TwitterIcon />}
          >
            Twitter
          </Button>
          <Button
            fullWidth
            variant="outlined"
            sx={{ mt: 1, mb: 1, width: "100%" }}
            onClick={loginWithGoogle}
            disabled={true}
            startIcon={<FacebookIcon />}
          >
            Facebook
          </Button>
          <Button
            fullWidth
            variant="outlined"
            sx={{ mt: 1, mb: 1, width: "100%" }}
            onClick={loginWithGoogle}
            disabled={true}
            startIcon={<GithubIcon />}
          >
            Github
          </Button>
          {/* <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="#" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid> */}
        </Box>
      </Box>
      <Copyright sx={{ mt: 5 }} />
    </Container>
  );
};

export default withPublic(Login);
