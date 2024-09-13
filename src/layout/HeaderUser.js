import '../css/headerHome.css'
import { FaSearch } from "react-icons/fa";
import { LuPhoneCall } from "react-icons/lu";
import { RxAvatar } from "react-icons/rx";
import { BsCart3 } from "react-icons/bs";
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';


export default function HeaderUser() {
  const [user, setUser] = useState({});
  const [cart, setCart] = useState([]);
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    const checkAndSet = async () => {
      await checkAccount();
      setIsChecked(true)
    }
    checkAndSet();
  }, []);

  useEffect(() => {
    if (isChecked) {
      getCartById();
    }
  }, [isChecked]);

  async function checkAccount() {
    const response = await axios.get("http://localhost:8080/api/account/check");
    setUser(response.data);
    
  }

  // async function logout() {
  //   const response = await axios.get("http://localhost:8080/api/account/logout");

  // }


  async function getCartById() {
    if (user.id !== 0 ) {
      const response = await axios.get(`http://localhost:8080/api/cart/${user.id}`)
      setCart(response.data);
    }
  }




  return (
    <div>
      <div className='header-all'>
        <div className='header-container'>
          <Link to={'/'}>
            <div className='logo'>
              <img class="dt-width-auto logo-shop" height="60" width="200" src="https://file.hstatic.net/200000837185/file/logo-web-white-2_d77f90f6d67c47bea3c129624300ba8f.png" alt="Xgear" />
            </div>
          </Link>
          <div className='search'>
            <input className='input-search' type='text' placeholder='Thương hiệu...'>
            </input>
            <button className='button-search'>
              <FaSearch />
            </button>
          </div>
          <div className='hotline'>
            <div className='icon-hotline'>
              <LuPhoneCall />
            </div>
            <div className='phone-hotline'>
              <span>HotLine</span><br />
              <span>0375499207</span>
            </div>
          </div>
          <div className='avatar'>
            <div className='icon-avatar'>
              {user.id !== 0 ? (
                <div className='icon-data-avatar'>
                  <img width={25} src={user.image}></img>
                </div>
              ) : (
                <Link className='link-style' to={"/login"}>
                  <>
                    <RxAvatar />
                  </>
                </Link>
              )}
            </div>
            <div className='account'>
              {user.id !== 0 ? (
                <div class="content-data-avatar">
                  <div class="select-wrapper">
                    <div class="select-selected">{<span>{user.name}</span>}</div>
                    <div class="options-container">
                      <Link to='/order' className="link-style">
                        <div class="option-avatar" data-value="1">Đơn hàng</div>
                      </Link>
                      <div class="option-avatar" data-value="2" >Đăng xuất</div>
                    </div>
                  </div>
                </div>
              ) : (
                <Link className='link-style' to={"/login"}>
                  <>
                    <span>Đăng nhập</span><br />
                    <span>Đăng ký</span>
                  </>
                </Link>
              )}
            </div>
          </div>
          <div className='cart'>
            <Link to={'/cart'}>
              <button className='button-cart'>
                <div className='quantity-header-cart'>
                  <p>
                    {cart.length === 0 ? (
                      "0"  // Nếu mảng cart rỗng, in ra 1
                    ) : (
                      cart.length  // Nếu mảng cart không rỗng, in ra 2
                    )}
                  </p>
                </div>
                <div className='icon-cart'>
                  <BsCart3 />
                </div>
                <div className='text-cart'>
                  Giỏ hàng
                </div>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
