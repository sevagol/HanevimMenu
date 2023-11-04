import { FC, useState } from 'react';
import { Card, CardContent, CardMedia, Typography, Button, Grid, IconButton, Box } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

interface ItemProps {
    title: string;
    price: number;
    imgUrl: string;
    onAddChange: (title: string, isAdded: boolean, count: number) => void; // Обновлено для передачи количества
    orders: { title: string, count: number }[]; // Новое свойство
}


const MenuItem: FC<ItemProps> = ({ orders, title, price, imgUrl, onAddChange }) => {
    const currentOrder = orders.find(order => order.title === title);
    const initialCount = currentOrder ? currentOrder.count : 0;

    const [count, setCount] = useState(initialCount);
    const [isAdding, setIsAdding] = useState(initialCount > 0);


    const handleAddClick = () => {
        setIsAdding(true);
        setCount(1);
        onAddChange(title, true, 1);
    };

    const handleIncrease = () => {
        const newCount = count + 1;
        setCount(newCount);
        onAddChange(title, true, newCount);
    };
    const handleDecrease = () => {
        if (count === 1) {
            setIsAdding(false);
            setCount(0);
            onAddChange(title, false, 0); // Измените здесь на false
        } else {
            const newCount = count - 1;
            setCount(newCount);
            onAddChange(title, false, newCount); // И измените здесь на false
        }
    };
    


    return (
        <Card sx={{
            position: 'relative',
            width: '100%',       // Установите ширину на 100% контейнера
            height: 400,         // Установите фиксированную высоту для всех карточек, например, 400px
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor: 'transparent',
            boxShadow: 'none',
            overflow: 'visible'
        }}>

            {count > 0 && (
                <Box sx={{ position: 'absolute', top: 0, right: 0, mt: 1, mr: 1 }}>
                    <Typography variant="h6" color="white">{count}</Typography>
                </Box>
            )}
            <CardMedia
                component="img"
                sx={{
                    width: '100%', // Задайте ширину на 100% контейнера
                    height: 200,   // Установите фиксированную высоту, например, 200px
                    objectFit: 'contain', // Указывает, как содержимое должно масштабироваться внутри контейнера
                    borderRadius: '4px',
                    fontSize: '1rem',
                }}
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
                p: 1,
                mt: -1,
            }}>
                <Typography gutterBottom variant="h6" component="div" sx={{ color: 'white', fontSize: '1rem' }}>
                    {title}
                </Typography>
                <Typography variant="body2" color="white">
                    ₪{price.toFixed(2)}
                </Typography>
                {!isAdding ? (
                    <Button variant="contained" onClick={handleAddClick} sx={{ mt: 2 }}>Add</Button>
                ) : (
                    <Grid container spacing={1} alignItems="center" justifyContent="center" sx={{ mt: 2 }}>
                        <Grid item>
                            <IconButton size="small" onClick={handleDecrease}
                                sx={{
                                    backgroundColor: 'orange',
                                    borderRadius: '4px',
                                    '&:hover': { backgroundColor: 'darkorange' }
                                }}>
                                <RemoveIcon style={{ color: 'white' }} />
                            </IconButton>
                        </Grid>
                        <Grid item>
                            <IconButton size="small" onClick={handleIncrease}
                                sx={{
                                    backgroundColor: 'green',
                                    borderRadius: '4px',
                                    '&:hover': { backgroundColor: 'darkgreen' }
                                }}>
                                <AddIcon style={{ color: 'white' }} />
                            </IconButton>
                        </Grid>
                    </Grid>

                )}
            </CardContent>
        </Card>
    );
};

export default MenuItem;

