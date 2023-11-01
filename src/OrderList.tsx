import { FC } from 'react';

interface OrdersListProps {
    orders: Array<{ title: string; count: number; }>
}

const OrdersList: FC<OrdersListProps> = ({ orders }) => {
    return (
        <div>
            <h1>Your Orders</h1>
            <ul>
                {orders.map((order, index) => (
                    <li key={index}>{order.title} x {order.count}</li>
                ))}
            </ul>
        </div>
    );
};

export default OrdersList;
