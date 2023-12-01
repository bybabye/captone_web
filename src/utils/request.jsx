export const apiRequest = async (payload, method, link, token, options = {}) => {
  const requestOptions = {
    method,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
      ...options,
    },
    body: payload ? JSON.stringify(payload) : undefined,
  };

  const res = await fetch(link, requestOptions);
  const data = await res.json();

  return data;
};
