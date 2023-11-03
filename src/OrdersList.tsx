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
    const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
    
    return (
        <div className="orders-container">
            <h2>Your Orders:</h2>
            <ul>
                {orders.map((order, index) => (
                    <li key={index}>
                        {order.title} x {order.count} - ${order.price.toFixed(2)}
                        {order.options && (
                            <>
                                <button className="svg-button" onClick={() => setSelectedOptions(selectedOptions => {
                                    const newArray = [...selectedOptions];
                                    newArray[index] = newArray[index] ? '' : (order.options ? order.options[0] : '');
                                    return newArray;
                                })}>
                                    <img src={Milk} alt="Options" />
                                </button>
                                {selectedOptions[index] && (
                                    <select 
                                        className="order-options" 
                                        value={selectedOptions[index] || ''} 
                                        onChange={(e) => {
                                            const newSelectedOptions = [...selectedOptions];
                                            newSelectedOptions[index] = e.target.value;
                                            setSelectedOptions(newSelectedOptions);
                                        }}
                                    >
                                        {order.options.map((option, idx) => (
                                            <option key={idx} value={option}>{option}</option>
                                        ))}
                                    </select>
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
