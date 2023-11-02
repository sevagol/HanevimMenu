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

const options = [
    'Опция 1',
    'Опция 2',
    'Опция 3'
];


const OrdersList: React.FC<OrdersListProps> = ({ orders }) => {
    return (
        <div className="orders-container">
            <h2>Your Orders:</h2>
            <ul>
                {orders.map((order, index) => (
                    <li key={index}>
                        {order.title} x {order.count}
                        <select className="order-options">
                            {options.map((option, idx) => (
                                <option key={idx} value={option}>{option}</option>
                            ))}
                        </select>
                    </li>
                ))}
            </ul>
        </div>
    );
};


export default OrdersList;
