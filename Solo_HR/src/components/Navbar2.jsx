import React, { useContext, useState } from 'react'
import Logo from '../assets/logo2.png'
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { FaRegUser } from "react-icons/fa";
import { HiMenuAlt1, HiMenuAlt3, } from "react-icons/hi";
import ResponsiveMenu from './ResponsiveMenu';
import { UpdateFollower } from 'react-mouse-follower';
import { NavbarMenu } from './Navbar';
import { ShopContext } from '../context/ShopContext';
import { AuthContext } from '../context/AuthContext';

const Navbar2 = () => {
  const [showMenu, setShowMenu] = useState(false)
  const toggleMenu = () => {
    setShowMenu(!showMenu)
  }
  const { getTotalCartItems } = useContext(ShopContext)
  const { user, logout } = useContext(AuthContext)
  const navigate = useNavigate()
  return (
    <div className='text-foreground py-2 bg-gray-900/50 backdrop-blur-md border-b border-gray-800 z-10'>
      <div className='container flex justify-between items-center'>
        {/* logo section */}
        <div>
          <img src={Logo} alt="" className='max-w-[100px] invert' />
        </div>
        {/* menu section */}
        <div className='hidden md:block'>
          <ul className='flex items-center gap-4 relative z-40'>
            {NavbarMenu.map((item, index) => (
              <li key={index}>
                <UpdateFollower
                  mouseOptions={{
                    backgroundColor: "white",
                    zIndex: 9999,
                    followSpeed: 1.5,
                    scale: 5,
                    mixBlendMode: "difference"
                  }}
                >
                  <Link to={item.link} className='inline-block text-base font-semibold py-2 px-3 uppercase'>
                    {item.title}
                  </Link>
                </UpdateFollower>
              </li>
            ))}
            <UpdateFollower
              mouseOptions={{
                backgroundColor: "white",
                zIndex: 9999,
                followSpeed: 1.5,
                scale: 5,
                mixBlendMode: "difference"
              }}
            >
              <Link to='/cart'> <div className='relative'>
                <ShoppingCart /> <div className='bg-[#138695] w-5 absolute -top-3 -right-2 flex items-center justify-center rounded-full text-white'>{getTotalCartItems()}</div>
              </div>
              </Link>
            </UpdateFollower>
            <UpdateFollower
              mouseOptions={{
                backgroundColor: "white",
                zIndex: 9999,
                followSpeed: 1.5,
                scale: 5,
                mixBlendMode: "difference"
              }}
            >
              {user ? (
                <span className="flex items-center gap-3 ps-8">
                  <Link to="/profile" className="text-sm font-medium hover:text-[#138695] transition-colors">
                    {user.username}
                  </Link>
                  <button
                    type="button"
                    onClick={() => { logout(); navigate('/'); }}
                    className="text-sm text-gray-400 hover:text-foreground transition-colors"
                  >
                    Logout
                  </button>
                </span>
              ) : (
                <Link to="/login" className='text-xl ps-8 inline-flex items-center gap-1'>
                  <FaRegUser /> <span className="text-sm font-medium">Sign in</span>
                </Link>
              )}
            </UpdateFollower>

          </ul>
        </div>
        <div className='flex gap-8 md:hidden z-50 items-center'>
          <Link to={'/cart'}><div className='relative w-10 z-50'>
          <ShoppingCart /> <div className='bg-[#138695] z-40 w-5 absolute -top-2 right-1 flex items-center justify-center rounded-full text-white'>{getTotalCartItems()}</div>
            </div></Link>
          {user ? (
            <Link to="/profile" className="text-sm font-medium text-foreground z-50">{user.username}</Link>
          ) : (
            <Link to="/login" className="z-50"><FaRegUser size={20} /></Link>
          )}
          {/* mobile hamburger menu */}
          {
            showMenu ? (
              <HiMenuAlt1 onClick={toggleMenu} className='cursor-pointer transition-all md:hidden z-50' size={30} />
            ) : (
              <HiMenuAlt3 onClick={toggleMenu} className='cursor-pointer transition-all md:hidden z-50' size={30} />
            )
          }
        </div>
      </div>
      <div>
        <ResponsiveMenu showMenu={showMenu} setShowMenu={setShowMenu} />
      </div>
    </div>
  )
}

export default Navbar2
