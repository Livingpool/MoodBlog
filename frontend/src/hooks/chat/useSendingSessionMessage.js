import useSWRPut from "../useSWRPut";

export default (sessionId) => {
  const apiUrl = "";

  const { data, trigger, isMutating } = useSWRPut(apiUrl); // 發送 PUT 請求

  return { messages: data && data.messages, trigger, isMutating };
};
