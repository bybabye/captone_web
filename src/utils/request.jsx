export const apiRequest = async (
  payload,
  method,
  link,
  token,
  options = {}
) => {

  if(payload){

    const res = await fetch(link, {
      method: method, // "POST , GET , PATCH , DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
        ...options,
      },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
 
    return data;
  }
  const res = await fetch(link, {
    method: method, // "POST , GET , PATCH , DELETE",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
      ...options,
    },
  });

  const data = await res.json();
 
  return data;
};
