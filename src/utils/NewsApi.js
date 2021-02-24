const checkResponse = (res) =>
  res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);

const calculateDate = (_) => {
  let today = new Date();
  today.setDate(today.getDate() - 7);
  let formatDate = today.toISOString().slice(0, 10);

  return formatDate;
};

class Api {
  constructor(url, apiKey) {
    this._url = url;
    this._apiKey = apiKey;
  }

  search(query) {
    return fetch(
      `${this._url}/v2/everything?q=${query}&from=${calculateDate()}&apiKey=${this._apiKey}`
    ).then((res) => checkResponse(res));
  }
}

const api = new Api("https://newsapi.org", "a95d7c65d6d74245ab2379165bc67213");

export default api;
