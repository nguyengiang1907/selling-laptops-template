import React, { useState, useEffect } from 'react';
import '../css/layoutHome.css'
import HeaderUser from '../layout/HeaderUser'
import { RiRam2Line } from "react-icons/ri";
import { HiMiniCpuChip } from "react-icons/hi2";
import { IoIosColorFilter } from "react-icons/io";
import { FaDisplay } from "react-icons/fa6";
import { FaSadTear } from "react-icons/fa";
import axios from 'axios';
import FooterUser from '../layout/FooterUser';
import { Link } from 'react-router-dom';

export default function HomeProduct() {
  const [categorys, setCategorys] = useState([]);
  const [laptops, setLaptops] = useState([]);
  const [user, setUser] = useState(2);
  const [selectedOption, setSelectedOption] = useState('');

  useEffect(() =>{
    checkAccount();
  },[])

  async function checkAccount() {
    const response = await axios.get("http://localhost:8080/api/account/check");
    setUser(response.data);
    
  }

  async function showCategory() {
    const response = await axios.get("http://localhost:8080/api/category");
    setCategorys(response.data);
  }

  async function getAllLaptops() {
    const response = await axios.get("http://localhost:8080/api/laptops");
    setLaptops(response.data)
  }
  async function saveSeenLaptop( idLaptop) {
    if(user.id !== 0){
      const response = await axios.post(`http://localhost:8080/api/seen/${user.id}/${idLaptop}`);
    }
  }


  useEffect(() => {
    getAllLaptops();
    showCategory();
    document.title = "Trang chủ";
  }, []);

  function formatNumberWithCommas(number) {
    if (number === undefined || number === null) {
      return 'N/A';
    }
    return number.toLocaleString("de-DE");
  }

  const TextWithLimit = ({ text, limit }) => {
    if (text.length > limit) {
      return <span>{text.slice(0, limit)}...</span>;
    } else {
      return <span>{text}</span>;
    }
  };

  useEffect(() => {
    // Chọn radio button đầu tiên khi component được mount
    if (categorys.length > 0) {
      setSelectedOption(`category-0`);
    }
  }, [categorys]);

  const handleChange = (event) => {
    setSelectedOption(event.target.id);
  };

  async function findProductByCategory(idCategory) {
    try {
      if (idCategory === 1) {
          await getAllLaptops();
      } else {
          const response = await axios.get(`http://localhost:8080/api/laptops/findCategory/${idCategory}`);
          setLaptops(response.data);
      }
  } catch (error) {
      console.error(`Error fetching laptops for category ${idCategory}:`, error);
  }
  }
  const handleCategoryClick = (id, index) => {
    // Cập nhật radio button được chọn
    setSelectedOption(`category-${index}`);
    // Gọi hàm hiện tại
    findProductByCategory(id);
};


  return (
    <div>
      <body>
        <HeaderUser />
        <div className='title-home'>
          <div className='content-title'>
            <span>Trang chủ  /  Laptop</span>
          </div>
        </div>
        <div className='home-container'>
          <div className='home-left'>
            <div className='title-left'>
              <span>
                Thương hiệu
              </span>
            </div>
            <div className='data-left'>
              {categorys.map((item, index) => (
                <div key={index} className="data-category" onClick={() => handleCategoryClick(item.id, index)}>
                  <input
                    type="radio"
                    name="category"
                    id={`category-${index}`}
                    className="checkbox-category"
                    checked={selectedOption === `category-${index}`}
                    onChange={handleChange}
                  />
                  <label className='content-category'>{item.name}</label>
                </div>
              ))}
            </div>
          </div>
          <div className='home-right'>
            <div className='search-product'>
              <button className='btn-search'>
                <span>
                  Nổi bật
                </span>
              </button>
              <button className='btn-search'>
                <span>
                  Giá : Tăng dần
                </span>
              </button>
              <button className='btn-search'>
                <span>
                  Giá : Giảm dần
                </span>
              </button>
              <button className='btn-search'>
                <span>
                  A - Z
                </span>
              </button>
              <button className='btn-search'>
                <span>
                  Z - A
                </span>
              </button>
              <button className='btn-search'>
                <span>
                  Mới nhất
                </span>
              </button>
              <button className='btn-search'>
                <span>
                  Bán chạy nhất
                </span>
              </button>
            </div>
            
            {laptops.length === 0 ? (
              <div className='error-laptops'>
                <div className='icon-error-laptops'>
                  <FaSadTear />
                </div>
                <div  className='content-error-laptops'>
                  <span>Chưa có sản phẩm nào !</span>
                </div>
              </div>
            ) : (
                laptops.map((item, index) => (
                    <Link to={`/detailProduct/${item.id}`} key={item.id}>
                        <div className='all-product' onClick={() => saveSeenLaptop(item.id)}>
                            <div className='image-product'>
                                <div className='data-category'>
                                    <img width="170px" src={item.image} alt={item.name}></img>
                                </div>
                            </div>
                            <div className='name-product'>
                                <span>
                                    <TextWithLimit text={item.name} limit={42} />
                                </span>
                            </div>
                            <div className='price-product'>
                                <span>
                                    {formatNumberWithCommas(item.price)} ₫
                                </span>
                            </div>
                            <div className='ram-product'>
                                <div className='icon-ram'>
                                    <RiRam2Line />
                                </div>
                                <div className='data-ram'>
                                    {item.ram}
                                </div>
                            </div>
                            <div className='cpu-product'>
                                <div className='icon-cpu'>
                                    <HiMiniCpuChip />
                                </div>
                                <div className='data-cpu'>
                                    {item.cpu}
                                </div>
                            </div>
                            <div className='display-product'>
                                <div className='icon-display'>
                                    <FaDisplay />
                                </div>
                                <div className='data-display'>
                                    {item.display}
                                </div>
                            </div>
                            <div className='appearance-product'>
                                <div className='icon-appearance'>
                                    <IoIosColorFilter />
                                </div>
                                <div className='data-appearance'>
                                    {item.appearance}
                                </div>
                            </div>
                        </div>
                    </Link>
                ))
            )}
          </div>
        </div>
      </body>

      <FooterUser />
    </div>
  )
}
