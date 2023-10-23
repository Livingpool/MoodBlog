import { React, useState, useEffect } from "react";
import Calendar from "react-calendar";
import Layout from "../../partials/dashboard/Layout";
import "react-calendar/dist/Calendar.css";
import { Button, Typography } from "@material-tailwind/react";
import { Modal } from "@material-ui/core";
import Swal from "sweetalert2";
import { useUser } from "@clerk/clerk-react";
import axios from 'axios';


export default function CalendarPage() {
  const [date, setDate] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const [responseContent, setResponseContent] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [diaryContentsForSelectedDate, setDiaryContentsForSelectedDate] = useState([]);
  
  // Clerk user.
  const { user } = useUser();

  // 整理日期格式
  const formatDate = (localDate) => {
    const year = localDate.getFullYear();
    const month = (1 + localDate.getMonth()).toString().padStart(2, "0");
    const day = localDate.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  
  const searchDiaryHandler = (user, selectedDate) => {
    console.log("user: ", user.id)
    setLoading(true)
    axios.get(`http://localhost:3000/getAllSessions/${user.id}`)
    .then((res) => {
      console.log("All diaries: ",res.data)
      const filteredDiaries = res.data.filter(entry => entry.createdAt.includes(selectedDate))
      // console.log(filteredDiaries)
      // // Extract the diary IDs from the filtered entries.
      // const diaryContents = filteredDiaries.map(entry => entry.content)
      // console.log(typeof(diaryIds))
      setDiaryContentsForSelectedDate(filteredDiaries)
      console.log("date:", selectedDate, "diary Contents: ", filteredDiaries)
      setIsModalOpen(true)
      setLoading(false)
    }).catch((err) => {
      console.log("Search diary error!")
      console.log(err)
      setLoading(false)
    })
  };
  useEffect(() => {
    console.log("Diary IDs updated:", diaryContentsForSelectedDate);
  }, [diaryContentsForSelectedDate])

  const closeModal = () => {
    setIsModalOpen(false);
    setDiaryContentsForSelectedDate([]); // Clear diary content when closing the modal
  }
  return (
    <Layout>
      <div className="p-20 flex flex-col justify-center items-center">
        {/* 標題 */}
        <div className='pt-8 pb-4 font-medium text-lg'>選擇日期，回顧以前的日記吧</div>
        <Calendar onChange={setDate} value={date} />
        <div className="flex items-center mt-10">
          <Button
            className="mr-4"
            
            onClick={() => searchDiaryHandler(user, formatDate(date))
           
              // Swal.fire({
              //   title: "似乎沒有留下日記呢",
              //   text: `你選擇的日期為 ${formatDate(date)}`
              // })
            }
          >
            查看日記
          </Button> 
          <Modal
            open={isModalOpen}
            onClose={closeModal}
          >
            <div className="modal-content p-4 bg-white rounded-lg shadow-md w-1/2 mx-auto">
              {/* Header */}
              <div className="text-xl font-bold mb-4">{formatDate(date)} Diary Content</div>

              {/* {diaryContentsForSelectedDate.map((diary, index) => (
                <div key={index} className="p-4 mb-4 border border-gray-300 rounded-lg">
                  <p className="text-gray-700">{diary}</p>
                </div>
              ))} */}
              {diaryContentsForSelectedDate.map((entry, index) => (
                <div key={index} className="p-4 mb-4 border border-gray-300 rounded-lg">
                  <p className="text-gray-700">{entry.content}</p>
                  {entry.responseAi && (
                    <p className="text-amber-600 font-semibold mt-2">Response AI: {entry.responseAi}</p>
                  )}
                </div>
              ))}

              
              {/* Close Button */}
              <div className="mt-4 text-right">
                <button onClick={closeModal} className="text-blue-500 hover:text-blue-700">Close</button>
              </div>
              </div>
          </Modal>
        </div>
      </div>
      
  
    </Layout>
  );
}
