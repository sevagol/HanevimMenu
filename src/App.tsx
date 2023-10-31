import MenuItem from './MenuItem';
import { Container, Grid } from '@mui/material';
import Cup from './assets/cofffee-cup.svg'
import Pancake from './assets/pancakes.svg'
import './App.css';

const App = () => {
  const menuItems = [
    { title: 'Coffee', price: 10.99, imgUrl: Cup},
    { title: 'Pancake', price: 7.99, imgUrl: Pancake },
    // ... другие позиции меню
  ];

  return (
    <Container>
      <Grid container spacing={3} className="grid-container">
        {menuItems.map((item, index) => (
          <Grid className="card" item xs={4} key={index}>
            <MenuItem {...item} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default App;
