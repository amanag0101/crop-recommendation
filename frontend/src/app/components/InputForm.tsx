"use client";

import React, { ChangeEvent, useEffect, useState } from "react";
import {
  Button,
  FormControl,
  Input,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import styles from "./inputform.module.css";
import { getCurrentLocation } from "../utils/LocationService";
import { getWeatherData } from "../utils/WeatherService";
import { WeatherData } from "../interface/WeatherData";
import { Month } from "../constants/Month";

type InputFormInteface = {
  startMonth: number;
  endMonth: number;
  temperature: number;
  humidity: number;
  rainfall: number;
  n: number;
  p: number;
  k: number;
  ph: number;
};

export const InputForm = () => {
  const [currentLocation, setCurrentLocation] = useState<GeolocationPosition>();
  const [weatherData, setWeathreData] = useState<WeatherData>();
  const [values, setValues] = useState<InputFormInteface>({
    startMonth: 1,
    endMonth: 3,
    temperature: 0,
    humidity: 0,
    rainfall: 0,
    n: 0.0,
    p: 0.0,
    k: 0.0,
    ph: 0.0,
  });

  // get user's current location
  useEffect(() => {
    getCurrentLocation()
      .then((position) => {
        if (position instanceof GeolocationPosition)
          setCurrentLocation(position);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  // based on the user's location get the weather data
  useEffect(() => {
    if (currentLocation !== undefined)
      getWeatherData(
        currentLocation.coords.latitude,
        currentLocation.coords.longitude
      ).then((data) => setWeathreData(data as unknown as WeatherData));
  }, [currentLocation]);

  // set the weather data
  useEffect(() => {
    if (weatherData !== undefined) {
      setValues((prevState) => ({
        ...prevState,
        temperature: weatherData.current.temp_c,
        humidity: weatherData.humidity,
      }));
    }
  }, [weatherData]);

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = () => {
    console.log(values);
  };

  return (
    <div className={styles.input_form}>
      <div className={styles.form} style={{ padding: "16px" }}>
        <FormControl className={styles.form_control}>
          {/* <InputLabel htmlFor="startMonth">Start Month</InputLabel> */}
          <Select
            className={styles.input}
            id="startMonth"
            name="startMonth"
            label="Start Month"
            value={values.startMonth}
            onChange={handleChange}
          >
            {Object.values(Month)
              .filter((value) => typeof value === "string")
              .map((monthName, index) => (
                <MenuItem key={monthName} value={index + 1}>
                  {monthName}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
        <FormControl className={styles.form_control}>
          {/* <InputLabel htmlFor="endMonth">End Month</InputLabel> */}
          <Select
            className={styles.input}
            id="endMonth"
            name="endMonth"
            label="Start Month"
            value={values.endMonth}
            onChange={handleChange}
          >
            {Object.values(Month)
              .filter((value) => typeof value === "string")
              .map((monthName, index) => (
                <MenuItem key={monthName} value={index + 1}>
                  {monthName}
                </MenuItem>
              ))}
          </Select>
        </FormControl>

        <FormControl className={styles.form_control} sx={{ marginTop: "16px" }}>
          <InputLabel htmlFor="temperature">Temperature</InputLabel>
          <Input
            className={styles.input}
            id="temperature"
            name="temperature"
            aria-describedby="my-helper-text"
            value={values.temperature}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl className={styles.form_control}>
          <InputLabel htmlFor="humidity">Humidity</InputLabel>
          <Input
            className={styles.input}
            id="humidity"
            name="humidity"
            aria-describedby="my-helper-text"
            value={values.humidity}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl className={styles.form_control}>
          <InputLabel htmlFor="rainfall">Rainfall</InputLabel>
          <Input
            className={styles.input}
            id="rainfall"
            name="rainfall"
            aria-describedby="my-helper-text"
            value={values.rainfall}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl className={styles.form_control}>
          <InputLabel htmlFor="n">N</InputLabel>
          <Input
            className={styles.input}
            id="n"
            name="n"
            aria-describedby="my-helper-text"
            value={values.n}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl className={styles.form_control}>
          <InputLabel htmlFor="p">P</InputLabel>
          <Input
            className={styles.input}
            id="p"
            name="p"
            aria-describedby="my-helper-text"
            value={values.p}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl className={styles.form_control}>
          <InputLabel htmlFor="k">K</InputLabel>
          <Input
            className={styles.input}
            id="k"
            name="k"
            aria-describedby="my-helper-text"
            value={values.k}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl className={styles.form_control}>
          <InputLabel htmlFor="ph">ph</InputLabel>
          <Input
            className={styles.input}
            id="ph"
            name="ph"
            aria-describedby="my-helper-text"
            value={values.ph}
            onChange={handleChange}
          />
        </FormControl>
        <Button
          variant="contained"
          sx={{ marginTop: "16px", width: "100%" }}
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </div>
    </div>
  );
};
