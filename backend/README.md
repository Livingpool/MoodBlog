## Create Diary API ##
### POST `http://localhost:3000/createDiary` ###
Request:   
{        
&emsp;&emsp;userId: "user_1234567"    
}  
Response: {  
&emsp;&emsp;"diaryId":"65326ade38d1122f7f46528e",  
&emsp;&emsp;"userId":"user_1234567",  
&emsp;&emsp;"createdAt":"2023-10-20T11:56:14.693Z",  
&emsp;&emsp;"content":[]  
}

## Update Diary Content API ##
### PUT `http://localhost:3000/updateDiary/:diaryId` ###
Request:       
{          
&emsp;&emsp;content: "我今天過得不錯！公館夜市阿二鹹水雞超好吃推推～"    
}  
Response: {      
&emsp;&emsp;"diaryId":"65326ade38d1122f7f46528e",      
&emsp;&emsp;"userId":"user_1234567",        
&emsp;&emsp;"content":["我今天過得不錯！公館夜市阿二鹹水雞超好吃推推～",      
&emsp;&emsp;&emsp;&emsp;"我今天過得不錯！公館夜市阿二鹹水雞超好吃推推～"],      
&emsp;&emsp;"createdAt":"2023-10-20T11:56:14.693Z"   
&emsp;&emsp;"responseAi":"假的AI回覆"  
}   

## Update Diary AI response (replace existing response) API ##
### PUT `http://localhost:3000/updateDiaryResponseAi/:diaryId` ###
Request:       
{          
&emsp;&emsp;content: "假的AI回覆"    
}  
Response:   
{  
&emsp;&emsp;"diaryId":"65326ade38d1122f7f46528e",  
&emsp;&emsp;"userId":"user_1234567",  
&emsp;&emsp;"content":["我今天過得不錯！公館夜市阿二鹹水雞超好吃推推～",  
&emsp;&emsp;&emsp;&emsp;"我今天過得不錯！公館夜市阿二鹹水雞超好吃推推～"],  
&emsp;&emsp;"createdAt":"2023-10-20T11:56:14.693Z",  
&emsp;&emsp;"responseAi":"假的AI回覆"  
}

## Find all diaries by userId API ##
### GET `http://localhost:3000/getAllSessions/:userId` ###
Request:&emsp;&emsp;none  
Response:[      
{  
&emsp;&emsp;"diaryId":"653269faa5084b36852cd490",  
&emsp;&emsp;"userId":"user_1234567",  
&emsp;&emsp;"createdAt":"2023-10-20T11:52:26.938Z",  
&emsp;&emsp;"content":[]  
},  
{  
&emsp;&emsp;"diaryId":"65326ade38d1122f7f46528e",  
&emsp;&emsp;"userId":"user_1234567",  
&emsp;&emsp;"responseAi":"假的AI回覆",  
&emsp;&emsp;"createdAt":"2023-10-20T11:56:14.693Z",  
&emsp;&emsp;"content":["我今天過得不錯！公館夜市阿二鹹水雞超好吃推推～","我今天過得不錯！公館夜市阿二鹹水雞超好吃推推～"]  
},    
{    
&emsp;&emsp;"diaryId":"65327a4b59f465634bd7ac57",  
&emsp;&emsp;"userId":"user_1234567",    
&emsp;&emsp;"responseAi":"情緒評分：5分\n\n建議：很高興聽到你今天情緒很棒！繼續保持這種積極的情緒對於你的心理健康和幸福感非常重要。以下是一些建議，以幫助你保持這種正面的情緒和應對可能的困難：\n\n1. 肯定自己：記得每
  給自己一些正面的肯定，讓自己感到被接納和重視。這有助於增強自尊和自信。\n\n2. 專注於當下：當你情緒很",  
&emsp;&emsp;"createdAt":"2023-10-20T13:02:03.681Z",   
&emsp;&emsp;"content":["我今天很棒！"]  
}  
]

## Get AI Response from OpenAI API ##
### POST `http://localhost:3000/getAiResponse/:diaryId` ###
Request:       
{          
&emsp;&emsp;"userId":"user_1234567"  
&emsp;&emsp;content:"我今天很棒！"    
}    
Response:  
{  
&emsp;&emsp;"message":"情緒評分：5分\n\n建議：很高興聽到你今天情緒很棒！繼續保持這種積極的情緒對於你的心理健康和幸福感非常重要。以下是一些建議，以幫助你保持這種正面的情緒和應對可能的困難：\n\n1. 肯定自己：記得每天給己一些正面的肯定，讓自己感到被接納和重視。這有助於增強自尊和自信。\n\n2. 專注於當下：當你情緒很"  
}


    
