import Loading from "@/components/Student/Loading";
import { AppContext } from "@/Context/AppContext";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

const StudentEnrolled = () => {
   const [enrolledStudents, setEnrolledStudents] = useState(null);
   const {backendUrl, getToken, isEducator} = useContext(AppContext)


   const fetchEnrolledStudents = async () => {
   try {
      const token = await getToken()

      const {data} = await axios.get(backendUrl + '/api/educator/enrolled-students', {headers : {Authorization : `Bearer ${token}`}})
      if(data.success){
         setEnrolledStudents(data.enrolledStudents.reverse())
      }
      else{
         toast.error(data.message)
      }

   } catch (error) {
      toast.error(error.message)
   }   
   };

   useEffect(() => {
      if(isEducator){

         fetchEnrolledStudents();
      }
   }, [isEducator]);

   return enrolledStudents ? (
      <div>
         <div className="min-h-screen p-4 pt-8 md:p-8 md:pb-0">
  <div className="w-full max-w-4xl overflow-hidden rounded-md border border-gray-200 bg-white">
    <div className="overflow-x-auto">
    <table className="w-full min-w-[640px] table-auto">
      
      {/* TABLE HEAD */}
      <thead className="text-gray-900 border-b border-gray-200 text-sm text-left">
        <tr>
          <th className="px-4 py-3 font-semibold hidden sm:table-cell">
            #
          </th>
          <th className="px-4 py-3 font-semibold">
            Student Name
          </th>
          <th className="px-4 py-3 font-semibold">
            Course Title
          </th>
          <th className="px-4 py-3 font-semibold hidden sm:table-cell">
            Date
          </th>
        </tr>
      </thead>

      {/* TABLE BODY */}
      <tbody className="text-sm text-gray-600">
        {enrolledStudents.map((item, index) => (
          <tr key={index} className="border-b border-gray-200">

            {/* INDEX */}
            <td className="px-4 py-3 hidden sm:table-cell">
              {index + 1}
            </td>

            {/* STUDENT */}
            <td className="px-4 py-3">
              <div className="flex items-center gap-3">
                <img
                  src={item?.student?.imageUrl}
                  alt="student"
                  className="w-9 h-9 rounded-full object-cover"
                />
                <span className="truncate">
                  {item?.student?.name}
                </span>
              </div>
            </td>

            {/* COURSE */}
            <td className="px-4 py-3 truncate">
              {item?.courseTitle}
            </td>

            {/* DATE */}
            <td className="px-4 py-3 hidden sm:table-cell">
              {item?.purchaseDate
                ? new Date(item.purchaseDate).toLocaleDateString()
                : "N/A"}
            </td>

          </tr>
        ))}
      </tbody>
    </table>
    </div>
  </div>
</div>
      </div>
   ) : (
      <Loading />
   );
};

export default StudentEnrolled;
