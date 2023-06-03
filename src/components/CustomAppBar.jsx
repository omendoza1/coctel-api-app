import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Avatar,
} from '@mui/material';
import { styled } from '@mui/system';
import MenuIcon from '@mui/icons-material/Menu';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { deepPurple } from '@mui/material/colors';

const CustomAppBar = () => {
  const StyledAppBar = styled(AppBar)`
    background-color: ${deepPurple[500]};
  `;

  const StyledIconButton = styled(IconButton)`
    color: #fff;
  `;

  const StyledAvatar = styled(Avatar)`
    background-color: ${deepPurple[500]};
    margin-left: auto;
  `;

  return (
    <StyledAppBar position="static">
      <Toolbar>
        <StyledIconButton edge="start" color="inherit" aria-label="menu">
          <MenuIcon />
        </StyledIconButton>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Lista de cócteles
        </Typography>
        <StyledAvatar>
          <FavoriteIcon />
        </StyledAvatar>
      </Toolbar>
    </StyledAppBar>
  );
};

export default CustomAppBar;