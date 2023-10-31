import MenuItem from './MenuItem';
import { Container, Grid } from '@mui/material';
import './App.css';

const App = () => {
  const menuItems = [
    { title: 'Coffee', price: 10.99, imgUrl: 'path/to/coffee/image.jpg'},
    { title: 'Pancake', price: 7.99, imgUrl: 'path/to/pancake/image.jpg' },
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
