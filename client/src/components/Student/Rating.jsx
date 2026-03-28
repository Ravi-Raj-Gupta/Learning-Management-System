import React, { useState } from 'react'

const Rating = () => {
  return (
   const [Rating, setRating] = useState(initialRaiting || 0)
   
    <div>
      {Array.from({length:5, (_, index) => {
         const starValue = index + 1 ;
         return(
            <span className={`text-xl sm:text-2xl cursor-pointer transition-colors ${starValue <= rating}`} key={index}>

            </span>
         )
      }})}
    </div>
  )
}

export default Rating