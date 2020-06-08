import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { closeSS } from '../../actions/servicestation';
// import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
// import MenuIcon from '@material-ui/icons/Menu';
// import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
// import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import ExitToAppRoundedIcon from '@material-ui/icons/ExitToAppRounded';
import { Link, withRouter } from 'react-router-dom';
import { Button, Header, Icon, Modal } from 'semantic-ui-react'


import './Nav.css';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { useEffect } from 'react';
const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    // display: 'none',
    border: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  // search: {
  //   position: 'relative',
  //   borderRadius: theme.shape.borderRadius,
  //   backgroundColor: fade(theme.palette.common.white, 0.15),
  //   '&:hover': {
  //     backgroundColor: fade(theme.palette.common.white, 0.25),
  //   },
  //   marginRight: theme.spacing(2),
  //   marginLeft: 0,
  //   width: '100%',
  //   [theme.breakpoints.up('sm')]: {
  //     marginLeft: theme.spacing(3),
  //     width: 'auto',
  //   },
  // },
  // searchIcon: {
  //   padding: theme.spacing(0, 2),
  //   height: '100%',
  //   position: 'absolute',
  //   pointerEvents: 'none',
  //   display: 'flex',
  //   alignItems: 'center',
  //   justifyContent: 'center',
  // },
  // inputRoot: {
  //   color: 'inherit',
  // },
  // inputInput: {
  //   padding: theme.spacing(1, 1, 1, 0),
  //   // vertical padding + font size from searchIcon
  //   paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
  //   transition: theme.transitions.create('width'),
  //   width: '100%',
  //   [theme.breakpoints.up('md')]: {
  //     width: '20ch',
  //   },
  // },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
}));

function Nav(props) {
  const [notificationTrigger, setNT] = useState(false);
  const [notifications, setNotifications] = useState({
    allNotifications: []
  })
  const {userAuth, vendor, user} = useSelector(st => st);
  useEffect(()=>{
    console.log("US", props);
    if(user.userSocket){
      user.userSocket.on('loggedInNotification', res => {
        console.log(res);
        if(res.unreadNotifications){
          setNotifications({
            ...notifications,
            allNotifications: res.unreadNotifications
          })
        }
      })
    }
  }, [user.userSocket])
  let dispatch = useDispatch();
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const triggerNotify = ()=>{
    setNT(!notificationTrigger);
  }

  const handleMobileMenuOpen = event => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const read = () => {
    user.userSocket.emit('readNotifications', notifications.allNotifications);
    setNotifications({
      ...notifications,
      allNotifications: []
    })
    triggerNotify();
  }
  const logout = () =>{
    localStorage.clear();
    if(userAuth.userType === 'vendor')
      dispatch(closeSS());
    setAnchorEl(null);
    handleMobileMenuClose();
    window.location.replace('/');
  }
  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {/* <MenuItem onClick={handleMenuClose}>Profile</MenuItem> */}
      <MenuItem onClick={logout}>Logout</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      {/* <MenuItem>
        <IconButton aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="primary">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem> */}
      {userAuth.user && props.match.path === '/searchResult' ?
      <MenuItem onClick={triggerNotify}>
        <IconButton aria-label="" color="inherit">
          <Badge badgeContent={notifications.allNotifications.length} color="primary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      : 
      null
      }
      {/* <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem> */}
      <MenuItem onClick={logout} >
      <IconButton color="inherit">
          <Badge color="primary" overlap="circle" badgeContent=" " variant="dot">
            <ExitToAppRoundedIcon/>
          </Badge>
        </IconButton>
        <p>Logout</p>
      </MenuItem>
    </Menu>
  );

  return (
    <React.Fragment>
      <Modal open={notificationTrigger} basic size='fullscreen' style={{zIndex: '50', textAlign: 'center'}}>
    <Header icon='archive' content='NOTIFICATIONS' />
    <Modal.Content scrolling>
      {
        notifications.allNotifications.map((notif)=>{
          return notif.payload.map((noti,ind)=>{
            if(noti.status == undefined){
              return (
              <p key={ind} style={{border: '1px solid', margin: '10px 0px', padding: '10px', backgroundColor: `${noti.isApproved === true? '#2ecc40' : '#ff695e'}` }}>Your Booking of vehicle {noti.booking.vehicleNo} is {noti.isApproved ? 'Approved': 'Denied'} {noti.estimatedStartTime ? `and your Service will start at ${new Date(noti.estimatedStartTime).toLocaleTimeString()}` : null}</p>
              )
            
            }
            else
            return  <p key={ind} style={{border: '1px solid', margin: '10px 0px', padding: '10px', backgroundColor: '#2ecc40'}}>Your Booking of vehicle number {noti.booking.vehicleNo} is moved to {noti.status}</p>
              })
        })
      }
      {/* <p style={{border: '1px solid', margin: '10px 0px', padding: '10px'}}>
        Your inbox is getting full, would you like us to enable automatic
        archiving of old messages?
      </p> */}
    </Modal.Content>
    <Modal.Actions>
      {/* <Button  color='red' inverted>
        <Icon name='remove' /> No
      </Button> */}
      <Button onClick={read} color='green' inverted>
        <Icon name='checkmark' /> READ
      </Button>
    </Modal.Actions>
  </Modal>
    <div className={classes.grow}>
      <AppBar position="static" color="default">
        <Toolbar>
          {/* <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
          >
            <MenuIcon />
          </IconButton> */}
          <Typography className={classes.title} >
            <Link to="/">
            <img src={require('../../assets/logo.png.png')} alt="" className="logo"></img>
            </Link>
          </Typography>
          {/* <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div> */}
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            {/* <IconButton aria-label="show 4 new mails" color="inherit">
              <Badge badgeContent={4} color="primary">
                <MailIcon />
              </Badge>
            </IconButton> */}
            {userAuth.user && props.match.path === '/searchResult' ? 
            <IconButton 
            aria-label="show 17 new notifications" 
            className="removeOutline" 
            color="inherit"
            style={{border: 'none', outline:'none'}}
            onClick={triggerNotify}
            >
              <Badge badgeContent={notifications.allNotifications.length}  color="primary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            : null}
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
              style={{border: 'none', outline:'none'}}
            >
              {userAuth.admin ?
              <AccountCircle style={{fontSize: '45px'}} />: 
              null}
              {userAuth.user !== null ? 
              <img style={{backgroundSize: 'cover', width: '50px', height: '50px', borderRadius: '50%'}} 
              src={userAuth.user.photo[0] === "h" ?
              `${userAuth.user.photo}` : 
              `http://localhost:5000/users_photos/${userAuth.user.photo}`} 
              alt="No Image"/>:
              null
              }
              {userAuth.vendor !== null && vendor.ss !== null? 
              <img style={{backgroundSize: 'cover', width: '50px', height: '50px', borderRadius: '50%'}} 
              src={vendor.ss.photo[0] === "h" ?
              `${vendor.ss.photo}` : 
              `http://localhost:5000/servicestations_photos/${vendor.ss.photo}`} 
              alt="No Image"/>:
              null
              }
            </IconButton>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
    </React.Fragment>
  );
}

export default withRouter(Nav);