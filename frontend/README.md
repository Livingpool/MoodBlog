# README

Please run below in terminal after you pull the repo

    npm run dev


(Please merge this code with your original assignment first, so that the Chart and Chat pages can display correctly!)  
  
In your team project, it's recommended to make modifications directly from this code to avoid going through too complicated an environment setup. You can replace the homepage, add the pages you want in `App.js`, and in `/zoo`, you can see that this codebase has added many usable components. You can refer to the usage of these components and copy them to your own project. If you have any questions, please ask ChatGPT and make sure you understand the usage of the Component correctly!

***
Chloe: 
I've redesigned the sitemap. On the homepage, users will find two links side by side. They have the option to visit either the EditDiary page or the Calendar page to access their previous diaries. In the EditDiary page, I've introduced an input section where users can type in their diary entries. Following that, they can click the "AI聊聊" button to receive feedback from the AI. Alternatively, by clicking the "儲存" button, their diary content will be saved. 
I guess next step would be integrating the APIs with the frontend.
***
Jenny: So far i create three pages in /pages/moodblog, you can first go App.jsx to see i add the new link to connect the pages i created, 
Route exact path="/" element={<Welcome />} 
Route exact path="/new" element={<Newpage />} 
Route exact path="/aichat" element={<Ai />} 
so after you successfully run the code (npm run dev), you can try to modify the link into http://localhost:5173/new or other route.
Sorry i only show the ugly UI but not work on the navigate part, i know there are still a lot of things to be done. You can first work on it then tell me if you need any help. 
Btw, there are so many components in this file I think we can use it. # Moodblog_frontend
 
