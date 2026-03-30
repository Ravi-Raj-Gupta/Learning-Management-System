import React from "react";
import { Rating as StarRating } from "react-simple-star-rating";

const Rating = ({
   title = "Rate this course",
   subtitle = "Your rating helps improve the learning experience.",
   initialValue = 0,
   onRate,
}) => {
   return (
      <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
         <p className="text-lg font-semibold text-gray-800">{title}</p>
         <p className="mt-1 text-sm text-gray-500">{subtitle}</p>
         <div className="mt-3">
            <StarRating
               onClick={onRate}
               initialValue={initialValue}
               allowFraction={false}
               size={28}
               SVGstyle={{ display: "inline-block" }}
            />
         </div>
      </div>
   );
};

export default Rating;
