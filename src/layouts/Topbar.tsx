import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import MenuIcon from '@mui/icons-material/Menu';
import { Menu, MenuItem } from "@mui/material";

const pages = ["HOME", "PROGRAMS", "NOTES"];

function TopBar() {
  const navigate = useNavigate();

  const goTo = (page: string) => {
    if (page === "HOME") navigate("/home");
    if (page === "PROGRAMS") navigate("/programs");
    if (page === "NOTES") navigate("/notes");
  };

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);

  const handleOpenNav = (event: React.MouseEvent<HTMLElement>) =>
    setAnchorElNav(event.currentTarget);

  const handleCloseNav = () => setAnchorElNav(null);


  return (
    <AppBar position="static">
      <Toolbar>

        {/* LOGO */}
        <Box onClick={() => goTo("HOME")} sx={{ cursor: "pointer" }}> 
          <Typography
            variant="h4"
            noWrap
            sx={{
              fontWeight: 700,
              display: "flex",
              alignItems: "center",
            }}
          >
            <span
              style={{
                display: "inline-block",
                transform: "skewX(-10deg)",
                marginRight: 4,
                fontWeight: 700,
              }}
            >
              the
            </span>
            WOD
          </Typography>
        </Box>


        {/* RIGHT SIDE MENU */}
        <Box
          sx={{
            flexGrow: 1,
            display: { xs: "none", md: "flex" },   // ← hide on mobile, show on desktop
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          {pages.map((page) => (
            <Button
              key={page}
              sx={{ color: "white", mx: 1 }}
              onClick={() => goTo(page)}
            >
              {page}
            </Button>
          ))}

          {/* PROFILE ICON */}
          <IconButton sx={{ p: 0, ml: 2 }}>
            <Avatar alt="User" src="/static/images/avatar/2.jpg" />
          </IconButton>
        </Box>


        {/* RIGHT SIDE MENU MOBILE */}
        <Box
          sx={{
            flexGrow: 1,
            display: { xs: "flex", md: "none" },
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <IconButton sx={{ p: 0, ml: 2 }} onClick={handleOpenNav}>
            <MenuIcon />
          </IconButton>
        </Box>

        {/* MOBILE MENU POPUP */}
        <Menu
          anchorEl={anchorElNav}
          open={Boolean(anchorElNav)}
          onClose={handleCloseNav}
        >
          <MenuItem onClick={() => { handleCloseNav(); goTo('HOME') }}>Home</MenuItem>
          <MenuItem onClick={() => { handleCloseNav(); goTo('PROGRAMS') }}>Programs</MenuItem>
          <MenuItem onClick={() => { handleCloseNav(); goTo('NOTES') }}>Notes</MenuItem>
          <MenuItem onClick={handleCloseNav}>Profile</MenuItem>
        </Menu>








      </Toolbar>
    </AppBar>
  );
}

export default TopBar;
