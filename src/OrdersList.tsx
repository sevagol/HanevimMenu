import React from 'react';
import "./OrdersList.css";

type Order = {
    title: string;
    count: number;
};

interface OrdersListProps {
    orders: Order[];
}

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
