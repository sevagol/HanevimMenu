import { FC, useState } from 'react';
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

    const handleAddClick = () => {
        setIsAdding(true);
        setCount(1);
    };
    const handleIncrease = () => setCount(count + 1);
    const handleDecrease = () => {
        if (count === 1) {
            setIsAdding(false);
            setCount(0);
        } else {
            setCount(count - 1);
        }
    };

    return (
        <Card sx={{
            width: '30%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor: 'transparent',
            boxShadow: 'none',
            overflow: 'visible'
        }}>
            <CardMedia
                component="img"
                sx={{ width: '80%', borderRadius: '4px' }}
                image={imgUrl}
                alt={title}
            />
            <CardContent sx={{
                flexGrow: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                backgroundColor: 'transparent',
                boxShadow: 'none',
                p: 1
            }}>
                <Typography gutterBottom variant="h6" component="div" sx={{ color: 'white' }}>
                    {title}
                </Typography>
                <Typography variant="body2" color="white">
                    ${price.toFixed(2)}
                </Typography>
                {!isAdding ? (
                    <Button variant="contained" onClick={handleAddClick} sx={{ mt: 2 }}>Add</Button>
                ) : (
                    <Grid container spacing={1} alignItems="center" justifyContent="center" sx={{ mt: 2 }}>
                        <Grid item>
                            <IconButton size="small" color="primary" onClick={handleDecrease}>
                                <RemoveCircleOutlineIcon fontSize="small" />
                            </IconButton>
                        </Grid>
                        {count > 0 && (
                            <Grid item>
                                <Typography variant="h6" color="white">{count}</Typography>
                            </Grid>
                        )}
                        <Grid item>
                            <IconButton size="small" color="primary" onClick={handleIncrease}>
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
