import {
  AppBar,
  FormControlLabel,
  IconButton,
  Menu,
  MenuItem,
  Switch,
  Toolbar,
  Typography,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import SettingsIcon from "@mui/icons-material/Settings";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { useState } from "react";
import { toggleDarkMode } from "../../store/appSlice";

const Header = () => {
  const title = useSelector((state: RootState) => state.app.title);
  const isDarkMode = useSelector((state: RootState) => state.app.isDarkMode);
  const dispatch: AppDispatch = useDispatch();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleHomeClick = () => {
    // Navigate to home page
  };

  const handleSettingsClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDarkModeToggle = () => {
    dispatch(toggleDarkMode());
  };

  return (
    <AppBar position="sticky">
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="home"
          onClick={handleHomeClick}
        >
          <HomeIcon />
        </IconButton>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, textAlign: "left" }}
        >
          {title}
        </Typography>
        <IconButton
          edge="end"
          color="inherit"
          aria-label="settings"
          onClick={handleSettingsClick}
        >
          <SettingsIcon />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem>
            <FormControlLabel
              control={
                <Switch
                  checked={isDarkMode}
                  onChange={handleDarkModeToggle}
                  name="darkModeSwitch"
                  color="primary"
                />
              }
              label="Dark Mode"
            />
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
