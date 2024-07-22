import React from 'react'
import "../css/footerHome..css"
import { FaTelegramPlane } from "react-icons/fa";
import { FaFacebookSquare } from "react-icons/fa";
import { FaSquareInstagram } from "react-icons/fa6";
import { AiFillTikTok } from "react-icons/ai";
import { FaPhoneAlt } from "react-icons/fa";
import { MdOutlineMail } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";

import { Link } from "react-router-dom";

export default function FooterUser() {
  return (
    <div>
       <div className='all-footer'>
          <div className='top-footer'>
            <div className='content-top-footer'>
                ĐĂNG KÝ NHẬN TIN
            </div>
            <div className='search-footer'>
                <input className='input-footer'type='text' placeholder='Email'></input>
                <button className='button-footer'>
                        <FaTelegramPlane />
                    <span> ĐĂNG KÝ</span>
                </button>
            </div>
            <div className='icon-footer'>
                <Link to={'https://www.facebook.com/nguyengiang19072004/'} >
                <div className='icon-facebook'>
                <FaFacebookSquare />
                </div>
                </Link>
                <div className='icon-tiktok'>
                <AiFillTikTok />
                </div>
                <div className='icon-insta'>
                <FaSquareInstagram />
                </div>
            </div>
          </div>
          <div className='container-footer'>
            <div className='container-footer-one'>
                <div className='logo-footer'>
                    <img width='150' src='https://file.hstatic.net/200000837185/file/logo-web-white-2_d77f90f6d67c47bea3c129624300ba8f.png'></img>
                </div>
                <div className='content-one'>
                    <div className='content-one-footer'>
                    <span >XGEAR - Chuyên cung cấp Laptop Gaming & PC cao cấp chính hãng.</span>
                    </div>
                    <div className='content-one-foooter-icon'>
                        <div className='icon-one'>
                             <FaLocationDot />
                        </div>
                        <div className='content-icon-one'>
                            <span>HCM : 08 Tự Lập, Phường 4, Quận Tân Bình</span>
                        </div>
                    </div>
                    <div className='content-one-foooter-icon'>
                        <div className='icon-one'>
                            <FaLocationDot />
                        </div>
                        <div className='content-icon-one'>
                            <span>Hà Nội : 10A1 Ngõ 49 Linh Lang, Ba Đình</span>
                        </div>
                    </div>
                    <div className='content-one-foooter-icon'>
                        <div className='icon-one-phone'>
                            <FaPhoneAlt />
                        </div>
                        <div className='content-icon-one'>
                            <span>0375 499 207</span>
                        </div>
                    </div>
                    <div className='content-one-foooter-icon'>
                        <div className='icon-one-email'>
                            <MdOutlineMail />
                        </div>
                        <div className='content-icon-one'>
                            <span>ng19072004@gmail.com</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className='container-footer-two'>
                <div className='content-footer-two-title'>
                    <span>
                        CHÍNH SÁCH
                    </span>
                </div>
                <ul>
                    <li>Tìm kiếm</li>
                    <li>Liên hệ</li>
                    <li>Trung tâm bảo hành</li>
                </ul>
                <div className='content-footer-two-title'>
                    <span>
                        BÀI VIẾT
                    </span>
                </div>
                <ul>
                    <li>Hướng dẫn & Thủ thuật</li>
                    <li>Giải trí & Game </li>
                    <li>Tin tức công nghệ </li>
                    <li>Tin tức  </li> 
                </ul>
            </div>
            <div className='container-footer-three'>
                 <div className='content-footer-three-title'>
                    <span>
                        BÀI VIẾT
                    </span>
                </div>
                <ul>
                    <li>Hướng dẫn thanh toán</li>
                    <li>Hướng dẫn trả góp </li>
                    <li>Tra cứu bảo hành</li>
                    <li>Tuyển dụng </li> 
                    <li>Tin công nghệ  </li> 
                    <li>Chính sách bảo hành </li> 
                </ul>
            </div>
            <div className='container-footer-four'>
                <div className='content-footer-four-title'>
                    <span>
                        BÀI VIẾT
                    </span>
                </div>
                <ul>
                    <li>Hồ Chí Minh 093 373 1881 </li>
                    <li>Hà Nội 097 232 1881  </li>
                    <li>Hot line 028 7108 1881 </li>
                </ul>
                <div className='content-footer-four-title'>
                    <span>
                       PHƯƠNG THỨC THANH TOÁN
                    </span>
                    <div className='pay'>
                        <img width='246' height='24' src='https://theme.hstatic.net/1000379792/1000977285/14/footer_trustbadge.jpg?v=338'>
                        </img>
                    </div>
                </div>
            </div>
          </div>
      </div>
    </div>
  )
}
