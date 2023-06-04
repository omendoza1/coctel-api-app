import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  CircularProgress,
  Container,
  Grid,
  Typography,
  Pagination
} from '@mui/material';
import 'react-lazy-load-image-component/src/effects/blur.css';

import ThinCard from './ThinCard';
import CustomAppBar from './CustomAppBar';

const CocktailList = () => {
  const [cocktails, setCocktails] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const itemsPerPage = 10;

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  const fetchData = async (page) => {
    try {
      setLoading(true);
      setError(null);
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
    } finally {
      setLoading(false);
    }
  };

  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
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
          ) : loading ? (
            <CircularProgress />
          ) : (
            <Typography>No hay cócteles disponibles</Typography>
          )}
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            marginTop={2}
          >
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={handleChangePage}
              color="primary"
              size="large"
              showFirstButton
              showLastButton
            />
          </Box>
        </Box>
      </Container>
    </React.Fragment>
  );
};

export default CocktailList;