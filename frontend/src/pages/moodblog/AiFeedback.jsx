// import { Box, Typography } from "@mui/material";
import { Input } from 'antd';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import Layout from "../../partials/dashboard/Layout";
import axios from 'axios';

export default function MoodBlogComponent() {

  const { sessionId, user, content } = useParams();
  const [responseContent, setResponseContent] = useState(null);
  const [loading, setLoading] = useState(false);

  console.log("user:", user);

  // 初始化需要的states.
  // const { TextArea } = Input;
  // const [userInput, setUserInput] = useState('');
  // const [responseContent, setResponseContent] = useState(null);

  // Format current date.
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString();

  // 處理使用者input.
  // const onChange = (e) => {
  //   setUserInput(e.target.value);
  // };

  // 處理AI chat API call.
  const AIHandler = (sessionId, user, content) => {
    setLoading(true);
    console.log(sessionId);
    console.log(user);
    console.log(content);
    axios.post(`http://localhost:3000/getAIresponse/sessions/${sessionId}/content`, {
      user: user,
      content: content
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

  return (
      <Layout>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {/* 標題 */}
        <div className='pt-8 pb-4 font-medium text-lg'>日記想對你說 - {formattedDate}</div>
        
        {/* 輸入框 */}
        <div maxLength={300}
          style={{
            width: 800,
            height: 200,
            marginBottom: 18,
            border: "1px solid #ccc",
            padding: "10px",
            borderRadius: "7px", // Use 'borderRadius' for inline styles
            backgroundColor: "white",
            color: "black" // Specify the text color
          }}>
          {loading ? "Loading..." : (responseContent ? responseContent : "Some error occurred:(")}
        </div>

        <div className="justify-between items-start self-center flex max-w-full gap-5 mt-12 mb-20 px-5">

              <div className="justify-between self-center flex flex-col w-[89px]">
                  <button onClick = {() => AIHandler(sessionId, user, content)} className="text-pink-100 font-semibold rounded-lg bg-orange-600/95  hover:bg-amber-600 active:bg-orange-600 focus:outline-none focus:ring focus:ring-orange-600/75" style={{ height: '40px'}}>
                      聽聽AI的想法
                  </button>
              
              </div>
          </div>

        
      </div>
    </Layout>
  );
}



