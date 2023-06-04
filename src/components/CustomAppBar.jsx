import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Avatar,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@mui/material';
import { styled } from '@mui/system';
import MenuIcon from '@mui/icons-material/Menu';
import FavoriteIcon from '@mui/icons-material/Favorite';
import InboxIcon from '@mui/icons-material/Inbox';
import MailIcon from '@mui/icons-material/Mail';
import { deepPurple } from '@mui/material/colors';

const CustomAppBar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  const StyledAppBar = styled(AppBar)`
    background-color: ${deepPurple[500]};
  `;

  const StyledIconButton = styled(IconButton)`
    color: #fff;
  `;

  const StyledAvatar = styled(Avatar)`
    background-color: ${deepPurple[500]};
    margin-left: 8px;
  `;

  const handleMenuClick = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleFavoriteClick = () => {
    setDialogOpen(!dialogOpen);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const menuItems = [
    { text: 'Inbox', icon: <InboxIcon /> },
    { text: 'Starred', icon: <FavoriteIcon /> },
    { text: 'Send email', icon: <MailIcon /> },
  ];

  const drawerItems = (
    <List>
      {menuItems.map((item, index) => (
        <ListItem button key={index}>
          <ListItemIcon>{item.icon}</ListItemIcon>
          <ListItemText primary={item.text} />
        </ListItem>
      ))}
    </List>
  );

  return (
    <>
      <StyledAppBar position="static">
        <Toolbar>
          <StyledIconButton edge="start" color="inherit" aria-label="menu" onClick={handleMenuClick}>
            <MenuIcon />
          </StyledIconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Lista de cócteles
          </Typography>
          <StyledIconButton edge="end" color="inherit" aria-label="favorite" onClick={handleFavoriteClick}>
            <FavoriteIcon />
          </StyledIconButton>
          <StyledAvatar />
        </Toolbar>
      </StyledAppBar>
      <Drawer anchor="left" open={drawerOpen} onClose={handleMenuClick}>
        {drawerItems}
      </Drawer>
      <Dialog open={dialogOpen} onClose={handleCloseDialog}>
        <DialogContent>
          <DialogContentText>
          API utilizada: https://www.thecocktaildb.com/.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cerrar</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CustomAppBar;