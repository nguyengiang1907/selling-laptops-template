import axios from 'axios';
import React, { useState } from 'react'
import '../css/login.css'
import HeaderUser from '../layout/HeaderUser'
import FooterUser from '../layout/FooterUser'
import { Link } from 'react-router-dom';

export default function Login() {
    const [email,setEmail] = useState();
    const [password,setPassword] = useState();

    async function login() {
        const response = await axios.post(`http://localhost:8080/api/account/login/${email}/${password}`);
        if (response.status === 200) {
            // Chuyển đến trang đăng nhập
            window.location.href = "/"; // Thay '/login' bằng đường dẫn đến trang đăng nhập của bạn
        }
    }

  return (
    <div>
      <body>
                <HeaderUser />
                <div className='title-home'>
                    <div className='content-title'>
                        <span>Trang chủ  /  Đăng nhập</span>
                    </div>
                </div>
                <div className='container-login'>
                    <div className='form-login'>
                            <div className='title-login'>
                                <span className='content-title'>Đăng nhập</span>
                            </div>
                            <div className='div-login-name'>
                                <input onChange={(e) => setEmail(e.target.value) }  name="email" className='input-login' type='text' placeholder='Email' />
                            </div>
                            <div className='div-login-name'>
                                <input onChange={(e) => setPassword(e.target.value) } name="password" className='input-login' type='text' placeholder='Mật khẩu' />
                            </div>
                            <div className='div-login-button'>
                                <button type='submit' onClick={() =>login()}  className='button-login'>Đăng nhập</button>
                            </div>
                            <div className='linkToSignUp'>
                                Khách hàng mới ?  
                                <Link to={"/signUp"}>
                                    Tạo tài khoản
                                </Link>
                            </div>
                    </div>
                </div>
                <FooterUser />
            </body>
    </div>
  )
}
