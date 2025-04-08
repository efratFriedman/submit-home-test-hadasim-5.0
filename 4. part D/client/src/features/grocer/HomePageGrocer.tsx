import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../../store/API";
import { signOut } from "./grocer";

function HomePageGrocer() {
    const navigate = useNavigate();
const dispatch=useDispatch<AppDispatch>();
    return (
        <div style={{ display: "flex", gap: "10px", justifyContent: "center", marginTop: "20px" }}>
            <Button variant="contained" color="primary" onClick={() => navigate("/OrderList")}>
                View all orders
            </Button>
            <Button variant="contained" color="secondary" onClick={() => navigate("/OrderListExist")}>
                Open orders
            </Button>
            <Button variant="contained" color="success" onClick={() => navigate("/OrderStock")}>
                Order new stock
            </Button>
            <Button variant="contained" color="warning" onClick={async() => {
                await dispatch(signOut());
                navigate("/")}}>
                Logout
            </Button>

        </div>
    );
}

export default HomePageGrocer;
