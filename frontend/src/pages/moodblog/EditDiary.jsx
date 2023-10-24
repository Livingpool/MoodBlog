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
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {/* 標題 */}
        <div className='pt-8 pb-4 font-medium text-lg'>撰寫日記 - {formattedDate}</div>

        {/* 輸入框 */}
        <TextArea
          showCount
          maxLength={300}
          style={{
            width: 800,
            height: 200,
            marginBottom: 18,
          }}
          onChange={(e) => setText(e.target.value)}
          placeholder="今天發生了什麼呢？"
        />
        <div className="justify-between items-start self-center flex w-[228px] max-w-full gap-5 mt-12 mb-20 px-5">
          <div className="self-stretch flex flex-col w-[89px]">
            <button onClick={() => {
              handleNavLinkClick();
            }} className="text-pink-100 font-semibold rounded-lg bg-orange-600/95
            hover:bg-amber-600 active:bg-orange-600 focus:outline-none focus:ring focus:ring-orange-600/75" style={{ height: '40px' }}>
              儲存
            </button>
            {responseContent && (
              <div className="justify-item-center self-stretch flex flex-col w-[89px]">
                <button
                  className="mt-2 text-pink-100 font-semibold rounded-lg bg-orange-600/95 hover:bg-amber-600 active:bg-orange-600 focus:outline-none focus:ring focus:ring-orange-600/75"
                  style={{ height: '40px' }}
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
              border: "1px solid #ccc",
              padding: "10px",
              borderRadius: "7px",
              backgroundColor: "white",
              color: "black",
              wordWrap: "break-word",
              overflow: "auto",
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
              border: "1px solid #ccc",
              padding: "10px",
              borderRadius: "7px",
              backgroundColor: "white",
              color: "black",
              wordWrap: "break-word",
              overflow: "auto",
            }}
          >
            {aiResponseContent}
          </div>
        )}


      </div>
    </Layout >
  );
}
