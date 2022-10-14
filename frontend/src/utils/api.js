class Api {
	constructor({ url, headers }) {
		this._url = url;
		this._headers = headers;
	}
	
	_getHeaders() {
		const token = localStorage.getItem('token');
		return {
			'Authorization': `Bearer ${token}`,
			...this._headers,
		};
	}

	handleResponse(res) {
		if (res.ok) {
			return res.json();
		}
		return Promise.reject(res.status);
	}

	getCards() {
		return fetch (`${this._url}/cards`, {
			headers: this._getHeaders()
		})
		.then((res) => this.handleResponse(res));
	}

	getProfileInfo() {
		return fetch (`${this._url}/users/me`, {
			headers: this._getHeaders()
		})
		.then((res) => this.handleResponse(res));
	}

	addUserInfo(data) {
		return fetch (`${this._url}/users/me`, {
			method: 'PATCH',
			headers: this._getHeaders(),
			body: JSON.stringify(data)
		})
		.then((res)=>	this.handleResponse(res));
	}

	addUserAvatar(data) {
		return fetch (`${this._url}/users/me/avatar`, {
			method: 'PATCH',
			headers: this._getHeaders(),
			body: JSON.stringify(data)
		})
		.then((res) => this.handleResponse(res));
	}

	addCards(card) {
		return fetch (`${this._url}/cards`, {
			method: 'POST',
			headers: this._getHeaders(),
			body: JSON.stringify(card)
		})
		.then((res) => this.handleResponse(res));
	}

	deleteCard(data, id) {
		const cardId = id;
		return fetch (`${this._url}/cards/${cardId}`, {
			method: 'DELETE',
			headers: this._getHeaders(),
			body: JSON.stringify(data)
		})
		.then((res) => this.handleResponse(res));
	}

	likeCard(id) {
		const cardId = id;
		return fetch (`${this._url}/cards/${cardId}/likes`, {
			method: 'PUT',
			headers: this._getHeaders(),
		})
		.then((res) => this.handleResponse(res));
	}	

	dislikeCard(id) {
		const cardId = id;
		return fetch (`${this._url}/cards/${cardId}/likes`, {
			method: 'DELETE',
			headers: this._getHeaders(),
		})
		.then((res) => this.handleResponse(res));
	}

	getToken = (token) => {
		this._token = `Bearer ${token}`
	}
	
}

const api = new Api({
	url: 'https://project.nomorepartiesxyz.ru',
	headers: {
		'Content-Type':'application/json',
	}
});

export default api;