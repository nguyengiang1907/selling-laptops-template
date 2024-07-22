import React, { useState, useEffect } from 'react';
import '../css/layoutHome.css'
import HeaderUser from '../layout/HeaderUser'
import { RiRam2Line } from "react-icons/ri";
import { HiMiniCpuChip } from "react-icons/hi2";
import { IoIosColorFilter } from "react-icons/io";
import { FaDisplay } from "react-icons/fa6";
import axios from 'axios';
import FooterUser from '../layout/FooterUser';
import { Link } from 'react-router-dom';

export default function HomeProduct() {
  const [categorys, setCategorys] = useState([]);
  const [laptops, setLaptops] = useState([]);
  const [idUser,setIdUser] = useState(1);

  async function showCategory() {
    const response = await axios.get("http://localhost:8080/api/category");
    setCategorys(response.data);
  }

  async function getAllLaptops() {
    const response = await axios.get("http://localhost:8080/api/laptops");
    setLaptops(response.data)
  }
  async function saveSeenLaptop(idUser,idLaptop){
    const response = await axios.post(`http://localhost:8080/api/seen/${idUser}/${idLaptop}`);

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
                <div key={index} className='data-category'>
                  <input type='checkbox' className='checkbox-category'></input>
                  <label >  {item.name}</label>
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
            {laptops.map((item, index) => (
              <Link to={`/detailProduct/${item.id}`}>
                <div className='all-product' onClick={() => saveSeenLaptop(idUser,item.id)}>

                  <div className='image-product'>
                    <div key={index} className='data-category'>
                      <img width="170px" src={item.image}></img>
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
            ))}
            <button className='button-page'>
              Xem thêm 268 sản phẩm
            </button>
          </div>
        </div>
      </body>
      <FooterUser />
    </div>
  )
}
