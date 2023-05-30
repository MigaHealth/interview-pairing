import { trpc } from '~/utils/trpc';
import { NextPageWithLayout } from '../_app';
import { useRouter } from 'next/router';
import {
  Avatar,
  Button,
  Divider,
  Group,
  Loader,
  Modal,
  Stack,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { Consumer } from '@prisma/client';
import {
  IconAt,
  IconFingerprint,
  IconGift,
  IconPhone,
} from '@tabler/icons-react';
import { z } from 'zod';
import { useForm } from '@mantine/form';
import { useState } from 'react';

const ConsumerPage: NextPageWithLayout = () => {
  const router = useRouter();
  const id = z.string().parse(router.query.id);

  const consumerQuery = trpc.consumer.byId.useQuery({ id });

  if (!consumerQuery.data) {
    return <Loader />;
  }

  return (
    <Stack>
      <Header consumer={consumerQuery.data} />
      <Divider my={20} />
      <Details consumer={consumerQuery.data} onUpdate={consumerQuery.refetch} />
    </Stack>
  );
};

const Header = ({ consumer }: { consumer: Consumer }) => {
  return (
    <Group>
      <Avatar color="cyan" radius="xl" />
      <Stack>
        <Title order={3}>
          {consumer.firstName} {consumer.lastName}
        </Title>
        <Group>
          <Text>MRN: {consumer.mrn}</Text>
          <Text>DOB: {consumer.dob.toISOString()}</Text>
        </Group>
      </Stack>
    </Group>
  );
};

const Details = ({
  consumer,
  onUpdate,
}: {
  consumer: Consumer;
  onUpdate: () => void;
}) => {
  return (
    <Stack>
      <Group>
        <IconGift size={14} />
        <Text>{consumer.dob.toISOString()}</Text>
      </Group>
      <Group>
        <IconFingerprint size={14} />
        <Group>
          <Text>{consumer.gender}</Text>
          <Text>{consumer.pronouns}</Text>
        </Group>
      </Group>
      <Group>
        <IconAt size={14} />
        <Text>{consumer.email}</Text>
      </Group>
      <Group>
        <IconPhone size={14} />
        <Text>{consumer.phone}</Text>
        <EditPhoneNumber consumer={consumer} onSuccess={onUpdate} />
      </Group>
    </Stack>
  );
};

const EditPhoneNumber = ({
  consumer,
  onSuccess,
}: {
  consumer: Consumer;
  onSuccess: () => void;
}) => {
  const [modalOpened, setModalOpened] = useState(false);

  const form = useForm({
    initialValues: {
      phone: consumer.phone,
    },
  });

  const savePhoneNumber = trpc.consumer.savePhoneNumber.useMutation({
    onSuccess: () => {
      setModalOpened(false);
      onSuccess();
    },
  });

  const handleSubmit: Parameters<(typeof form)['onSubmit']>[0] = (values) => {
    savePhoneNumber.mutate({ id: consumer.id, ...values });
  };

  return (
    <>
      <Button onClick={() => setModalOpened(true)}>Edit</Button>
      <Modal
        opened={modalOpened}
        onClose={() => setModalOpened(false)}
        title="Phone number"
      >
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <TextInput mb="md" {...form.getInputProps('phone')} />
          <Button type="submit" loading={savePhoneNumber.isLoading}>
            Save
          </Button>
        </form>
      </Modal>
    </>
  );
};

export default ConsumerPage;
