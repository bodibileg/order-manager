import {
  AppBar,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import SettingsIcon from "@mui/icons-material/Settings";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

const Header = () => {
  const title = useSelector((state: RootState) => state.app.title);

  const handleHomeClick = () => {
    // Navigate to home page
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
            <IconButton edge="end" color="inherit" aria-label="settings">
              <SettingsIcon />
            </IconButton>
          </Toolbar>
      </AppBar>
  );
};

export default Header;
