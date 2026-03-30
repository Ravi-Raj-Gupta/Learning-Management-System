import { assets } from '@/assets/assets'
import { AppContext } from '@/Context/AppContext';
import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
   const {isEducator} = useContext(AppContext)

   const menuitems = [
      {name : 'Dashboard', path:'/educator', icon : assets.home_icon},
      {name : 'Add Course', path:'/educator/add-course', icon : assets.add_icon},
      {name : 'My Courses', path:'/educator/my-courses', icon : assets.my_course_icon},
      {name : 'Student Enrolled', path:'/educator/student-enrolled', icon : assets.person_tick_icon},
   ];

  return isEducator && (

    <div className='w-full border-b border-gray-500 py-2 text-base md:min-h-screen md:w-64 md:border-b-0 md:border-r'>
      <div className='flex overflow-x-auto md:flex-col'>
      {menuitems.map((item) =>(
         <NavLink className={({isActive}) => `flex min-w-fit items-center justify-center gap-1.5 px-3 py-2 text-xs sm:px-4 sm:text-sm md:flex-row md:justify-start md:gap-2 md:px-10 md:py-3.5 ${isActive ? 'border-b-[3px] border-indigo-600/90 bg-indigo-100 md:border-b-0 md:border-r-[6px]' : 'border-b-[3px] border-transparent hover:bg-gray-100/90 md:border-r-[6px] md:border-white md:hover:border-gray-100/90'}` } to={item.path} key={item.name} end = {item.path === '/educator'}>
            <img src={item.icon} alt="" className='h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6'/>
            <p className='text-center'>{item.name}</p>
         </NavLink>
      ))}
      </div>
    </div>
  )
}

export default Sidebar
