/* eslint-disable no-shadow */
import useSWRMutation from 'swr/mutation'

async function sendRequest(url, { arg }) {
	return fetch(url, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(arg),
	}).then((res) => res.json())
}

export default (url) => {
	const { data, trigger, isMutating } = useSWRMutation(
		url,
		sendRequest /* options */
	)
	return { data, trigger, isMutating }
}
