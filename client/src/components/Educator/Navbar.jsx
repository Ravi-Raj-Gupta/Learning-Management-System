import { assets } from '@/assets/assets'
import { UserButton, useUser } from '@clerk/clerk-react'
import React from 'react'
import { Link } from 'react-router-dom'

const Navbar  = () => {
   const {user} = useUser()
  return (
    <div className='flex items-center justify-between gap-2 border-b border-gray-500 px-3 py-2 sm:gap-3 sm:px-4 md:px-8 md:py-3'>
      <Link to='/'>
      <img src={assets.logo} alt="logo" className='w-24 sm:w-28 lg:w-32'/>

      </Link>
      <div className='flex items-center gap-2 text-xs text-gray-500 sm:gap-3 sm:text-sm md:text-base'>
         <p className='hidden max-w-[120px] truncate sm:block md:max-w-[160px]'>Hi ! {user ? user.fullName : 'developers'}</p>
         {user ? <UserButton/> : <img src={assets.profile_img} alt="" className='h-8 w-8 rounded-full object-cover sm:h-9 sm:w-9' /> }
      </div>
    </div>
  )
}

export default Navbar 
