import React from 'react';
import "./OrdersList.css";
import Milk from './assets/milk.svg';
import {useState } from 'react';

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
    const [expandedOrderIndex, setExpandedOrderIndex] = useState<number | null>(null);
    
    return (
        <div className="orders-container">
            <h2>Your Orders:</h2>
            <ul>
                {orders.map((order, index) => (
                    <li key={index}>
                        {order.title} x {order.count} - ${order.price.toFixed(2)}
                        {order.options && (  // Если у заказа есть опции, отображаем SVG кнопку
                            <>
                                <button className="svg-button" onClick={() => setExpandedOrderIndex(expandedOrderIndex === index ? null : index)}>
                                    <img src={Milk} alt="Options" />
                                </button>
                                {expandedOrderIndex === index && (
                                    <ul className="order-options">
                                        {order.options.map((option, idx) => (
                                            <li key={idx}>{option}</li>
                                        ))}
                                    </ul>
                                )}
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
