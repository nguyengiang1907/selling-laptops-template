import '../css/headerHome.css'
import { FaSearch } from "react-icons/fa";
import { LuPhoneCall } from "react-icons/lu";
import { RxAvatar } from "react-icons/rx";
import { BsCart3 } from "react-icons/bs";
import { Link } from 'react-router-dom';


export default function HeaderUser() {
 
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
              <RxAvatar />
            </div>
            <div className='account'>
              <span>Đăng nhập</span><br />
              <span>Đăng ký</span>
            </div>
          </div>
          <div className='cart'>
            <Link to={'/cart'}>
            <button  className='button-cart'>
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
