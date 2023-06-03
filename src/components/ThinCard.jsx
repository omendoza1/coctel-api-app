import React from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material';
import { styled } from '@mui/system';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { deepPurple } from '@mui/material/colors';

const ThinCard = ({ cocktail }) => {
  const StyledCard = styled(Card)`
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

  if (!cocktail) {
    return null;
  }

  return (
    <StyledCard>
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
    </StyledCard>
  );
};

ThinCard.propTypes = {
  cocktail: PropTypes.shape({
    idDrink: PropTypes.string.isRequired,
    strDrink: PropTypes.string.isRequired,
    strDrinkThumb: PropTypes.string,
  }),
};

export default ThinCard;