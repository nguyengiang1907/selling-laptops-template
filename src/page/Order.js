import React, { useState, useEffect } from 'react'
import '../css/order.css'
import HeaderUser from '../layout/HeaderUser'
import FooterUser from '../layout/FooterUser'
import axios from 'axios';
import { FaSadTear } from "react-icons/fa";

export default function Order() {
    const [idAccount, setIdAccount] = useState(2);
    const [status, setStatus] = useState([]);
    const [orders, setOrders] = useState([]);
    const [selectedId, setSelectedId] = useState(1);

    const handleClick = (idUser, id, index) => {
        setSelectedId(id);
        handleCategoryClick(idUser, id, index);
    };

    async function getAllStatus() {
        const response = await axios.get("http://localhost:8080/api/status");
        setStatus(response.data);
    }
    async function getAllOrderByIdStatus(idUser,idStatus) {
        const response = await axios.get(`http://localhost:8080/api/order/${idUser}/${idStatus}`);
        setOrders(response.data);
    }
    async function updateStatus(idOrder, idStatus, updateStatus) {
        const response = await axios.put(`http://localhost:8080/api/order/${idOrder}/${updateStatus}`);
        handleCategoryClick(idAccount.id ,idStatus);
    }
    async function getAccountById() {
        const response = await axios.get(`http://localhost:8080/api/account/${idAccount}`);
        setIdAccount(response.data)
    }

    const handleCategoryClick = (idUser, id, index) => {
        getAllOrderByIdStatus(idUser, id);
    };
    function formatNumberWithCommas(number) {
        if (number === undefined || number === null) {
            return 'N/A';
        }
        return number.toLocaleString("de-DE");
    }

    useEffect(() => {
        getAllStatus();
        document.title = "Đơn hàng";
    }, []);
    function formatDate(isoString) {
        const date = new Date(isoString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Tháng bắt đầu từ 0
        const year = date.getFullYear();
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');

        return `${year}${hours}${minutes}${seconds}`;
    }
    useEffect(() => {
        getAllOrderByIdStatus(idAccount, 1);
    }, []);
    useEffect(() => {
        getAccountById()
    }, {});
    return (
        <div>
            <body>
                <HeaderUser />
                <div className='title-home'>
                    <div className='content-title'>
                        <span>Trang chủ  /  Đơn hàng</span>
                    </div>
                </div>
                <div className='container-order'>
                    <div className='order-left'>
                        <div className='order-left-data'>
                            <div className='account-order'>
                                <div className='image-account-order'>
                                    <img src={idAccount.image} width={'50'}></img>
                                </div>
                                <div className='content-account-order'>
                                    <span>
                                        {idAccount.name}
                                    </span>
                                    <br/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='search-status-order'>
                        {status.map((item, index) => (
                            <div key={item.id}
                                className={`data-order-status ${selectedId === item.id ? 'selected' : ''}`}
                                onClick={() => handleClick(idAccount.id, item.id, index)}>
                                <span>{item.name}</span>
                            </div>
                        ))}
                    </div>
                    <div className='order-right'>
                        {orders.length === 0 ? (
                            <div className='error-laptops'>
                                <div className='icon-error-laptops'>
                                    <FaSadTear />
                                </div>
                                <div className='content-error-laptops'>
                                    <span>Chưa có sản phẩm</span>
                                </div>
                            </div>
                        ) : (
                            orders.map((item, index) => (
                                <div key={index} className='data-right'>
                                    <div className='data-key-order'>
                                        <span>{formatDate(item.updatedAt)}</span>
                                    </div>
                                    <div className='data-image-order'>
                                        <img width={'100'} src={item.laptop?.image} alt={`Image of ${item.laptop?.name}`} />
                                    </div>
                                    <div className='data-name-order'>
                                        <span>{item.laptop?.name}</span>
                                    </div>
                                    <div className='data-quantity-order'>
                                        <span>{item.quantity} Sản phẩm</span>
                                    </div>
                                    <div className='data-price-order'>
                                        <span>{formatNumberWithCommas(item.laptop?.price * item.quantity)} ₫</span>
                                    </div>
                                    <div className='data-status-order'>
                                        {item.status?.id === 2 ? (
                                            <button onClick={() => updateStatus(item.id, item.status.id, 5)} className='button-cancel-order'>Hủy đơn</button>
                                        ) : item.status?.id === 6 ? (
                                            <button onClick={() => updateStatus(item.id, item.status.id, 1)} className='button-reorder'>Mua lại</button>
                                        ) : (
                                            <span>{item.status?.name}</span>
                                        )}
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
                <FooterUser />
            </body>
        </div>
    )
}
