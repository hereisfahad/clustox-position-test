import { Text, Box, Spinner } from '@chakra-ui/react'
import Head from 'next/head';
import { gql, useQuery } from '@apollo/client'

import Container from '@/components/Container'
import Page from '@/components/Page';

export const ViewerQuery = gql`
  query ViewerQuery {
    viewer {
      id
      email
      name
    }
  }
`
const Home = () => {
  const {
    data,
    loading,
  } = useQuery(ViewerQuery);
  const viewer = data?.viewer

  if (loading) {
    return (
      <Box display="flex" height="100vh" justifyContent="center" alignItems="center">
        <Spinner color="purple.500" size="xl" />
      </Box>
    )
  }

  return (
    <Container height="100vh">
      <Text
        fontSize="3xl"
        fontWeight="bold"
        color="gray.800"
        mt="2rem"
      >
        {`You're signed in as ${viewer?.email}`}
      </Text>
    </Container>
  )
}


const HomePage = () => (
  <Page name="Home" path="/">
    <Head>
      <script
        dangerouslySetInnerHTML={{
          __html: `
            if (!document.cookie.includes('clustox-position-test-token')) {
              window.location.href = "/login"
            }
          `
        }}
      />
    </Head>
    <Home />
  </Page>
);

export default HomePage

