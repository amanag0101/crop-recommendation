"use client";

import React, { ChangeEvent, useState } from "react";
import {
  Button,
  FormControl,
  Input,
  InputLabel
} from "@mui/material";
import styles from "./inputform.module.css";

type InputFormInteface = {
  temperature: number;
  humidity: number;
  rainfall: number;
  n: number;
  p: number;
  k: number;
  ph: number;
};

export const InputForm = () => {
  const [values, setValues] = useState<InputFormInteface>({
    temperature: 0,
    humidity: 0,
    rainfall: 0,
    n: 0.0,
    p: 0.0,
    k: 0.0,
    ph: 0.0,
  });

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
