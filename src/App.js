
import Cart from "./page/Cart";
import DetailProduct from "./page/DetailProduct";
import HomeProduct from "./page/HomeProduct"
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Order from "./page/Order";
import SignUp from "./page/SignUp";
import Login from "./page/Login";

function App() {
  return (
    <>
    <div>
        <BrowserRouter>
          <Routes>
          <Route path='/' element={<HomeProduct/>}></Route>
          <Route path='/detailProduct/:id' element={<DetailProduct/>}></Route>
          <Route path='/cart' element={<Cart/>}></Route>
          <Route path='/order' element={<Order/>}></Route>
          <Route path='/signUp' element={<SignUp/>}></Route>
          <Route path='/login' element={<Login/>}></Route>
          </Routes>
        </BrowserRouter>
    </div>
    </>
  );
}

export default App;
