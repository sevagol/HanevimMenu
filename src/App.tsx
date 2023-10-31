import Cup from './assets/cofffee-cup.svg';
import Pancake from './assets/pancakes.svg';
import MenuItem from './MenuItem';
import { Container, Grid, useTheme, useMediaQuery } from '@mui/material';

const App = () => {

  const menuItems = [
    { title: 'Coffee', price: 10.99, imgUrl: Cup},
    { title: 'Pancake', price: 7.99, imgUrl: Pancake },
    // ... другие позиции меню
  ];

  return (
    <Container>
      <Grid container spacing={3}>
        {menuItems.map((item, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <MenuItem {...item} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default App;
