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
  const [loading, setLoading] = useState(false);



  // Clerk user.
  const { user } = useUser();

  // Format current date.
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString();

  // console.log("diaryId: ", diaryId);

  const handleNavLinkClick = async () => {
    // console.log("user:", user);
    // 在這裡執行 API 請求
    const requestData = {
      userId: user.id // 使用 Clerk 提供的使用者 ID
    };

    // 在這裡執行 API 請求
    console.log("userId:", requestData);
    fetch('http://localhost:3000/createDiary', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestData)
    })
      .then(response => response.json())
      .then(data => {
        // 在這裡處理 API 回應
        console.log("dataInHandle", data);
      })
      .catch(error => {
        console.error('API 呼叫失敗：', error);
      });
  };


  const UpdateSession = (content) => {
    console.log("content: ", content);
    if (diaryId) {
      console.log("diaryid: ", diaryId);
      axios.put(`http://localhost:3000/updateDiaryResponseAi/${diaryId}`, {
        content: content
      })
        .then((res) => {
          console.log("Session data: ", res.data);
          setDiaryId(res.data.Diaryid);
        }).catch((err) => {
          console.log("Create session error: ", err);
        });
    } else {
      console.log("diaryId is null or undefined");
    }
  };




  // 處理AI chat API call.
  const AIHandler = (diaryId, user, content, createdAt) => {
    setLoading(true);
    console.log(diaryId);
    console.log(user);
    console.log(content);
    console.log(createdAt);
    axios.post(`http://localhost:3000/getAiResponse/:diaryId`, {
      user: user.id,
      content: content,
      createdAt: createdAt,
      diaryId: diaryId,
    }).then((res) => {
      console.log("AI repsonse: ", res.data);
      setResponseContent(res.data.message);
      setLoading(false);
    }).catch((err) => {
      console.log("AI Handler error!")
      console.log(err);
      setLoading(false);
    })
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
              UpdateSession(text);
            }} className="text-pink-100 font-semibold rounded-lg bg-orange-600/95
            hover:bg-amber-600 active:bg-orange-600 focus:outline-none focus:ring focus:ring-orange-600/75" style={{ height: '40px' }}>
              儲存
            </button>
            {responseContent && (
              <div className="justify-item-center self-stretch flex flex-col w-[89px]">
                <button
                  className="mt-2 text-pink-100 font-semibold rounded-lg bg-orange-600/95 hover:bg-amber-600 active:bg-orange-600 focus:outline-none focus:ring focus:ring-orange-600/75"
                  style={{ height: '40px' }}
                  onClick={() => AIHandler(diaryId, user, text)}
                >
                  AI 聊聊
                </button>
              </div>
            )}

          </div>
        </div>
        {responseContent && (
          <div
            maxLength={300}
            style={{
              width: 800,
              height: 200,
              marginBottom: 18,
              border: "1px solid #ccc",
              padding: "10px",
              borderRadius: "7px", // Use 'borderRadius' for inline styles
              backgroundColor: "white",
              color: "black", // Specify the text color
              wordWrap: 'break-word', // This allows long words to break and wrap
              overflow: 'auto',
            }}>
            {loading ? "Loading..." : (responseContent ? responseContent : "Some error occurred:(")}
          </div>
        )}
      </div>
    </Layout >
  );
}
