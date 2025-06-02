export const httpClient = {
	async get(url: string | URL | Request) {
		const response = await fetch(url);
		return response;
	},

	async post(url: string | URL | Request, data: any) {
		const response = await fetch(url, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(data),
		});
		return response;
	},

	async put(url: string | URL | Request, data: any) {
		const response = await fetch(url, {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(data),
		});
		return response;
	},

	async delete(url: string | URL | Request) {
		const response = await fetch(url, { method: "DELETE" });
		return response;
	},
};
