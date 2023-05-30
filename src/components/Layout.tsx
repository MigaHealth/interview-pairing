import { AppShell, Navbar, Group, Text, Button } from '@mantine/core';
import { IconLogout2, IconUser } from '@tabler/icons-react';
import Link from 'next/link';
import { PropsWithChildren } from 'react';

export const Layout = ({ children }: PropsWithChildren) => {
  return (
    <AppShell
      padding="md"
      navbar={
        <Navbar
          width={{ base: 300 }}
          p="xs"
          sx={() => ({
            backgroundColor: '#ffcf03',
          })}
        >
          <Navbar.Section grow mt="md">
            <Link href="/" style={{ textDecoration: 'none' }}>
              <Button
                variant="filled"
                sx={(theme) => ({
                  display: 'block',
                  width: '100%',
                  padding: theme.spacing.xs,
                  borderRadius: theme.radius.sm,
                })}
              >
                <Group>
                  <IconUser size={14} />
                  <Text size="sm">Consumers</Text>
                </Group>
              </Button>
            </Link>
          </Navbar.Section>
          <Navbar.Section mt="md">
            <Link
              href="https://migahealth.com"
              style={{ textDecoration: 'none' }}
            >
              <Button
                variant="filled"
                sx={(theme) => ({
                  display: 'block',
                  width: '100%',
                  padding: theme.spacing.xs,
                  borderRadius: theme.radius.sm,
                  backgroundColor: 'transparent',
                  color: theme.colors.dark[9],
                })}
              >
                <Group>
                  <IconLogout2 size={14} color="black" />
                  <Text size="sm">Sign Out</Text>
                </Group>
              </Button>
            </Link>
          </Navbar.Section>
        </Navbar>
      }
    >
      {children}
    </AppShell>
  );
};
