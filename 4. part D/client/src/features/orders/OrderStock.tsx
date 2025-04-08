import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../store/API";
import { Stock } from "../../models/Stock";
import { Status } from "../../models/enums/Status";
import { Button, Input, Modal, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { fetchAllStocks } from "../stocks/stocks";
import { Order } from "../../models/Order";
import { OrderNewStock } from "./orders";

const OrderStock: React.FC = () => {
    const stocks = useSelector((state: RootState) => state.stock.stocks);
    const grocer = useSelector((state: RootState) => state.grocer.grocer);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(fetchAllStocks());
    }, [dispatch]);

    const [selectedStock, setSelectedStock] = useState<Stock>();
    const [quantity, setQuantity] = useState<number>(0);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleSelectStock = (stock: Stock) => {
        setSelectedStock(stock);
        setIsModalOpen(true);
    };

    const handleSubmitOrder = async () => {
        if (!selectedStock || quantity < selectedStock.minimumPurchase) {
            alert("You must enter a valid quantity according to the minimum quantity");
            return;
        }
        const data = {
            grocer: grocer,
            supplier: selectedStock.supplier,
            status: Status.PENDING,
            quantity: quantity,
            stock: selectedStock,
        } as Order;
        console.log(data);
        await dispatch(OrderNewStock(data));

        setIsModalOpen(false);
        setQuantity(0);
    };

    return (
        <div>
            <h2>Select stock to order</h2>
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                {stocks.map((stock) => (
                    <Button key={stock.id} onClick={() => handleSelectStock(stock)}>
                        {stock.name} - {stock.price}$
                    </Button>
                ))}
            </div>

            <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <div
                    style={{
                        padding: "20px",
                        background: "white",
                        borderRadius: "10px",
                        marginTop: "33vh",
                        width: "27vw",
                        marginLeft: "34vw",
                        position: "relative",
                    }}
                    tabIndex={0}
                >
                    <IconButton
                        onClick={() => setIsModalOpen(false)}
                        style={{
                            position: "absolute",
                            top: 10,
                            right: 10,
                        }}
                    >
                        <CloseIcon />
                    </IconButton>

                    <p>{selectedStock?.name}</p>
                    <p>price: {selectedStock?.price}$</p>
                    <p>minimum order: {selectedStock?.minimumPurchase}</p>
                    <p>supplier: {selectedStock?.supplier.name}</p>
                    <Input
                        type="number"
                        value={quantity}
                        onChange={(e) => setQuantity(Number(e.target.value))}
                        inputProps={{ min: selectedStock?.minimumPurchase || 0 }}
                    />
                    <Button onClick={handleSubmitOrder}>submit</Button>
                </div>
            </Modal>
        </div>
    );
};

export default OrderStock;
