import React from 'react';
import "./OrdersList.css";
import Milk from './assets/milk.svg';

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
    
    return (
        <div className="orders-container">
            <h2>Your Orders:</h2>
            <ul>
                {orders.map((order, index) => (
                    <li key={index}>
                        {order.title} x {order.count} - ${order.price.toFixed(2)}
                        {order.options && (  // Если у заказа есть опции, отображаем SVG кнопку
                            <button className="svg-button" onClick={() => console.log('Options for', order.title)}>
                                <img src={Milk} alt="Options" />
                            </button>
                        )}
                    </li>
                ))}
            </ul>
            <div className="total-price">Total: ${total.toFixed(2)}</div>
        </div>
    );
};





export default OrdersList;
