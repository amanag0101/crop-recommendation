"use client";

import React, { ChangeEvent, useEffect, useState } from "react";
import {
  Button,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Input,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
} from "@mui/material";
import styles from "./inputform.module.css";
import { getCurrentLocation } from "../utils/LocationService";
import { getWeatherData } from "../utils/WeatherService";
import { WeatherData } from "../interface/WeatherData";
import { Month } from "../constants/Month";
import { getCropData } from "../utils/CropDataService";
import { CropResult } from "../interface/CropResult";

export type InputFormInteface = {
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
  const [inputType, setInputType] = useState<string>("manual");
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
  const [result, setResult] = useState<string>("");

  // get user's current location
  useEffect(() => {
    getCurrentLocation()
      .then((position) => {
        console.log(position);
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

  const handleSubmit = async () => {
    console.log(values);
    const data = getCropData(values);
    setResult(await data)
  };

  return (
    <div className={styles.input_form}>
      <div className={styles.form} style={{ padding: "16px" }}>
        {/* <FormControl className={styles.form_control}>
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
        </FormControl> */}

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

      <div className={styles.options}>
        <div className={styles.container}>
          <FormControl>
            <RadioGroup
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
              value={inputType}
              onChange={(e) => setInputType(e.target.value)}
            >
              <FormControlLabel
                value="manual"
                control={<Radio />}
                label="Manual Input"
              />
              <FormControlLabel
                value="automatic"
                control={<Radio />}
                label="Automatic Input"
              />
            </RadioGroup>
          </FormControl>
        </div>

        <div>
          <p>
            {`You should grow ${result}`}
          </p>
        </div>
      </div>
    </div>
  );
};
