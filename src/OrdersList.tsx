import React from 'react';
import "./OrdersList.css";
import WebApp from '@twa-dev/sdk';

type Order = {
    title: string;
    count: number;
};

interface OrdersListProps {
    orders: Order[];
}

const backbutton = WebApp.BackButton;
backbutton.show();
backbutton.onClick(() => {
    window.history.back();
});

const OrdersList: React.FC<OrdersListProps> = ({ orders }) => {
    return (
        <div className="orders-container">
            <h2>Your Orders:</h2>
            <ul>
                {orders.map((order, index) => (
                    <li key={index}>
                        {order.title} x {order.count}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default OrdersList;
