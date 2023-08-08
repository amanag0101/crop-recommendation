export const getCropData = async () => {
  const url = "http://127.0.0.1:5000/crop";
  const data = {
    N: 10,
    P: 20,
    K: 30,
    Ph: 6.5,
    state: "Tamil Nadu",
    district: "Katpadi",
    start_month: 1,
    end_month: 12,
    humidity: 66,
    temperature: 22,
  };
  const headers = { "Content-Type": "application/json" };

  return fetch(url, {
    method: "POST",
    body: JSON.stringify(data),
    headers: headers,
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      return data;
    })
    .catch((error) => console.error(error));
};
