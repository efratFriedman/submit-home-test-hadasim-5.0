import { Route, Routes } from "react-router-dom";
import SignUp from "../features/suppliers/SignUp";
import Login from "../features/Login";
import OrderList from "../features/orders/OrderList";
import OrderListExist from "../features/orders/OrderListExist";
import OrderStock from "../features/orders/OrderStock";
import HomePage from "../features/HomePage";
import HomePageGrocer from "../features/grocer/HomePageGrocer";
import OrdersListGrocer from "../features/orders/OrdersListGrocer";


const Routing: React.FC = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<HomePage />}></Route>
                <Route path="/HomePageGrocer" element={<HomePageGrocer />}></Route>
                <Route path="/SignUp" element={<SignUp />}></Route>
                <Route path="/Login" element={<Login />}></Route>
                <Route path="/OrderList" element={<OrderList />}></Route>
                <Route path="/OrderListExist" element={<OrderListExist />}></Route>
                <Route path="/OrdersListGrocer" element={<OrdersListGrocer />}></Route>
                <Route path="/OrderStock" element={<OrderStock />}></Route>
            </Routes>
        </>
    );
};

export default Routing;
