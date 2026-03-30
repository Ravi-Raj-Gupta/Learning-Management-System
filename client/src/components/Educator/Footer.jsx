import { assets } from '@/assets/assets'
import React from 'react'

const Footer = () => {
  return (
    <footer className = "flex w-full flex-col-reverse items-center justify-between gap-4 border-t px-4 py-4 text-left sm:px-8 md:flex-row">
      <div className='flex flex-wrap items-center justify-center gap-3 md:justify-start'>
         <img src={assets.logo} className='hidden md:block h-7 w-px bg-gray-500' alt="" />
         <div className='hidden md:block h-7 w-px bg-gray-500/60'></div>
         <p className='text-center text-xs text-gray-500 md:text-sm'>
            Copyright 2026 @ Ravi Raj. All Rights Reserved.
         </p>
      </div>
      
      <div className='flex items-center gap-3'>
         <a href="#">
            <img src={assets.facebook_icon} alt="facebook_icon" />
         </a>
         <a href="#">
            <img src={assets.twitter_icon} alt="twitter_icon" />
         </a>
         <a href="#">
            <img src={assets.instagram_icon} alt="instagram_icon" />
         </a>
      </div>
    </footer>
  )
}

export default Footer
