import React , { useEffect, useContext, useRef } from 'react'
import { NavLink, useNavigate} from 'react-router-dom';

import $ from 'jquery';
import './dependencies/fontawesome/css/all.css';
import './Navbar.css';

import { AuthContext } from "../../context/authContext";
import Diversity2Icon from '@mui/icons-material/Diversity2';
import AcUnitIcon from '@mui/icons-material/AcUnit';

const Navbar = () => {
  const navigate = useNavigate();
  const { currentUser, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    navigate('/login'); // Redirect to "/" after logout
  };
  
  // UI effect
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
  useEffect(() => {itemRef.current.click()}, [currentUser])
  // const id = currentUser.UserId;
  return (
    <nav className="navbar navbar-expand-lg navbar-mainbg">

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
            <li className="nav-item active" ref={itemRef}>
              <NavLink className="nav-link" to="/dashboard" exact="true" style={{fontFamily: 'sans-serif'}}>
                <i className="fas fa-tachometer-alt_tmp"></i>Dashboard 
                {/* remove _tmp to get icon */}
              </NavLink> 
            </li>
            
            { [0].includes(currentUser?.RoleId) ?<>
            <TagLink className="fas fa-blog_tmp" to='/hokhau' text='Hộ khẩu' />
            <TagLink className="fas fa-blog_tmp" to='/tamtru' text='Tạm trú' /></>
            : null }
            { [0].includes(currentUser?.RoleId) ? <>
            <TagLink className="fas fa-blog_tmp" to='/khoanthu' text='Khoản thu' />
            <TagLink className="fas fa-blog_tmp" to='/noptien' text='Nộp tiền' />
            </> : null }

            {/* <span style={{width: '50%', 
              marginRight: !currentUser ? '-150px' : 
                           currentUser?.RoleId === 0 ? '-200px' :'-250px'
            }}></span> */} 
            <TagLink className="fas fa-paper-plane" to='/sendfile' text='SendFile' />


            

            { currentUser?.RoleId === 0 ? 
            <TagLink className="fas fa-users_tmp" to='/account' text='Tài khoản' />
            : null }

            <span style={{width: '50%', 
              marginRight: !currentUser ? '-240px' : 
                           currentUser?.RoleId === 0 ? '-360px' : '-380px'
            }}></span>
      
            { currentUser ?
            <TagLink onClick={handleLogout} className="fas fa-sign-out-alt" to='/' text='Đăng xuất' /> :
            <TagLink className="fas fa-sign-in-alt" to='/login' text='Đăng nhập' /> }
        </ul>
      </div>
    </nav>
  )
}
export default Navbar;

const TagLink = ({className, to, onClick = ()=>{}, text}) => (
  <li className="nav-item">
    <NavLink onClick={onClick} className="nav-link" to={to} exact="true" style={{fontFamily: 'sans-serif'}}>
      <i className={className}></i>{text}
    </NavLink>
  </li>
)