import { assets } from '@/assets/assets'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const SearchBar = ({data}) => {

   const navigate = useNavigate()
   const [input , setInput] = useState(data ? data : '')

   const onSearchHandler = (e) => {
      e.preventDefault();
      navigate('/course-list/' + input)
   }
  return (
      <form onSubmit={onSearchHandler} action="" className='flex w-full max-w-xl flex-col gap-2 rounded border border-gray-500/20 bg-white p-2 sm:h-14 sm:flex-row sm:items-center sm:gap-0 sm:p-0'>
         <div className='flex flex-1 items-center'>
            <img src={assets.search_icon} alt="search icon" className='w-10 px-3 md:w-auto' />
            <input onChange={e => setInput(e.target.value)} value={input} type="text" placeholder='Search for Courses' className='h-full w-full min-w-0 outline-none text-sm text-gray-500/80 sm:text-base'/>
         </div>
         <button type='submit' className='self-end rounded bg-blue-600 px-5 py-2 text-white sm:mx-1 sm:self-auto sm:px-8 sm:py-3 md:px-10'> Search</button>
      </form>
  )
}

export default SearchBar
