import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Box, Button, HStack } from '@chakra-ui/react';
import { ProgressBar, ProgressRoot, ProgressLabel, ProgressValueText } from "./ui/progress"
import WorkflowAboutMe from './WorkflowAboutMe';
import WorkflowAddress from './WorkflowAddress';
import WorkflowBirthday from './WorkflowBirthday';
import { getRequest, patchRequest } from '../utilities/fetch';

const Registration3 = () => {
  const navigate = useNavigate();
  const dataRef = useRef();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        dataRef.current = {
          useAboutMe: false,
          useAddress: false,
          useBirthday: false
        }
        const result = await getRequest('admin/workflow_components');
        
        result.workflow_components.forEach(item => {
          if(item.sort_index == 3)
          {
            switch(item.name) {
              case 'about':
                dataRef.current.useAboutMe = true;
                break;
              case 'address':
                dataRef.current.useAddress = true;
                break;
              case 'birthday':
                dataRef.current.useBirthday = true
                break;
              default:
                break;
            }
          }
        })
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    const data = JSON.parse(localStorage.getItem("currentUser"));

    try {
      const result = await patchRequest(`users/${data.id}`, data);
      localStorage.removeItem("currentUser");
      navigate('/data');
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <Box maxW="sm" mx="auto" pt="3">
      <ProgressRoot value={70} pb="12" variant="subtle">
        <HStack gap="5">
          <ProgressLabel>Progress</ProgressLabel>
          <ProgressBar flex="1" />
          <ProgressValueText>2/3</ProgressValueText>
        </HStack>
      </ProgressRoot>
      <form onSubmit={handleSubmit}>
        <WorkflowAboutMe isNeeded={dataRef.current.useAboutMe} ></WorkflowAboutMe>
        <WorkflowAddress isNeeded={dataRef.current.useAddress} ></WorkflowAddress>
        <WorkflowBirthday isNeeded={dataRef.current.useBirthday} ></WorkflowBirthday>
        <Box float="left">
          <Link to="/registration/2">
            <Button variant="outline">
              Back
            </Button>
          </Link>
        </Box>
        <Box float="right">
          <Button type="submit">
            Finish
          </Button>
        </Box>
      </form>
    </Box>
  )
}

export default Registration3;