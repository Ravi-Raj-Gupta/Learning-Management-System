import { assets } from '@/assets/assets'
import React from 'react'
import { useClerk, useUser } from '@clerk/clerk-react'
import { useNavigate } from 'react-router-dom'

const CallToAction = () => {
  const { openSignIn } = useClerk()
  const { user } = useUser()
  const navigate = useNavigate()

  const handleGetStarted = async () => {
    if (user) {
      navigate('/course-list')
      return
    }

    await openSignIn?.({
      forceRedirectUrl: '/course-list',
    })
  }

  return (
    <div className='flex flex-col items-center gap-4 pt-10 pb-24 px-8 md:px-0 '>
      <h1 className='text-xl md:text-4xl text-gray-800 font-semibold'>Learn anything, anytime, anywhere</h1>
      <p className='text-gray-500 sm:text-sm'>r cupidatat consectetur sit cillum anim id veniam aliqua proident excepteur commodo do ea.</p>
      <div className='flex items-center font-medium gap-6 mt-4'>
         <button type="button" onClick={handleGetStarted} className='px-10 py-3 rounded-md text-white bg-blue-600'>Get Started</button>
         <button type="button" onClick={() => navigate('/course-list')} className='flex items-center gap-2'>Learn More <img src = {assets.arrow_icon
         } alt="arrow_icon" /></button>
      </div>
    </div>
  )
}

export default CallToAction
