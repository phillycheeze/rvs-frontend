import React, { useState, useEffect } from "react";
import { Box, Button, Input, Table } from "@chakra-ui/react";
import { Field } from "./ui/field";
import { getRequest } from "../utilities/fetch";

const UserTable = () => {
  const [data, setData] = useState({ users: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getRequest("users");
        data.users = result.users;
        data.users.map((item) => console.log(item));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <Box w="75%" mx="auto">
      <Table.Root size="sm" variant="outline" mt="5">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader>Email</Table.ColumnHeader>
            <Table.ColumnHeader>About</Table.ColumnHeader>
            <Table.ColumnHeader>Address</Table.ColumnHeader>
            <Table.ColumnHeader textAlign="end">Birthday</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {data.users.map((item) => (
            <Table.Row key={item.id}>
              <Table.Cell>{item.email}</Table.Cell>
              <Table.Cell>{item.about}</Table.Cell>
              <Table.Cell>
                {item.UserAddress?.address_line_1} {item.UserAddress?.city},
                {item.UserAddress?.state} {item.UserAddress?.zipcode}
              </Table.Cell>
              <Table.Cell textAlign="end">{item.birthday}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Box>
  );
};

export default UserTable;
