import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import LayOut from "./components/layout/LayOut";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import ProductDetailsPage from './pages/ProductDetailsPage';
import CartPage from './pages/CartPage';
import Box from "@mui/material/Box";
import UserRegister from './components/user/UserRegister';
import UserLogin from './components/user/UserLogin';
import UserProfile from "./components/user/UserProfile";
import ProtectedRout from "./components/user/ProtectedRout";
import DashBord from "./components/dashboard/DashBord";
import CircularProgress from "@mui/material/CircularProgress";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  const url = "https://sda-3-online-backend-teamwork-1xdo.onrender.com/";
  const productUrl =
    "https://sda-3-online-backend-teamwork-1xdo.onrender.com/api/v1/products";
  const [respone, setResponse] = useState("");
  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cart, setCart] = useState([]);
  const [cartItemsCount, setCartItemsCount] = useState(0);

  function getData() {
    axios
      .get(productUrl)
      .then((response) => {
        setProductList(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }
  function getDatafromServer() {
    axios
      .get(url)
      .then((response) => {
        console.log(response.data);
        setResponse(response.data);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }
  
  useEffect(() => {
    getDatafromServer()
    getData()
    
  }, []);
   

  //user 
  const [userDate , setUserDate] = useState(null);
  const [isUserDataLoading , setIsUserDataLoading] = useState(true);
  function getUserDate(){
    const token = localStorage.getItem("token");
    axios
      .get(
        "https://sda-3-online-backend-teamwork-1xdo.onrender.com/api/v1/Users/auth",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        setUserDate(res.data);
        setIsUserDataLoading(false);
      })
      .catch((err) => {
        setIsUserDataLoading(false);
        console.log(err);
      });
  }
  useEffect(() => {
    getUserDate();
  }, []);
  let isAuthenticated = userDate ? true : false ;
  let shouldCheckAdmin = true;
  console.log(userDate,"from app");
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <LayOut
          cartItemsCount={cartItemsCount}
          isAuthenticated={isAuthenticated}
          shouldCheckAdmin={shouldCheckAdmin}
          userDate={userDate}
          cart={cart}
        />
      ),
      children: [
        {
          path: "/",
          element: (
            <HomePage
              productList={productList.slice(0, 8)}
              cart={cart}
              setCart={setCart}
            />
          ),
        },
        {
          path: "/products",
          element: (
            <ProductPage
              productList={productList}
              cart={cart}
              setCart={setCart}
            />
          ),
        },
        {
          path: "/products/:productId",
          element: <ProductDetailsPage cart={cart} setCart={setCart} />,
        },
        {
          path: "/cart",
          element: <CartPage cart={cart} setCart={setCart} />,
        },
        {
          path: "/register",
          element: <UserRegister />,
        },
        {
          path: "/login",
          element: <UserLogin getUserData={getUserDate} />,
        },
        {
          path: "/profile",
          element: (
            <ProtectedRout
              isUserDataLoading={isUserDataLoading}
              isAuthenticated={isAuthenticated}
              element={
                <UserProfile userDate={userDate} setUserDate={setUserDate} />
              }
            />
          ),
        },
        {
          path: "/dashboard",
          element: (
            <ProtectedRout
              isUserDataLoading={isUserDataLoading}
              isAuthenticated={isAuthenticated}
              shouldCheckAdmin={shouldCheckAdmin}
              userDate={userDate}
              element={<DashBord productList={productList} />}
            />
          ),
        },
        {
          path: "*",
          element: <NotFoundPage />,
        },
      ],
    },
  ]);
   if (loading === true)
     if (loading) {
       return (
         <Box
           sx={{
             display: "flex",
             justifyContent: "center",
             alignItems: "center",
             height: "100vh",
           }}
         >
           <CircularProgress size={200} color="#B17939" />
         </Box>
       );
     }

   if (error) {
     return (
       <div>
         <p>An error occurred</p>
       </div>
     );
   }
  return (
  <div>
   <RouterProvider router={router} />
  </div>
  );
}

export default App;
