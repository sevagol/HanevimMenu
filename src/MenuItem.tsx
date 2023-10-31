import React, { FC, useState } from 'react';
import { Card, CardContent, CardMedia, Typography, Button, Grid, IconButton } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

interface ItemProps {
  title: string;
  price: number;
  imgUrl: string;
}

const MenuItem: FC<ItemProps> = ({ title, price, imgUrl }) => {
  const [count, setCount] = useState(0);
  const [isAdding, setIsAdding] = useState(false);

  const handleAddClick = () => setIsAdding(true);
  const handleIncrease = () => setCount(count + 1);
  const handleDecrease = () => setCount(count > 0 ? count - 1 : 0);

  return (
    <Card sx={{ width: 200, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <CardMedia
        component="img"
        height="140"
        image={imgUrl}
        alt={title}
      />
      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography gutterBottom variant="h6" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          ${price.toFixed(2)}
        </Typography>
        {!isAdding ? (
          <Button variant="contained" onClick={handleAddClick}>Add</Button>
        ) : (
          <Grid container spacing={1} alignItems="center" justifyContent="center">
            <Grid item>
              <IconButton color="primary" onClick={handleDecrease}>
                <RemoveCircleOutlineIcon />
              </IconButton>
            </Grid>
            <Grid item>
              <Typography variant="h6">{count}</Typography>
            </Grid>
            <Grid item>
              <IconButton color="primary" onClick={handleIncrease}>
                <AddCircleOutlineIcon />
              </IconButton>
            </Grid>
          </Grid>
        )}
      </CardContent>
    </Card>
  );
};

export default MenuItem;
