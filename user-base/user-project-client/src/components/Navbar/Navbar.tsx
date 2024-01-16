import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import MenuItem from "@mui/material/MenuItem";
import AssistWalkerIcon from "@mui/icons-material/AssistWalker";
import { mainNavbarItems } from "./constants/navbarItems";
import Button from "@mui/material/Button";
import { useAuth } from "../../hooks/useAuth";
import { useAppDispatch } from "../../store/hooks";
import { logOut } from "../../store/user/user.slice";
import Grid from "@mui/material/Grid";
import Tooltip from "@mui/material/Tooltip";
import { removeTokenFromLocalStorage } from "../../helpers/localstorage.helper";
import { toast } from "react-toastify";
export const Navbar: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleLogOut = () => {
    dispatch(logOut());
    removeTokenFromLocalStorage("token");
    toast.success("You logged out.");
    navigate("/");
  };

  const isAuth = useAuth();

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AssistWalkerIcon
            sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
          />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              width: "550px",
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            lbus Dumbledore
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            {isAuth ? (
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {mainNavbarItems.map((item, index) => (
                  <MenuItem key={index} onClick={() => navigate(item.route)}>
                    <Typography textAlign="center">{item.label}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            ) : (
              <></>
            )}
          </Box>
          <Box sx={{ mr: 5 }}>
            <AssistWalkerIcon
              sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
            />
            <Typography
              variant="h5"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              lbus Dumbledore
            </Typography>
          </Box>
          {isAuth ? (
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {mainNavbarItems.map((item, index) => (
                <MenuItem key={index} onClick={() => navigate(item.route)}>
                  <Typography textAlign="center">{item.label}</Typography>
                </MenuItem>
              ))}
            </Box>
          ) : (
            <></>
          )}
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Tooltip title="Log out / Log in" placement="top-start">
                {isAuth ? (
                  <Button
                    color="secondary"
                    sx={{ color: "white" }}
                    variant="contained"
                    onClick={handleLogOut}
                  >
                    Log out
                  </Button>
                ) : (
                  <Button
                    color="secondary"
                    sx={{ color: "white" }}
                    variant="contained"
                    href="auth"
                  >
                    Log in / Sign In
                  </Button>
                )}
              </Tooltip>
            </Grid>
          </Grid>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
