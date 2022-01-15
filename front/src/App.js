import {
    Routes,
    Route,
    useNavigate,
    Navigate
} from "react-router-dom";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import Main from "./Components/Main/Main";
import {useEffect, useState} from "react";
import axios from "axios";

function App() {
    const [isConnected, setIsConnected] = useState(false);
    let navigate = useNavigate();

    useEffect(() => {
        (async () => {
            const response = await axios.get(`${process.env.REACT_APP_DASHBOARD_API}/auth`,
                {'headers': {'Authorization': `Bearer  ${localStorage.getItem('JWT')}`}})

            if (response.status === 401) {
                setIsConnected(false);
            } else {
                setIsConnected(true);
                navigate('/App');
            }
        })()
    }, [navigate])

    return (
        <Routes>
            <Route path="/" element={<Login/>}/>
            <Route path="/Login" element={<Login/>}/>
            <Route path="/Register" element={<Register/>}/>
            <Route path="/App" element={!isConnected ? <Navigate to={"/Login"}/> : <Main/>}/>
        </Routes>
    );
}

export default App;
