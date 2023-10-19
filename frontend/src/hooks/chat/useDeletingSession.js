import useSWRDelete from "../useSWRDelete";

export default (sessionId) => {
  const apiUrl = "";

  const { trigger } = useSWRDelete(apiUrl); // 發送 DELETE 請求

  return { trigger };
};
