
import MenuItem from './MenuItem';
import { Container, Grid, CssBaseline } from '@mui/material';

const App = () => {
  const menuItems = [
    { title: 'Coffee', price: 10.99, imgUrl: 'path/to/your/coffee/image.jpg' },
    { title: 'Pancake', price: 7.99, imgUrl: 'path/to/your/pancake/image.jpg' },
    // ... другие позиции меню
  ];

  return (
    <>
      <CssBaseline />
      <Container>
        <Grid container spacing={3} alignItems="stretch">
          {menuItems.map((item, index) => (
            <Grid item xs={12} sm={3} key={index}>
              <MenuItem {...item} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default App;
