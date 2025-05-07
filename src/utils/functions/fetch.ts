export async function apiFetch(input: RequestInfo | URL, init?: RequestInit) {
	const res = await fetch(input, init);

	if (!res.ok) throw await res.json();

	if (res.redirected) return { url: res.url };

	return await res.json();
}
