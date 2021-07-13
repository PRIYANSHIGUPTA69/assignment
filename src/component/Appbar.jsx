import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import SubdirectoryArrowRightIcon from '@material-ui/icons/SubdirectoryArrowRight';
import BookIcon from '@material-ui/icons/Book';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import PieChartIcon from '@material-ui/icons/PieChart';
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';
import ViewCarouselIcon from '@material-ui/icons/ViewCarousel';
import MultilineChartIcon from '@material-ui/icons/MultilineChart';
import CreditCardIcon from '@material-ui/icons/CreditCard';
import { Link } from 'react-router-dom'
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(3),
    fontSize:15,
    fontWeight:"bold",
    color:"#000000"
  },
  title: {
    flexGrow: 1,
  },
  color:{
      backgroundColor:"#ffffff",
      alignItems:"center"
  }
}));

export default function Appbar() {
  const classes = useStyles();
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleChange = (event) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.root}>
      <FormGroup>
        <FormControlLabel
          control={<Switch checked={auth} onChange={handleChange} aria-label="login switch" />}
          label={auth ? 'Logout' : 'Login'}
        />
        
      </FormGroup>
      <AppBar position="static" className={classes.color}>
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton}  aria-label="menu">
            <ViewCarouselIcon />
            Projects
          </IconButton>
          <IconButton edge="start" className={classes.menuButton} aria-label="menu">
            <PlaylistAddCheckIcon/>
            Tasks
          </IconButton>
          <IconButton edge="start" className={classes.menuButton}  aria-label="menu">
            <SubdirectoryArrowRightIcon></SubdirectoryArrowRightIcon>
            Leads
          </IconButton>
          <IconButton edge="start" className={classes.menuButton}  aria-label="menu">
            <MonetizationOnIcon />
            Payments
          </IconButton>
          <IconButton edge="start" className={classes.menuButton}  aria-label="menu">
          <MultilineChartIcon />
            Monitoring
          </IconButton>
          <IconButton edge="start" className={classes.menuButton}  aria-label="menu">
           <CreditCardIcon></CreditCardIcon>
           Subscription
          </IconButton>
          <IconButton edge="start" className={classes.menuButton}  aria-label="menu">
          <PieChartIcon></PieChartIcon>
          <Link to='/'>Analytics</Link> 
          </IconButton>
          <IconButton edge="start" className={classes.menuButton}  aria-label="menu">
          
          <BookIcon></BookIcon>
           <Link to="/books">Books</Link>
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  );
}