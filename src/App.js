
import Cart from "./page/Cart";
import DetailProduct from "./page/DetailProduct";
import HomeProduct from "./page/HomeProduct"
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
    <div>
        <BrowserRouter>
          <Routes>
          <Route path='/' element={<HomeProduct/>}></Route>
          <Route path='/detailProduct/:id' element={<DetailProduct/>}></Route>
          <Route path='/cart' element={<Cart/>}></Route>
          </Routes>
        </BrowserRouter>
    </div>
    </>
  );
}

export default App;
