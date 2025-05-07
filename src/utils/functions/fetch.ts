export async function apiFetch(input: RequestInfo | URL, init?: RequestInit) {
	const res = await fetch(input, init);

	if (!res.ok) throw await res.json();

	console.log(res);

	if (res.redirected) return { url: res.url };

	if (res.status === 204) return res;

	return await res.json();
}
