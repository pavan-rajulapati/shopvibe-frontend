import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { checkTokenExpiration } from "./token"; 

const ProtectedRoutes = ({ children }) => {
    const navigate = useNavigate();
    const [isChecking, setIsChecking] = useState(true);

    useEffect(() => {
        const isTokenValid = checkTokenExpiration();
        if (!isTokenValid) {
            navigate("/signin"); 
        }
        setIsChecking(false); 
    }, [navigate]); 

    if (isChecking) return null; 

    return children;
};

export default ProtectedRoutes;
