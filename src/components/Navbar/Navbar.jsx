import React, { useEffect, useRef } from 'react'
import './Navbar.css'
import logo from '../../assets/logo.png'
import search from '../../assets/search.png'
import bell from '../../assets/bell.png'
import profile from '../../assets/profile.jpg'
import dropdown from '../../assets/dropdown.png'
import { logout } from '../../firebase'

const Navbar = () => {

  const navRef = useRef(); // Dark layer when scrolling

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if(window.scrollY >= 80){
        navRef.current.classList.add('nav-dark');
      }else{
        navRef.current.classList.remove('nav-dark');
      }
    })
  },[])

  return (
    <div ref={navRef} className='navbar'>
      <div className="navbar-left">
        <img src={logo} alt="" />
        <ul>
          <li>Home</li>
          <li>TV Shows</li>
          <li>Movies</li>
          <li>My List</li>
          <li>Browse by Languages</li>
        </ul>
      </div>
      <div className="navbar-right">
        <img src={search} alt="" className='icons'style={{ width: "20px", height: "auto" }}/>
        <p>Children</p>
        <img src={bell} alt="" className='icons'style={{ width: "20px", height: "auto" }}/>
        <div className="navbar-profile">
          <img src={profile} alt="" className='profile'/>
          <img src={dropdown} alt=""  style={{ width: "15px", height: "auto" }}/>
          <div className='dropdown'>
          <p onClick={()=>{logout()}}>Sign Out</p>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Navbar