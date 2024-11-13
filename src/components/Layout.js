import React from "react";
import { Box, Flex, Heading, Icon } from "@chakra-ui/react";
import { Link, Outlet } from "react-router-dom";
import { FaGear, FaUsers, FaUserPlus } from "react-icons/fa6";

function Layout() {
  return (
    <Box>
      <Box
        as="header"
        position="fixed"
        top="0"
        width="100%"
        height="70px"
        bg="teal.500"
        color="white"
        boxShadow="md"
        zIndex="1000"
      >
        <Flex maxW="container.lg" mx="auto" p={4} align="left">
          <Heading
            color="white"
            fontSize="lg"
            fontWeight="bold"
            marginEnd="auto"
          >
            RVS Application
          </Heading>
          <Link to="/registration">
            <Icon mr="10">
              <FaUserPlus />
            </Icon>
          </Link>
          <Link to="/data">
            <Icon mr="10">
              <FaUsers></FaUsers>
            </Icon>
          </Link>
          <Link to="/admin">
            <Icon mr="10">
              <FaGear></FaGear>
            </Icon>
          </Link>
        </Flex>
      </Box>
      <Box pt="70px">
        <Outlet></Outlet>
      </Box>
    </Box>
  );
}

export default Layout;
