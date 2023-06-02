import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Typography,
  Container,
  Grid,
  AppBar,
  Toolbar,
  IconButton,
  Avatar,
} from '@mui/material';
import { styled } from '@mui/system';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import MenuIcon from '@mui/icons-material/Menu';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { deepPurple } from '@mui/material/colors';

const ThinCard = styled(Card)`
  background-color: rgba(255, 255, 255, 0.9);
  &:hover {
    transform: translateY(-8px);
    transition: 0.3s;
  }
`;

const CocktailTitle = styled(Typography)`
  font-weight: bold;
  color: ${deepPurple[500]};
`;

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

const CocktailList = () => {
  const [cocktails, setCocktails] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  const fetchData = async (page) => {
    const response = await axios.get('https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocktail');

    if (response.data.drinks) {
      const startIndex = (page - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      const totalItems = response.data.drinks.length;

      setCocktails(response.data.drinks.slice(startIndex, endIndex));
      setTotalPages(Math.ceil(totalItems / itemsPerPage));
    } else {
      setCocktails([]);
      setTotalPages(1);
    }
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  return (
    <React.Fragment>
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
      <Container maxWidth="md">
        <Box
          sx={{
            backgroundColor: 'background.default',
            minHeight: '100vh',
            py: 3,
          }}
        >
          {cocktails.length > 0 ? (
            <Grid container spacing={2} justifyContent="center">
              {cocktails.map((cocktail) => (
                <Grid item xs={12} sm={6} md={4} key={cocktail.idDrink}>
                  <ThinCard>
                    <CardMedia
                      component={() => (
                        <LazyLoadImage
                          alt={cocktail.strDrink}
                          effect="blur"
                          height={140}
                          src={
                            cocktail.strDrinkThumb ||
                            'https://via.placeholder.com/150'
                          }
                          width="100%"
                          wrapperClassName="image-wrapper"
                        />
                      )}
                      sx={{ height: 140 }}
                    />
                    <CardContent>
                      <CocktailTitle variant="h6">
                        {cocktail.strDrink}
                      </CocktailTitle>
                    </CardContent>
                  </ThinCard>
                </Grid>
              ))}
            </Grid>
          ) : (
            <CircularProgress />
          )}
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            marginTop={2}
          >
            <Button
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              variant="contained"
            >
              Anterior
            </Button>
            <Typography mx={1}>
              Página {currentPage} de {totalPages}
            </Typography>
            <Button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              variant="contained"
            >
              Siguiente
            </Button>
          </Box>
        </Box>
      </Container>
    </React.Fragment>
  );
};

export default CocktailList;