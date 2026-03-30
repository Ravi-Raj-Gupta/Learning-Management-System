import { assets } from '@/assets/assets'
import { AppContext } from '@/Context/AppContext'
import React, { useContext } from 'react'
import { Link } from 'react-router-dom'

const CourseCard = ({course}) => {

   const {currency, calculateRating} = useContext(AppContext)
   

  return (
    <Link to={'/course/' + course._id} onClick={() => scrollTo(0,0)} className='overflow-hidden rounded-lg border border-gray-500/30 pb-6 transition hover:-translate-y-1 hover:shadow-md'>
      <img src={course.courseThumbnail} className='aspect-video w-full object-cover' alt="" />
      <div className='p-3 text-left'>
         <h3 className='line-clamp-2 text-base font-semibold'>{course.courseTitle}</h3>
         <p className='truncate text-sm text-gray-500'>{course.educator.name}</p>
         <div className='flex flex-wrap items-center gap-2'>
            <p>{calculateRating(course)}</p>
            <div className='flex'>
               {[...Array(5)].map((_, i) => (<img className='w-3.5 h-3.5' key={i} src={i<Math.floor(calculateRating(course)) ? assets.star : assets.star_blank } alt='' />)
            )}
            </div>
            <p className='text-gray-500'>{course.courseRatings.length}</p>
         </div>
         <p className='mt-2 text-base font-semibold text-gray-800'>{currency}{(course.coursePrice - course.discount * course.coursePrice / 100).toFixed(2) }</p>
      </div>
    </Link>
  )
}

export default CourseCard
