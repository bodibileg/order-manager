import { AppBar, IconButton, Toolbar } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import SettingsIcon from "@mui/icons-material/Settings";

interface HeaderProps {
  title: string;
}

const Header = ({ title }: HeaderProps) => {
  const handleHomeClick = () => {
    // Navigate to home page
  };

  return (
    <AppBar>
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="home"
          onClick={handleHomeClick}
        >
          <HomeIcon />
        </IconButton>
        <h4>{title}</h4>
        <IconButton edge="end" color="inherit" aria-label="settings">
          <SettingsIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
