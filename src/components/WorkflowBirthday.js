import React, { useState, useEffect } from "react";
import { Box, Input } from "@chakra-ui/react";
import { Field } from "./ui/field";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const WorkflowBirthday = ({ isNeeded }) => {
  const [data, setData] = useState(() => {
    const savedData = localStorage.getItem("currentUser");
    return savedData ? JSON.parse(savedData) : {};
  });

  useEffect(() => {
    localStorage.setItem("currentUser", JSON.stringify(data));
  }, [data]);

  const handleChange = (e) => {
    const currentData = JSON.parse(localStorage.getItem("currentUser"));
    setData({ ...currentData, ["birthday"]: e });
  };

  if (!isNeeded) {
    return null;
  }

  return (
    <Field label="Birthday" required mb="10">
      <Box>
        <DatePicker
          name="birthday"
          selected={data.birthday}
          onChange={handleChange}
          customInput={<Input />}
          showMonthDropdown
          showYearDropdown
          withPortal
          dropdownMode="select"
        />
      </Box>
    </Field>
  );
};

export default WorkflowBirthday;
