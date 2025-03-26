export const storeToken = (token) => {
    if (!token) return;

    const decodedToken = JSON.parse(atob(token.split(".")[1])); 
    const expirationTime = decodedToken.exp * 1000; 

    localStorage.setItem("authToken", token);
    localStorage.setItem("tokenExpiry", expirationTime);

    console.log("Token stored, expires at:", new Date(expirationTime));
};

export const checkTokenExpiration = () => {
    const token = localStorage.getItem("authToken");
    const tokenExpiry = localStorage.getItem("tokenExpiry");

    if (!token || !tokenExpiry) {
        console.log("No token found, redirecting to login...");
        return false;
    }

    const now = Date.now();
    
    if (now >= tokenExpiry) {
        console.log("Token expired, removing from localStorage...");
        localStorage.removeItem("authToken");
        localStorage.removeItem("tokenExpiry");
        return false;
    }

    console.log("Token is still valid");
    return true;
};
