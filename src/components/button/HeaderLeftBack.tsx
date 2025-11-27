import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const HeaderLeftBack = () => {
    const navigate = useNavigate();

    return (
        <button
        onClick = {()=>navigate("/youtube/home-list")}>
        <ArrowLeft size={20} />
        </button>
    );
};

export default HeaderLeftBack;