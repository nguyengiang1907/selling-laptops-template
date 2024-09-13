import React, { useState } from 'react'
import axios from 'axios';
import '../css/signUp.css'
import HeaderUser from '../layout/HeaderUser'
import FooterUser from '../layout/FooterUser'
import { Link } from 'react-router-dom';

export default function SignUp() {
    const [image, setImage] = useState();
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        rePassword: '',
        phoneNumber: '',
        address: '',
    });
    const [errors, setErrors] = useState({});


    function handleInput(event) {
        const { name, value } = event.target;
        setValues({ ...values, [name]: value });
        setErrors({ ...errors, [name]: '' });

    }

    function handleImageChange(e) {
        const file = e.target.files[0];
        setImage(file);
    }

    async function handleSubmit(event) {
        event.preventDefault();
        if (!image) {
            setErrors({ ...errors, image: "Cần có ảnh" });
            return;
        }
        const formData = new FormData();
        formData.append("name", values.name);
        formData.append("email", values.email);
        formData.append("password", values.password);
        formData.append("rePassword", values.rePassword);
        formData.append("phoneNumber", values.phoneNumber);
        formData.append('address', values.address);
        formData.append("image", image);

        try {
            const response = await axios.post("http://localhost:8080/api/account/signUp", formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            if (response.status === 201) {
                // Chuyển đến trang đăng nhập
                window.location.href = "/login"; // Thay '/login' bằng đường dẫn đến trang đăng nhập của bạn
            }
        } catch (error) {
            console.error("Error submitting form:", error);
        }
    }

    return (
        <div>
            <body>
                <HeaderUser />
                <div className='title-home'>
                    <div className='content-title'>
                        <span>Trang chủ  /  Đăng ký</span>
                    </div>
                </div>
                <div className='container-signUp'>
                    <div className='form-signUp'>
                        <form onSubmit={handleSubmit}>
                            <div className='title-signUp'>
                                <span className='content-title'>Tạo tài khoản</span>
                            </div>
                            <div className='div-signUp-name'>
                                <input onChange={handleInput}  value={values.name} name="name" className='input-signup' type='text' placeholder='Tên' />
                            </div>
                            <div className='div-signUp-name'>
                                <input onChange={handleInput} value={values.email} name="email" className='input-signup' type='text' placeholder='Email' />
                            </div>
                            <div className='div-signUp-name'>
                                <input onChange={handleInput} value={values.password} name="password" className='input-signup' type='text' placeholder='Mật khẩu' />
                            </div>
                            <div className='div-signUp-name'>
                                <input onChange={handleInput} value={values.rePassword} name="rePassword" className='input-signup' type='text' placeholder='Nhập lại mật khẩu' />
                            </div>
                            <div className='div-signUp-name'>
                                <input onChange={handleInput} value={values.phoneNumber} name="phoneNumber" className='input-signup' type='text' placeholder='Số điện thoại' />
                            </div>
                            <div className='div-signUp-name'>
                                <input onChange={handleInput} value={values.address} name="address" className='input-signup' type='text' placeholder='Địa chỉ' />
                            </div>
                            <div className='div-signUp-name'>
                                <input onChange={handleImageChange} className='file-signup' type='file' />
                            </div>
                            <div className='div-signUp-name'>
                                <button type='submit' className='button-signUp'>Đăng ký</button>
                            </div>
                            <div className='back-login'>
                                <Link to={"/login"}>
                                     Quay lại trang đăng nhập
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
                <FooterUser />
            </body>
        </div>
    )
}
