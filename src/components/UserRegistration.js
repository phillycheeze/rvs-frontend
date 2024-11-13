import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Input, HStack } from "@chakra-ui/react";
import {
  ProgressBar,
  ProgressRoot,
  ProgressLabel,
  ProgressValueText,
} from "./ui/progress";
import { Field } from "./ui/field";
import { PasswordInput } from "./ui/password-input";
import { postRequest } from "../utilities/fetch";

const UserRegistrationForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(() => {
    const savedData = localStorage.getItem("currentUser");
    return savedData ? JSON.parse(savedData) : { email: "", address: {} };
  });

  useEffect(() => {
    // Save data to localStorage whenever it changes
    localStorage.setItem("currentUser", JSON.stringify(formData));
  }, [formData]);

  // Don't save password field to React state, instead use reference
  const passwordRef = useRef();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    const password = passwordRef.current.value;

    try {
      const data = await postRequest("users", { ...formData, password });
      setFormData({ ...formData, ["id"]: data.user.id });
      navigate("/registration/2");
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <Box maxW="sm" mx="auto" pt="3">
      <ProgressRoot value={5} pb="12" variant="subtle">
        <HStack gap="5">
          <ProgressLabel>Progress</ProgressLabel>
          <ProgressBar flex="1" />
          <ProgressValueText>0/3</ProgressValueText>
        </HStack>
      </ProgressRoot>
      <form onSubmit={handleSubmit}>
        <Field label="Email" required>
          <Input
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
          />
        </Field>
        <Field label="Password" required mt="8">
          <PasswordInput ref={passwordRef} />
        </Field>

        <Button type="submit" mt="10">
          Continue
        </Button>
      </form>
    </Box>
  );
};

export default UserRegistrationForm;
