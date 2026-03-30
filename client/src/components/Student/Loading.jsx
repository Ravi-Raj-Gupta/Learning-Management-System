import { AppContext } from '@/Context/AppContext'
import axios from 'axios'
import React, { useContext, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const Loading = () => {

   const {path} = useParams()
   const { backendUrl, getToken, fetchUserEnrolledCourses } = useContext(AppContext)

   const navigate = useNavigate()

   useEffect(() => {
      const completeFlow = async () => {
         if (!path) {
            return
         }

         const params = new URLSearchParams(window.location.search)
         const sessionId = params.get("session_id")

         if (sessionId) {
            try {
               const token = await getToken()
               await axios.post(
                  `${backendUrl}/api/user/verify-purchase`,
                  { sessionId },
                  {
                     headers: {
                        Authorization: `Bearer ${token}`,
                     },
                  }
               )
               await fetchUserEnrolledCourses()
            } catch (error) {
               console.error(error)
            }
         }

         const timer = setTimeout(() => {
            navigate(`/${path}`)
         }, 2000)

         return () => clearTimeout(timer)
      }

      const cleanupPromise = completeFlow()
      return () => {
         Promise.resolve(cleanupPromise).then((cleanup) => cleanup && cleanup())
      }
   }, [path, backendUrl, getToken, fetchUserEnrolledCourses, navigate])

  return (
    <div className='w-16 sm:w-20 aspect-square border-4 border-gray-300 border-t-4 border-t-blue-400 rounded-full animate-spin'></div>
  )
}

export default Loading
