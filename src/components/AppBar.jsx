import React from 'react'
import { Link } from "react-router-dom"
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ViewListIcon from '@material-ui/icons/ViewList';
import AudiotrackIcon from '@material-ui/icons/Audiotrack';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ExploreIcon from '@material-ui/icons/Explore';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Brightness3 from '@material-ui/icons/Brightness3';
import WbSunny from '@material-ui/icons/WbSunny';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Tooltip from '@material-ui/core/Tooltip';
import logo from '../images/logo3.png'

import { logOut, isAuthenticated } from '../lib/Auth'

const useStyles = makeStyles((theme) => ({
  root: {
    flex: 1,
    width: '100vw'
  },
  toolbar: {
        justifyContent: 'space-between'
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  navLink: {
    color: theme.palette.text.primary
  }
}));

export default function MenuAppBar(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogoutClick = () => {
    handleClose()
    logOut()
  }

  const BrightnessIcon = () => {
    if (props.uiMode === 'light') {
      return (
        <Tooltip title="Set to dark mode">
          <IconButton
            aria-label="light mode"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            color="inherit"
            onClick={() => props.handleUiModeClick('dark')}
          >
            <WbSunny />
          </IconButton>
        </Tooltip>
      )
    } else if (props.uiMode === 'dark') {
      return (
        <Tooltip title="Set to light mode">
          <IconButton
            aria-label='dark mode'
            aria-controls="menu-appbar"
            aria-haspopup="true"
            color="inherit"
            onClick={() => props.handleUiModeClick('light')}
          >
            <Brightness3 />
          </IconButton>
        </Tooltip>
      )
    }
  }

  return (
    <div className={classes.root}>
      <AppBar position="static" elevation={1} color="transparent">
        <Toolbar className={classes.toolbar}>
          <img src={logo} height={40} />
          {isAuthenticated() && (
            <div>
              <Link to='/feed' className={classes.navLink}>
                <Tooltip title="Explore Sequences">
                  <IconButton
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    color="inherit"
                  >
                    <ExploreIcon />
                  </IconButton>
                </Tooltip>
              </Link>
              <Link to='/sequences' className={classes.navLink}>
                <Tooltip title="Your Sequences">
                  <IconButton
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    color="inherit"
                  >
                    <ViewListIcon />
                  </IconButton>
                </Tooltip>
              </Link>
              <BrightnessIcon />
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
              >
                <Link to="/user-settings" className={classes.navLink}>
                  <MenuItem>Settings</MenuItem>
                </Link>
                <MenuItem onClick={handleLogoutClick}>Sign Out</MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
