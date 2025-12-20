import React , { useEffect, useContext, useRef } from 'react'
import { NavLink, useNavigate} from 'react-router-dom';

import $ from 'jquery';
import './dependencies/fontawesome/css/all.css';
import './Navbar.css';

import { AuthContext } from "../../context/authContext";
import AcUnitIcon from '@mui/icons-material/AcUnit';

const Navbar = () => {
  const navigate = useNavigate();
  const { currentUser, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    navigate('/login'); 
  };
  
  // --- Giữ nguyên hiệu ứng Animation ---
  function animation(){
    var tabsNewAnim = $('#navbarSupportedContent');
    var activeItemNewAnim = tabsNewAnim.find('.active');
    var activeWidthNewAnimHeight = activeItemNewAnim.innerHeight();
    var activeWidthNewAnimWidth = activeItemNewAnim.innerWidth();
    var itemPosNewAnimTop = activeItemNewAnim.position();
    var itemPosNewAnimLeft = activeItemNewAnim.position();
    $(".hori-selector").css({
      "top":itemPosNewAnimTop.top + "px", 
      "left":itemPosNewAnimLeft.left + "px",
      "height": activeWidthNewAnimHeight + "px",
      "width": activeWidthNewAnimWidth + "px"
    });
    $("#navbarSupportedContent").on("click","li",function(e){
      $('#navbarSupportedContent ul li').removeClass("active");
      $(this).addClass('active');
      var activeWidthNewAnimHeight = $(this).innerHeight();
      var activeWidthNewAnimWidth = $(this).innerWidth();
      var itemPosNewAnimTop = $(this).position();
      var itemPosNewAnimLeft = $(this).position();
      $(".hori-selector").css({
        "top":itemPosNewAnimTop.top + "px", 
        "left":itemPosNewAnimLeft.left + "px",
        "height": activeWidthNewAnimHeight + "px",
        "width": activeWidthNewAnimWidth + "px"
      });
    });
  }

  useEffect(() => {
    animation();
    $(window).on('resize', function(){
      setTimeout(function(){ animation(); }, 500);
    });
  }, []);

  const itemRef = useRef(null)  
  // Tự động click vào tab đầu tiên khi load
  useEffect(() => {
    if(itemRef.current) itemRef.current.click()
  }, [currentUser])

  return (
    <nav className="navbar navbar-expand-lg navbar-mainbg">

      {/* 1. SỬA TÊN LOGO */}
      <NavLink className="navbar-brand navbar-logo" to="/" exact="true">
        <AcUnitIcon style={{marginRight: 10, marginTop: -4}}/>
        Hotel Management
      </NavLink>
    
      <button 
        className="navbar-toggler"
        onClick={ function() { setTimeout(function(){ animation(); }); }}
        type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <i className="fas fa-bars text-white"></i>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav ml-auto" style={{width: '100%'}}>
            
            <div className="hori-selector">
              <div className="left"></div>
              <div className="right"></div>
            </div>

            {/* 2. SỬA TAB DASHBOARD THÀNH QUẢN LÝ NHÂN KHẨU */}
            {/* Link trỏ về /hokhau để khớp với App.js */}
            <li className="nav-item active" ref={itemRef}>
              <NavLink className="nav-link" to="/hokhau" exact="true" style={{fontFamily: 'sans-serif'}}>
                <i className="fas fa-users"></i>Nhân khẩu
              </NavLink> 
            </li>
            
            {/* Đã xóa SendFile và các tab rác khác */}
            
            {/* Nếu muốn mở rộng sau này thì bỏ comment đoạn dưới */}
            {/* <TagLink className="fas fa-address-card" to='/tamtru' text='Tạm trú' />
             <TagLink className="fas fa-money-bill" to='/khoanthu' text='Khoản thu' /> 
            */}

            {/* Giữ khoảng cách layout */}
            <span style={{width: '50%', marginRight: '-200px'}}></span>
      
            {/* Nút Đăng nhập / Đăng xuất */}
            { currentUser ?
            <TagLink onClick={handleLogout} className="fas fa-sign-out-alt" to='/' text='Đăng xuất' /> :
            <TagLink className="fas fa-sign-in-alt" to='/login' text='Đăng nhập' /> }
        </ul>
      </div>
    </nav>
  )
}
export default Navbar;

// Component con để render các link phụ (nếu cần dùng sau này)
const TagLink = ({className, to, onClick = ()=>{}, text}) => (
  <li className="nav-item">
    <NavLink onClick={onClick} className="nav-link" to={to} exact="true" style={{fontFamily: 'sans-serif'}}>
      <i className={className}></i>{text}
    </NavLink>
  </li>
)