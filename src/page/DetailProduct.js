import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import HeaderUser from '../layout/HeaderUser'
import FooterUser from '../layout/FooterUser'
import { IoIosRadioButtonOn } from "react-icons/io";
import { FaCircleCheck } from "react-icons/fa6";
import { GiPresent } from "react-icons/gi";
import { Link, useParams } from 'react-router-dom'
import axios from 'axios';
import "../css/detailProduct.css"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function DetailProduct() {
    const params = useParams();
    const [product, setProduct] = useState({});
    const [user, setUser] = useState([])
    const [quantity, setQuantity] = useState(1);
    const navigate = useNavigate();

    const notify = () => toast("Wow so easy!");

    useEffect(() => {
        checkAccount();
    },[]);

    async function checkAccount() {
        const response = await axios.get("http://localhost:8080/api/account/check");
        setUser(response.data);
      }

    async function getLaptop() {
        const response = await axios.get(`http://localhost:8080/api/laptops/${params.id}`);
        setProduct(response.data);
    }
    useEffect(() => {
        getLaptop();
        document.title = "Chi tiết laptop";
    }, []);

    function formatNumberWithCommas(number) {
        if (number === undefined || number === null) {
            return 'N/A';
        }
        return number.toLocaleString("de-DE");
    }
    // const addLaptopToCart = async () => {
    //     try {
    //         const response = await axios.post(``);
    //         getLaptop();
    //     } catch (error) {
    //         console.error('Error adding product to cart:', error);
    //     }
    // };

    const increaseLaptop = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    const reduceLaptop = () => {
        setQuantity((prevQuantity) => prevQuantity + 1);
    };

    const addLaptopToCart = (user, idLaptop) => {
        if(user.id !== 0){
        fetch(`http://localhost:8080/api/cart/${user.id}/${idLaptop}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ quantity: quantity }),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                window.location.reload();
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        }else{
            navigate("/login");
        }
    };
    return (
        <div>
            <body>
                <HeaderUser />
                <div className='title-home'>
                    <div className='content-title'>
                        <span>Trang chủ  /  Laptop  /  Chi tiết  / {product?.idCategory?.name}</span>
                    </div>
                </div>
                <div className='container'>
                    <div className='left-detail'>
                        <div className='image-detail-product'>
                            <img width='400' src={product.image}></img>
                        </div>
                    </div>
                    <div className='right-detail'>
                        <div className='name-detail'>
                            <span>{product.name}</span>
                        </div>
                        <div className='category-detail'>
                            <span>Thương hiệu: {product?.idCategory?.name} | Loại: Laptop </span>
                        </div>
                        <div className='price-detail'>
                            <span>{formatNumberWithCommas(product.price)} ₫</span>
                        </div>
                        <div className='button-detail'>
                            <button className='button-guaranteed'>
                                Bảo hành 12 tháng chính hãng.
                            </button>
                            <button className='button-VAT'>
                                Đã bao gồm VAT
                            </button>
                        </div>

                        <div className='quantity'>
                            <button onClick={increaseLaptop} className='button-increase'>-</button>
                            <input className='input-quantity' type='number' value={quantity} readOnly />
                            <button onClick={reduceLaptop} className='button-reduce'>+</button>
                        </div>
                        <div className='donate'>
                            <div className='donate-title'>
                                Khuyến mãi
                            </div>
                            <div className="donate-price">
                                <div className='donate-price-icon'>
                                    <IoIosRadioButtonOn />
                                </div>
                                <div className='content-donate-price'>
                                    Giá sốc
                                </div>
                            </div>
                            <div className='donate-more'>
                                <div className='icon-more'>
                                    <GiPresent />
                                </div>
                                <div className='content-more'>
                                    Ưu đãi thêm
                                </div>
                            </div>
                            <div className='detail-more'>
                                <div className='container-detail-more'>
                                    <div className='icon-detail-more'>
                                        <FaCircleCheck />
                                    </div>
                                    <div className='content-detail-more'>
                                        Túi chống sốc thường hoặc mua túi chống sốc chống nước chỉ 90.000đ.
                                    </div>
                                    <div className='icon-detail-more'>
                                        <FaCircleCheck />
                                    </div>
                                    <div className='content-detail-more'>
                                        Giảm 50.000đ khi mua thêm Gaming Gear.
                                    </div>
                                    <div className='icon-detail-more'>
                                        <FaCircleCheck />
                                    </div>
                                    <div className='content-detail-more'>
                                        Giảm 100.000đ khi mua thêm Màn hình
                                    </div>
                                    <div className='icon-detail-more'>
                                        <FaCircleCheck />
                                    </div>
                                    <div className='content-detail-more'>
                                        Nhập mã VNPAYICT giảm 3% tối đa 100.000đ cho đơn từ 500.000đ khi thanh toán qua VNPAY
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button  onClick={() => addLaptopToCart(user, product.id)} className='button-detail-cart'>Thêm vào giỏ hàng</button>
                    </div>
                </div>
                <FooterUser />
            </body>

        </div>
    )
}
