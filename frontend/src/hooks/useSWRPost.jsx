/* eslint-disable no-shadow */
import useSWRMutation from "swr/mutation";

async function sendRequest(url, { arg }) {
  return fetch(url, {
    method: "POST",
    body: JSON.stringify(arg)
  }).then((res) => res.json());
}

export default (url) => {
  const { trigger, isMutating } = useSWRMutation(
    url,
    sendRequest /* options */
  );
  return { trigger, isMutating };
};
