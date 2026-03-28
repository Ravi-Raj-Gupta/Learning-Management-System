import { dummyStudentEnrolled } from "@/assets/assets";
import Loading from "@/components/Student/Loading";
import React, { useEffect, useState } from "react";

const StudentEnrolled = () => {
   const [enrolledStudents, setEnrolledStudents] = useState(null);

   const fetchEnrolledStudents = async () => {
      setEnrolledStudents(dummyStudentEnrolled);
   };

   useEffect(() => {
      fetchEnrolledStudents();
   }, []);

   return enrolledStudents ? (
      <div>
         <div className="min-h-screen flex flex-col items-start justify-between md:p-8 md:pb-0 p-4 pt-8 pb-0">
  <div className="flex flex-col items-center max-w-4xl w-full overflow-hidden rounded-md bg-white border border-gray-200">

    <table className="w-full table-auto">
      
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
   ) : (
      <Loading />
   );
};

export default StudentEnrolled;
