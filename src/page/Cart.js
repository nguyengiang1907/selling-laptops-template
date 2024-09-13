import axios from 'axios';
import React, { useState, useEffect } from 'react';
import HeaderUser from '../layout/HeaderUser';
import FooterUser from '../layout/FooterUser';
import { useNavigate } from 'react-router-dom';
import { IoArrowUndoCircleOutline } from "react-icons/io5";
import { RiRam2Line } from "react-icons/ri";
import { HiMiniCpuChip } from "react-icons/hi2";
import { IoIosColorFilter } from "react-icons/io";
import { FaDisplay } from "react-icons/fa6";
import "../css/cart.css";
import { Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import { FaSadTear } from "react-icons/fa";

export default function Cart() {
    const [user, setUser] = useState({});
    const [listCart, setListCart] = useState([]);
    const [sumPriceOrder, setSumPriceOrder] = useState(0);
    const [listSeen, setListSeen] = useState([]);
    const [currentSeenPage, setCurrentSeenPage] = useState(0);
    const itemsPerPage = 4;
    const [comment,setComent] = useState("");
    const [discountCode,setDiscountCode] = useState("");
    const [idStatus,setIdStatus] = useState(1);
    const [isChecked, setIsChecked] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const checkAndSet = async () => {
            console.log('checkAccount useEffect running');
            await checkAccount();
            setIsChecked(true);
        };
        checkAndSet();
    }, []);
    
    useEffect(() => {
        if (isChecked) {
            console.log('showCart useEffect running');
            showCart();
            document.title = "Giỏ hàng";
        }
    }, [isChecked]);
    
    useEffect(() => {
        if (isChecked) {
            console.log('getSeenLaptop useEffect running');
            getSeenLaptop();
        }
    }, [isChecked]);

    async function checkAccount() {
        const response = await axios.get("http://localhost:8080/api/account/check");
        setUser(response.data);
      }

    async function showCart() {
        if(user.id !== 0){
            const response = await axios.get(`http://localhost:8080/api/cart/${user.id}`);
            setListCart(response.data);
        }
    }

    async function getSeenLaptop() {
        try {
            const response = await axios.get(`http://localhost:8080/api/seen/${user.id}`);
            const data = response.data;

            // Kiểm tra data có phải là mảng không
            if (Array.isArray(data)) {
                const sortedData = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                setListSeen(sortedData);
            } else {
                console.error('Received data is not an array:', data);
                setListSeen([]); // Đặt giá trị mặc định nếu không phải mảng
            }
        } catch (error) {
            console.error('Error fetching seen laptops:', error);
            setListSeen([]); // Đặt giá trị mặc định nếu có lỗi
        }
    }

    function formatNumberWithCommas(number) {
        if (number === undefined || number === null) {
            return 'N/A';
        }
        return number.toLocaleString("de-DE");
    }

    async function increaseLaptopCart(idCart) {
        const response = await axios.get(`http://localhost:8080/api/cart/increase/${idCart}`);
        showCart();
    }

    async function reduceLaptopCart(idCart) {
        const response = await axios.get(`http://localhost:8080/api/cart/reduce/${idCart}`);
        showCart();
    }
    


    useEffect(() => {
        if (listCart && listCart.length > 0) {
            setSumPriceOrder(calculateSum(listCart));
        } else {
            setSumPriceOrder(0);
        }
    }, [listCart]);

    const TextWithLimit = ({ text, limit }) => {
        if (text.length > limit) {
            return <span>{text.slice(0, limit)}...</span>;
        } else {
            return <span>{text}</span>;
        }
    };

    async function deleteCart(idCart) {
        const response = await axios.delete(`http://localhost:8080/api/cart/deleteCart/${idCart}`);
        window.location.reload();
        showCart();
    }

    const calculateSum = (listCart) => {
        let total = 0;
        listCart.forEach(item => {
            total += item.idLaptop.price * item.quantity;
        });
        return total;
    };

    const handlePageClick = (event) => {
        setCurrentSeenPage(event.selected);
    };

    async function saveOrder(){
        if(user.id !== 0){
            const request = {
                idStatus:idStatus,
                listCart:listCart,
                comment:comment,
                discountCode:discountCode
            }
            console.log(request);
    
            const response = await axios.post(`http://localhost:8080/api/order`, request)
            console.log(response);
            window.location.reload();
        }else{
            navigate("/login")
        }
        
    }


    const offset = currentSeenPage * itemsPerPage;
    const currentItems = listSeen.slice(offset, offset + itemsPerPage);

    return (
        <div>
            <HeaderUser />
            <div className='title-home'>
                <div className='content-title'>
                    <span>Trang chủ  /  Giỏ hàng</span>
                </div>
            </div>
            <div className='container-cart'>
                <div className='content-left'>
                    <div className='content-cart'>
                        <div className='title-content-left-cart'>
                            Giỏ hàng:
                        </div>
                        <div className='sum-quantity-cart'>
                            <span >{listCart.length} Sản phẩm</span>
                        </div>
                        {listCart.length === 0 ? (
                            <div className='error-laptops'>
                                <div className='icon-error-laptops'>
                                    <FaSadTear />
                                </div>
                                <div className='content-error-laptops'>
                                    <span>Chưa có sản phẩm nào !</span>
                                </div>
                            </div>
                        ) : (
                            listCart.map((item, index) => (
                                <div className='data-cart' key={index}>
                                    <Link to={`/detailProduct/${item.idLaptop.id}`}>
                                        <div className='image-cart'>
                                            <img width='80' src={item.idLaptop.image} alt="Laptop"></img>
                                        </div>
                                    </Link>
                                    <div className='name-price-cart'>
                                        <Link className="no-underline" to={`/detailProduct/${item.idLaptop.id}`}>
                                            <div className='name-cart'>
                                                <TextWithLimit text={item.idLaptop.name} limit={62} />
                                            </div>
                                        </Link>
                                        <div className='price-cart'>
                                            Giá sốc :
                                            <span className='color-price'> {formatNumberWithCommas(item.idLaptop.price)} ₫</span>
                                        </div>
                                    </div>
                                    <div className='button-quantity-delete'>
                                        <div className='quantity-cart'>
                                            <button onClick={() => increaseLaptopCart(item.id)} className='button-increase'>-</button>
                                            <input className='input-quantity' type='text' value={item.quantity} readOnly />
                                            <button onClick={() => reduceLaptopCart(item.id)} className='button-reduce'>+</button>
                                        </div>
                                        <div className='delete-cart'>
                                            <button onClick={() => deleteCart(item.id)} className='button-delete-cart'>Xóa</button>
                                        </div>
                                    </div>
                                    <div className='sum-price-cart'>
                                        <span className='color-price'> {formatNumberWithCommas(item.idLaptop.price * item.quantity)} ₫</span>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    <div className='product-seen'>
                        <div className='title-seen'>
                            <span>| SẢN PHẨM ĐÃ XEM </span>
                        </div>
                        {currentItems.length === 0 ? (
                            <div className='error-laptops'>
                                <div className='icon-error-laptops'>
                                    <FaSadTear />
                                </div>
                                <div className='content-error-laptops'>
                                    <span>Chưa có sản phẩm nào !</span>
                                </div>
                            </div>
                        ) : (
                            currentItems.map((item, index) => (
                                <Link to={`/detailProduct/${item.laptop.id}`} key={index}>
                                    <div className='all-product-seen'>
                                        <div className='image-product-seen'>
                                            <div key={index} className='data-category'>
                                                <img width="155px" src={item.laptop.image} alt="Laptop"></img>
                                            </div>
                                        </div>
                                        <div className='name-product'>
                                            <span>
                                                <TextWithLimit text={item.laptop.name} limit={42} />
                                            </span>
                                        </div>
                                        <div className='price-product'>
                                            <span>
                                                {formatNumberWithCommas(item.laptop.price)} ₫
                                            </span>
                                        </div>
                                        <div className='ram-product'>
                                            <div className='icon-ram'>
                                                <RiRam2Line />
                                            </div>
                                            <div className='data-ram'>
                                                {item.laptop.ram}
                                            </div>
                                        </div>
                                        <div className='cpu-product'>
                                            <div className='icon-cpu'>
                                                <HiMiniCpuChip />
                                            </div>
                                            <div className='data-cpu'>
                                                {item.laptop.cpu}
                                            </div>
                                        </div>
                                        <div className='display-product'>
                                            <div className='icon-display'>
                                                <FaDisplay />
                                            </div>
                                            <div className='data-display'>
                                                {item.laptop.display}
                                            </div>
                                        </div>
                                        <div className='appearance-product'>
                                            <div className='icon-appearance'>
                                                <IoIosColorFilter />
                                            </div>
                                            <div className='data-appearance'>
                                                {item.laptop.appearance}
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))
                        )}
                        <div className='page-seen'>
                            <ReactPaginate
                                previousLabel={null}
                                nextLabel={null}
                                breakLabel={'...'}
                                pageCount={Math.ceil(listSeen.length / itemsPerPage)}
                                marginPagesDisplayed={2}
                                pageRangeDisplayed={5}
                                onPageChange={handlePageClick}
                                containerClassName={'pagination'}
                                activeClassName={'active'}
                                pageClassName={'page-item'}
                                pageLinkClassName={'page-link'}
                                breakClassName={'page-item'}
                                breakLinkClassName={'page-link'}
                            />
                        </div>
                    </div>
                </div>
                <div className='content-right'>
                    <div className='title-content-right'>
                        <span>
                            Thông tin đơn hàng
                        </span>
                    </div>
                    <div className='sum-price-order'>
                        <div className='content-sum-price-order'>
                            Tổng tiền:
                        </div>
                        <div className='data-sum-price-order'>
                            <span>{formatNumberWithCommas(sumPriceOrder)} ₫</span>
                        </div>
                    </div>
                    <div className='note-order'>
                        <div className='title-note-order'>
                            Ghi chú đơn hàng
                        </div>
                        <div className='textarea-note-order'>
                            <textarea onChange={(e) => setComent(e.target.value)} placeholder='Ghi chú' className='text-area-note'></textarea>
                        </div>
                    </div>
                    <div className='promotion-order'>
                        <input  onChange={(e) => setDiscountCode(e.target.value)} placeholder='Nhập mã khuyến mãi (nếu có)' className='input-promotion-order'></input>
                    </div>
                    <div className='buy-laptop'>
                        <button className='button-buy-laptop' onClick={() => saveOrder()} >THANH TOÁN NGAY</button>
                    </div>
                    <div className='arrow-order'>
                        <div className='container-arrow'>
                            <Link className="no-underline" to={"/"}>
                                <div className='icon-arrow'>
                                    <IoArrowUndoCircleOutline />
                                </div>
                                <div className='content-arrow-order'>
                                    <span>Tiếp tục mua hàng</span>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <FooterUser />
        </div>
    );
}