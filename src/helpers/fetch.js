const urlBase = process.env.REACT_APP_API;

export const fetchWithOutToken = (endpoint, data, method = "GET") => {
  const url = `${urlBase}/${endpoint}`;

  if (method === "GET") {
    return fetch(url);
  } else {
    return fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  }
};

export const fetchWithToken = (endpoint, data, method = "GET") => {
  const url = `${urlBase}/${endpoint}`;

  const token = localStorage.getItem("token") || "";

  if (method === "GET") {
    return fetch(url, {
      headers: {
        "x-token": token,
      },
    });
  } else {
    return fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        "x-token": token,
      },
      body: JSON.stringify(data),
    });
  }
};
