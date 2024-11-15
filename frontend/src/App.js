import React, { useEffect} from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter as Router, Route, Routes, Link} from 'react-router-dom';
import ProductList from './Product/ProductList';
import ProductCreation from './Product/ProductCreation';
import ProductDetail from './Product/ProductDetail';
import Login from './Register/Login';
import Register from './Register/Register.jsx';
import Protectedroute from './Component/route/Protectedroute';
import { useDispatch } from 'react-redux';
import { loginUser } from './Component/Redux/actions';
import Logout from './Register/Logout';
import EditProduct from './Product/ProductEdit';
 

function App() {

    const dispatch = useDispatch();

    useEffect(() => {
        const token = localStorage.getItem('authToken');  // Retrieve token from localStorage
        if (token) {
            console.log(token)
            // Optionally, you could fetch user details if needed (e.g., from an API)
            dispatch(loginUser({ token }));
        }
    }, [dispatch]);
    return (
        <Router>
            <div>
                <nav>
                    <>
                        <Link to="/home" style={{ margin: '10px' }}>Home</Link>
                        <Link to="/create" style={{ margin: '10px' }}>Create Car</Link>
                        <Link to="/logout" style={{ margin: '10px' }}><Protectedroute>Logout</Protectedroute></Link>
                    </>

                </nav>
            </div>
            <HelmetProvider>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/home" element={<Protectedroute><ProductList /></Protectedroute>} />
                    <Route path="/create" element={<Protectedroute><ProductCreation /></Protectedroute>} />
                    <Route path="/edit/:id" element={<Protectedroute><EditProduct/></Protectedroute>} />
                    <Route path="/product/:id" element={<Protectedroute><ProductDetail /></Protectedroute>} />
                    <Route path="/logout" element={<Protectedroute><Logout /></Protectedroute>} />

                </Routes>
            </HelmetProvider>

        </Router>
    );
}

export default App;
