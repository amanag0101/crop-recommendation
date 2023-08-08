import { InputFormInteface } from "../components/InputForm";
import { CropResult } from "../interface/CropResult";

export const getCropData = async (formData: InputFormInteface) => {
  const url = "http://127.0.0.1:5000/crop";
  const data = {
    N: formData.n,
    P: formData.p,
    K: formData.k,
    Ph: formData.ph,
    state: "Tamil Nadu",
    district: "Katpadi",
    start_month: 1,
    end_month: 12,
    humidity: formData.humidity,
    temperature: formData.temperature,
    rainfall: formData.rainfall
  };
  const headers = { "Content-Type": "application/json" };

  return fetch(url, {
    method: "POST",
    body: JSON.stringify(data),
    headers: headers,
  })
    .then((response) => response.json())
    .then((data) => {
        return data.crop
    })
    .catch((error) => console.error(error));
};

// export const getCropData = async () => {
//   const url =
//     "https://archive-api.open-meteo.com/v1/archive?latitude=52.52&longitude=13.41&timezone=auto&start_date=2022-07-20&end_date=2022-09-03&hourly=temperature_2m,relativehumidity_2m,rain";

//   fetch(url)
//     .then((response) => response.json())
//     .then((data) => console.log(data))
//     .catch((error) => console.error(error));
// };
