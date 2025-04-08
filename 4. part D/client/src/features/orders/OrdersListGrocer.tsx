import { useEffect, useState} from 'react';
import { Box, Typography, Divider, Button } from '@mui/material';
import { Status } from '../../models/enums/Status';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/API';
import { fetchOrdersBySupplier, UpdateStatusOrder } from './orders';
import './orderListGrocer.css';
import { useNavigate } from 'react-router-dom';

const OrdersListGrocer = () => {
    const orders = useSelector((state: RootState) => state.order?.ordersBySupplier || []);
    const supplier = useSelector((state: RootState) => state.supplier.supplier);
    const dispatch = useDispatch<AppDispatch>();
    const [flippedOrders, setFlippedOrders] = useState<{ [key: number]: boolean }>({});
    const navigate=useNavigate();

    useEffect(() => {
        if (supplier?.id) {
            dispatch(fetchOrdersBySupplier(supplier.id));
        }
    }, [dispatch, supplier?.id]);

    const handleApproveOrder = (orderId: number) => {
        dispatch(UpdateStatusOrder({ orderId, status: Status.IN_PROGRESS }));
    };

    const toggleFlip = (orderId: number) => {
        setFlippedOrders((prev) => ({ ...prev, [orderId]: !prev[orderId] }));
    };

    return (
        <>
            <Button variant="contained" color="warning" onClick={() => navigate('/')}>
                        Logout
                    </Button>
        <Box sx={{ padding: 2 }}>
            <Typography variant="h6" gutterBottom>
                Order List
            </Typography>

            {orders.length === 0 ? (
                <Typography variant="body1" sx={{ textAlign: 'center', color: 'gray', marginTop: 2 }}>
                    אין הזמנות בינתיים
                </Typography>
            ) : (
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
                                    {order.status === Status.PENDING && (
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
            )}
        </Box>
        </>
    );
};

export default OrdersListGrocer;
