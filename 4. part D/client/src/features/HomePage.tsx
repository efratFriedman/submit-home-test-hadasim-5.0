import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../store/API";
import { useDispatch } from "react-redux";
import { setIsGrocer, signOut } from "./grocer/grocer";

function HomePage() {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    return (
        <div style={{ display: "flex", gap: "10px", justifyContent: "center", marginTop: "20px" }}>
            <Button variant="contained" color="primary" onClick={
                async () => {
                    await dispatch(setIsGrocer());
                    navigate("/Login")
                }}>
                Grocer      </Button>
            <Button variant="contained" color="secondary" onClick={
                async () => {
                    await dispatch(signOut());
                    navigate("/Login")
                }}>
                Supplier
            </Button>

        </div>
    );
}

export default HomePage;
