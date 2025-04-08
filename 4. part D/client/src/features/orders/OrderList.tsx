import { useEffect, useState } from 'react';
import { Box, Typography, Divider, Button } from '@mui/material';
import { Status } from '../../models/enums/Status';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/API';
import { fetchAllOrders, UpdateStatusOrder } from './orders';
import './orderListGrocer.css';

const OrderList = () => {
    const orders = useSelector((state: RootState) => state.order.orders);
    const dispatch = useDispatch<AppDispatch>();
    const [flippedOrders, setFlippedOrders] = useState<{ [key: number]: boolean }>({});

    useEffect(() => {
        dispatch(fetchAllOrders());
    }, [dispatch]);

    const handleApproveOrder = (orderId: number) => {
        dispatch(UpdateStatusOrder({ orderId, status: Status.COMPLETED }));
    };

    const toggleFlip = (orderId: number) => {
        setFlippedOrders((prev) => ({ ...prev, [orderId]: !prev[orderId] }));
    };

    return (
        <Box sx={{ padding: 2 }}>
            {orders.length > 0 ? (
                <>
                    <Typography variant="h6" gutterBottom>
                        Order List
                    </Typography>
                    <div className="order-list-container">
                        {orders.map((order) => (
                            <div
                                key={order.id}
                                className={`order-card ${flippedOrders[order.id!] ? 'flipped' : ''}`}
                                onClick={() => toggleFlip(order.id!)}
                            >
                                <div className="order-card-inner">
                                    <div className={`order-card-front order-${Status[order.status].toLowerCase()}`}>
                                        <Typography variant="body1">
                                            Status: {Status[order.status]}
                                        </Typography>
                                        <Typography variant="body2">
                                            Quantity: {order.quantity}
                                        </Typography>
                                        <Typography variant="body2">
                                            Stock: {order.stock.name}
                                        </Typography>
                                        <Divider sx={{ marginTop: 2 }} />
                                    </div>
                                    <div className="order-card-back">
                                        {order.status === Status.IN_PROGRESS && (
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleApproveOrder(order.id!);
                                                }}
                                            >
                                                Approve Order
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            ) : (
                <h1>Not orders yet</h1>
            )}
        </Box>
    );
};

export default OrderList;
