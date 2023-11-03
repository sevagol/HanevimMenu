import React, { useState } from 'react';
import "./OrdersList.css";
import Milk from './assets/milk.svg';
import { Button, Menu, MenuItem } from '@mui/material';

type Order = {
    title: string;
    count: number;
    price: number;
    options?: string[];
};

interface OrdersListProps {
    orders: Order[];
}

const OrdersList: React.FC<OrdersListProps> = ({ orders }) => {
    const total = orders.reduce((acc, order) => acc + (order.count * order.price), 0);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>, index: number) => {
        setAnchorEl(event.currentTarget);
        setSelectedIndex(index);
    };

    const handleClose = () => {
        setAnchorEl(null);
        setSelectedIndex(null);
    };

    return (
        <div className="orders-container">
            <h2>Your Orders:</h2>
            <ul>
                {orders.map((order, index) => (
                    <li key={index}>
                        {order.title} x {order.count} - ₪{order.price.toFixed(2)}
                        {order.options && (
                            <>
                                <Button className='svg-button' onClick={(e) => handleClick(e, index)}>
                                    <img src={Milk} alt="Options" />
                                </Button>
                                <Menu
                                    anchorEl={anchorEl}
                                    open={selectedIndex === index && Boolean(anchorEl)}
                                    onClose={handleClose}
                                >
                                    {order.options.map((option, idx) => (
                                        <MenuItem key={idx} onClick={handleClose}>
                                            {option}
                                        </MenuItem>
                                    ))}
                                </Menu>
                            </>
                        )}
                    </li>
                ))}
            </ul>
            <div className="total-price">Total: ${total.toFixed(2)}</div>
        </div>
    );
};

export default OrdersList;
