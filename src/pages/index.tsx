import { Avatar, Group, Loader, Stack, Table, Title } from "@mantine/core";
import { trpc } from "../utils/trpc";
import { NextPageWithLayout } from "./_app";
import Link from "next/link";
import { Consumer } from "@prisma/client";

const IndexPage: NextPageWithLayout = () => {
  const consumersQuery = trpc.consumer.list.useQuery();

  if (!consumersQuery.data) {
    return <Loader />;
  }

  return <ConsumersTable consumers={consumersQuery.data} />;
};

const ConsumersTable = ({ consumers }: { consumers: Consumer[] }) => {
  return (
    <Stack>
      <Title order={1}>Consumers</Title>
      <Table>
        <thead>
          <tr>
            <th>Name</th>
            <th>MRN</th>
            <th>DOB</th>
          </tr>
        </thead>
        <tbody>
          {consumers.map((c) => (
            <tr key={c.id}>
              <td>
                <Link
                  href={`/consumer/${c.id}`}
                  style={{ textDecoration: "none" }}
                >
                  <Group>
                    <Avatar color="cyan" radius="xl">
                      {c.firstName[0]}
                      {c.lastName[0]}
                    </Avatar>
                    {c.firstName} {c.lastName}
                  </Group>
                </Link>
              </td>
              <td>{c.mrn}</td>
              <td>{c.dob.toISOString()}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Stack>
  );
};

export default IndexPage;
