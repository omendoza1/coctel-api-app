import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  Typography
} from '@mui/material';
import 'react-lazy-load-image-component/src/effects/blur.css';

import ThinCard from './ThinCard';
import CustomAppBar from './CustomAppBar';

const CocktailList = () => {
  const [cocktails, setCocktails] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState(null);
  const itemsPerPage = 10;

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  const fetchData = async (page) => {
    try {
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
    } catch (error) {
      setError(error.message);
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
      <CustomAppBar />
      <Container maxWidth="md">
        <Box
          sx={{
            backgroundColor: 'background.default',
            minHeight: '100vh',
            py: 3,
          }}
        >
          {error ? (
            <div>Error: {error}</div>
          ) : cocktails.length > 0 ? (
            <Grid container spacing={2} justifyContent="center">
              {cocktails.map((cocktail) => (
                <Grid item xs={12} sm={6} md={4} key={cocktail.idDrink}>
                  <ThinCard cocktail={cocktail} />
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