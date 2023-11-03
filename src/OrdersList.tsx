import React from 'react';
import "./OrdersList.css";
import WebApp from '@twa-dev/sdk';

type Order = {
    title: string;
    count: number;
    price: number;
    options?: string[];
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

    // Рассчитываем итоговую сумму
    const total = orders.reduce((acc, order) => acc + (order.count * order.price), 0);
    
    return (
        <div className="orders-container">
            <h2>Your Orders:</h2>
            <ul>
                {orders.map((order, index) => (
                    <li key={index}>
                        {order.title} x {order.count} - ${order.price.toFixed(2)}
                        {order.options && (  // Если у заказа есть опции, отображаем select
                            <select className="order-options">
                                {order.options.map((option, idx) => (
                                    <option key={idx} value={option}>{option}</option>
                                ))}
                            </select>
                        )}
                    </li>
                ))}
            </ul>
            <div className="total-price">Total: ${total.toFixed(2)}</div>
        </div>
    );
};




export default OrdersList;
