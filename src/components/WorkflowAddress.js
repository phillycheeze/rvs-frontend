import React, { useState, useEffect } from 'react';
import { Box, Input, HStack } from '@chakra-ui/react';
import { Field } from './ui/field';

const WorkflowAddress = ({isNeeded}) => {
  const [data, setData] = useState(() => {
    const savedData = localStorage.getItem('currentUser');
    return savedData ? JSON.parse(savedData) : { address: {} };
  });

  useEffect(() => {
    localStorage.setItem('currentUser', JSON.stringify(data));
  }, [data]);

  const handleChange = (e) => {
    setData({ ...data, ["address"]: { ...data["address"], [e.target.name]: e.target.value} });
  };

  if (!isNeeded) {
    return null;
  }
  return (
    <Box>
      <Field label="Address Line 1" required mt="4">
        <Input name="address_line_1" placeholder="" onChange={handleChange} value={data.address.address_line_1 ?? ''} />
      </Field>

      <Field label="Address Line 2" mt="4">
        <Input name="address_line_2" placeholder="" onChange={handleChange} value={data.address.address_line_2 ?? ''} />
      </Field>

      <HStack mt="4">
        <Field label="City" required>
          <Input name="city" placeholder="" onChange={handleChange} value={data.address.city ?? ''} />
        </Field>

        <Field label="State" required>
          <Input name="state" placeholder="" onChange={handleChange} value={data.address.state ?? ''} />
        </Field>
      </HStack>

      <Field label="Zip" required mb="10" w="50%" mt="4">
        <Input name="zipcode" placeholder="" onChange={handleChange} value={data.address.zipcode ?? ''} />
      </Field>
    </Box>
  )
}

export default WorkflowAddress;