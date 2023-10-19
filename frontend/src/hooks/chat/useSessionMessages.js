import useSWRFetch from "../useSWRFetch";

export default (sessionId) => {
  const apiUrl = "";

  const { data, mutate } = useSWRFetch(apiUrl); // 發送 GET 請求

  return { messages: data && data.messages, mutate };
};
