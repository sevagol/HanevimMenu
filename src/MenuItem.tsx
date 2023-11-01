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

    const handleAddClick = () => setIsAdding(true);
    const handleIncrease = () => setCount(count + 1);
    const handleDecrease = () => setCount(count > 0 ? count - 1 : 0);

    return (
        <Card sx={{
            position: 'relative',
            width: '30%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor: 'transparent',
            boxShadow: 'none',
            overflow: 'visible'
        }}>
            <Typography variant="h6" color="white" sx={{
                position: 'absolute',
                top: '5%',
                right: '5%',
                backgroundColor: 'rgba(0,0,0,0.5)',
                borderRadius: '50%',
                padding: '0.5em',
                display: isAdding ? 'flex' : 'none'
            }}>
                {count}
            </Typography>
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
                p:1
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
                        <Grid item sx={{ display: 'none' }}> {/* Скрываем счетчик в этом месте */}
                            <Typography variant="h6" color="white">{count}</Typography>
                        </Grid>
                        <Grid item>
                            <IconButton size="small" color="primary" onClick={handleIncrease}>
                                <AddCircleOutlineIcon fontSize="small" />
                            </IconButton>
                        </Grid>
                    </Grid>
                )}
            </CardContent>
        </Card>
    );
};

export default MenuItem;
