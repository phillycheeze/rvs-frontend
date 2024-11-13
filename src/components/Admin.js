import React, { useEffect, useState, useRef } from 'react';
import { Box, Button, Stack, Icon, Card, HStack } from '@chakra-ui/react';
import { RadioGroup, Radio } from './ui/radio';
import { toaster, Toaster } from "./ui/toaster"
import { FaRegEnvelope, FaUsers, FaLock, FaParagraph, FaRegCalendar, FaHouse } from 'react-icons/fa6';
import { getRequest, postRequest } from '../utilities/fetch';

const Admin = () => {
  let data = useRef([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getRequest('admin/workflow_components');
        data.current = result.workflow_components;
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const valueChanged = async (name, value) => {
    const result = await postRequest('admin/workflow_components', {
      name: name,
      sort_index: value
    });
    toaster.create({
      description: "Saved onboarding step.",
      type: "success",
    })
  }

  if (loading) return <div>Loading...</div>;

  return (
    <Box maxW="80%" mx="auto" mt="10">
      <Stack gap="4" direction="row" wrap="wrap">
        <Card.Root w="15%" disabled={true} h="320">
          <Card.Body gap="2">
            <Icon><FaRegEnvelope></FaRegEnvelope></Icon>
            <Card.Title mt="2" textTransform="capitalize">Email</Card.Title>
            <Card.Description pt="10">
              Registration Step
            </Card.Description>
          </Card.Body>
          <Card.Footer justifyContent="flex-end">
            <RadioGroup value="1" disabled={true} size="sm">
              <HStack gap="6">
                <Radio value="1">1</Radio>
              </HStack>
            </RadioGroup>
          </Card.Footer>
        </Card.Root>
        <Card.Root w="15%" disabled={true}>
          <Card.Body gap="2">
            <Icon><FaLock></FaLock></Icon>
            <Card.Title mt="2" textTransform="capitalize">Password</Card.Title>
            <Card.Description pt="10">
              Registration Step
            </Card.Description>
          </Card.Body>
          <Card.Footer justifyContent="flex-end">
            <RadioGroup value="1" disabled={true} size="sm">
              <HStack gap="6">
                <Radio value="1">1</Radio>
              </HStack>
            </RadioGroup>
          </Card.Footer>
        </Card.Root>
        {data.current.map((item) => (
          <Card.Root w="20%" key={item.name}>
            <Card.Body gap="2">
              <Icon>
                { item.name == "about" ? <FaParagraph /> : (item.name == "birthday" ? <FaRegCalendar /> : <FaHouse /> ) }
              </Icon>
              <Card.Title mt="2" textTransform="capitalize">{item.name}</Card.Title>
              <Card.Description pt="10">
                Registration Step
              </Card.Description>
            </Card.Body>
            <Card.Footer justifyContent="flex-end">
              <RadioGroup defaultValue={item.sort_index + ''} size="sm" onValueChange={(e) => valueChanged(item.name, e.value)}>
                <HStack gap="6">
                  <Radio value="2">2</Radio>
                  <Radio value="3">3</Radio>
                  <Radio value="0">Disabled</Radio>
                </HStack>
              </RadioGroup>
            </Card.Footer>
          </Card.Root>
        ))}
      </Stack>
      <Toaster />
    </Box>
    
  )
}

export default Admin;