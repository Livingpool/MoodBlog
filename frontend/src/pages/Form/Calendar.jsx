import { React, useState, useEffect } from "react";
import Calendar from "react-calendar";
import Layout from "../../partials/dashboard/Layout";
import "react-calendar/dist/Calendar.css";
import { Button } from "@material-tailwind/react";
import { Modal } from "@material-ui/core";
import { useUser } from "@clerk/clerk-react";
import axios from 'axios';

export default function CalendarPage() {
  const [date, setDate] = useState(new Date());
  const [highlightedDates, setHighlightedDates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [diaryContentsForSelectedDate, setDiaryContentsForSelectedDate] = useState([]);

  const { user } = useUser();

  const formatDate = (localDate) => {
    const year = localDate.getFullYear();
    const month = (1 + localDate.getMonth()).toString().padStart(2, "0");
    const day = localDate.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    axios.get(`http://localhost:3000/getAllSessions/${user.id}`)
      .then((res) => {
        const diaryDates = res.data.map(entry => entry.createdAt.split('T')[0]);
        setHighlightedDates(diaryDates);
      })
      .catch((err) => {
        console.log("Error fetching diary dates!", err);
      });
  }, [user.id]);

  function tileClass({ date, view }) {
    if (view === 'month' && highlightedDates.includes(formatDate(date))) {
      return 'highlighted-date';
    }
  }

  const searchDiaryHandler = (user, selectedDate) => {
    setLoading(true);
    axios.get(`http://localhost:3000/getAllSessions/${user.id}`)
      .then((res) => {
        const filteredDiaries = res.data.filter(entry => entry.createdAt.includes(selectedDate));
        setDiaryContentsForSelectedDate(filteredDiaries);
        setIsModalOpen(true);
        setLoading(false);
      }).catch((err) => {
        console.log("Search diary error!", err);
        setLoading(false);
      })
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setDiaryContentsForSelectedDate([]); // Clear diary content when closing the modal
  };

  return (
    <Layout>
      <div className="p-20 flex flex-col justify-center items-center">
        <div className='pt-8 pb-4 font-medium text-lg'>選擇日期，回顧以前的日記吧</div>
        <Calendar 
          onChange={setDate} 
          value={date}
          tileClassName={tileClass}
        />
        <div className="flex items-center mt-10">
          <Button
            className="mr-4"
            onClick={() => searchDiaryHandler(user, formatDate(date))}
          >
            查看日記
          </Button>
          <Modal
            open={isModalOpen}
            onClose={closeModal}
          >
            <div className="overflow-y-auto modal-content p-4 bg-white rounded-lg shadow-md w-1/2 mx-auto h-2/3 my-12">
              <div className="text-xl font-bold mb-4">{formatDate(date)} Diary Content</div>
              {diaryContentsForSelectedDate
                .filter(entry => entry.responseAi) // 過濾具有回复的日記
                .map((entry, index) => (
                  <div key={index} className="p-4 mb-4 border border-gray-300 rounded-lg">
                    <p className="text-gray-700">
                      {Array.isArray(entry.content)
                        ? entry.content[entry.content.length - 1]
                        : entry.content}
                    </p>
                    <p className="text-amber-600 font-semibold mt-2">
                      {entry.responseAi}
                    </p>
                  </div>
                ))
              }

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
