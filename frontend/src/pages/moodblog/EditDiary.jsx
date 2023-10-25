import { Input } from 'antd';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Layout from "../../partials/dashboard/Layout";
import { useUser } from "@clerk/clerk-react";
import axios from 'axios';

export default function EditDiary() {
  const { TextArea } = Input;
  const [text, setText] = useState("")
  const [data, setData] = useState(null)
  const [diaryId, setDiaryId] = useState(null);
  const [responseContent, setResponseContent] = useState(null);
  const [aiResponseContent, setAIResponseContent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [diaryCreatedToday, setDiaryCreatedToday] = useState(false); 


  // Clerk user.
  const { user } = useUser();

  // Format current date.
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString();

  // console.log("diaryId: ", diaryId);

  const handleNavLinkClick = async () => {
    if (diaryCreatedToday) {
      // 如果已经创建了今天的日记，只更新会话
      UpdateSession(diaryId, text);
    } else {
      // 否则，创建新的日记
      const requestData = {
        userId: user.id
      };
  
      fetch('http://localhost:3000/createDiary', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestData)
      })
        .then(response => response.json())
        .then(data => {
          console.log("createDiaryData", data);
          setDiaryCreatedToday(true); // 设置为已创建今天的日记
          setDiaryId(data.diaryId);
          UpdateSession(data.diaryId, text);
        })
        .catch(error => {
          console.error('API 呼叫失敗：', error);
        });
    }
  };
  


  const UpdateSession = (diaryId, content) => {
    console.log("content: ", content);
    console.log("diaryId: ", diaryId);
    if (diaryId) {
      axios.put(`http://localhost:3000/updateDiary/${diaryId}`, {
        content: content
      })
        .then((res) => {
          console.log("Session data: ", res.data);
          setDiaryId(res.data.diaryId);
          setResponseContent(res.data.content);
        })
        .catch((err) => {
          console.log("Update session error: ", err);
        });
    } else {
      console.log("diaryId is null or undefined");
    }
  };
  




  // 處理AI chat API call.
  const AIHandler = (content) => {
    setLoading(true); // set loading as true
  
    console.log("user:", user.id);
    console.log("content:", content);
    console.log("diaryId:", diaryId);
    const url = `http://localhost:3000/getAiResponse/${diaryId}`;
    
    axios.post(url, {
      userId: user.id,
      content: content,
    })
    .then((res) => {
      console.log("AI response: ", res.data);
      setAIResponseContent(res.data.message); // set aiResponseContent
      setLoading(false); // after finishing loading, set the loading as false
    })
    .catch((err) => {
      console.log("AI Handler error:", err);
      setLoading(false); // after finishing loading, set the loading as false
    });
  }; 
  
  
  
  
  
  

  

  // useEffect(() => {
  //   if (!user) return;
  //   console.log("kkk");
  //   handleNavLinkClick();
  // }, [user]);
  return (
<Layout>
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: "#FFFAF0", width: '100%', minHeight: '100vh', padding: '20px 0' }}>
        <div className='pt-8 pb-4 font-semibold text-xl' style={{ color: "#FF8C00" }}>撰寫日記 - {formattedDate}</div>
        <TextArea
    showCount
    maxLength={300}
    style={{
        width: 800,
        height: 200,
        marginBottom: 18,
        backgroundColor: "#FFF8DC", 
        borderColor: "#FFEBAD", 
        color: "#6b442a", 
        borderRadius: '15px', 
        boxShadow: '0 4px 6px rgba(0,0,0, 0.1)',
        padding: '15px', 
        transition: 'box-shadow 0.3s ease-in-out',
        fontSize: '1rem' 
    }}
    onChange={(e) => setText(e.target.value)}
    placeholder="今天發生了什麼呢？"
    onFocus={() => {
   
        this.style.boxShadow = '0 6px 8px rgba(0,0,0, 0.15)';
    }}
    onBlur={() => {
      this.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    }}
/>

        <div className="flex flex-col w-full items-center justify-center gap-5 mt-12 mb-20 px-5">
            <div className="flex items-center gap-5">
                <button onClick={() => {
                    handleNavLinkClick();
                }} className="text-white font-semibold text-xl rounded-lg shadow-md hover:shadow-lg transform transition-transform duration-150
                hover:bg-amber-600 active:bg-orange-600 focus:outline-none focus:ring focus:ring-orange-600/75" style={{ height: '55px', width: '60px', backgroundColor: "#FF6347", borderColor: "#FF4500" }}>
                    儲存
                </button>
                {responseContent && (
                    <div className="flex items-center gap-5">
                        <button
                            className="px-1 py-1 text-white font-semibold text-xl rounded-lg shadow-md hover:shadow-lg transform transition-transform duration-150"
                            style={{ height: '55px', width: '70px', backgroundColor: "#FF6347", borderColor: "#FF4500" }}
                            onClick={() => AIHandler(text)}
                        >
                            AI 聊聊
                        </button>
                    </div>
                )}
            </div>
        </div>

        {loading && (
            <div
                style={{
                  width: 800,
                  height: 200,
                  marginBottom: 18,
                  backgroundColor: "#FFF8DC", 
                  borderColor: "#FFEBAD", 
                  color: "#6b442a", 
                  borderRadius: '15px', 
                  boxShadow: '0 4px 6px rgba(0,0,0, 0.1)',
                  padding: '15px', 
                  transition: 'box-shadow 0.3s ease-in-out',
                  fontSize: '1rem' 
                }}
            >
                Loading...
            </div>
        )}

        {!loading && aiResponseContent && (
            <div
                style={{
                  width: 800,
                  height: 200,
                  marginBottom: 18,
                  backgroundColor: "#FFF8DC", 
                  borderColor: "#FFEBAD", 
                  color: "#6b442a", 
                  borderRadius: '15px', 
                  boxShadow: '0 4px 6px rgba(0,0,0, 0.1)',
                  padding: '15px', 
                  transition: 'box-shadow 0.3s ease-in-out',
                  fontSize: '1rem' 
                }}
            >
                {aiResponseContent}
            </div>
        )}

    </div>
</Layout>

  );
}
