import React, { useState, useEffect } from 'react';
import { Textarea } from '@chakra-ui/react';
import { Field } from './ui/field';

const WorkflowAboutMe = ({isNeeded}) => {
  const [data, setData] = useState(() => {
    const savedData = localStorage.getItem('currentUser');
    return savedData ? JSON.parse(savedData) : {};
  });

  useEffect(() => {
    localStorage.setItem('currentUser', JSON.stringify(data));
  }, [data]);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  if (!isNeeded) {
    return null;
  }
  return (
    <Field label="About Me" required mb="10">
      <Textarea name="about" placeholder="Tell us a little about yourself..." onChange={handleChange} value={data.about} />
    </Field>
  )
}

export default WorkflowAboutMe;