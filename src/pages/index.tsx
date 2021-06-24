import { Text } from '@chakra-ui/react'
import { gql, useQuery } from '@apollo/client'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

import { Container } from '@/components/Container'

const ViewerQuery = gql`
  query ViewerQuery {
    viewer {
      id
      email
    }
  }
`

const Index = () => {
  const router = useRouter()
  const {
    data,
    loading,
    error,
  } = useQuery(ViewerQuery);
  const viewer = data?.viewer
  const shouldRedirect = !(loading || error || viewer)

  useEffect(() => {
    if (shouldRedirect) {
      router.push('/login')
    }
  }, [shouldRedirect])

  if (loading) return <p>Loading...</p>

  return (
    <Container height="100vh">
      <Text
        fontSize="3xl"
        fontWeight="bold"
        color="gray.800"
        mt="2rem"
      >
        You're signed in as {viewer?.email}
      </Text>
    </Container>
  )
}

export default Index

export const getServerSideProps = async (ctx) => {
  const { req } = ctx
  const { cookies } = req
  if (cookies['clustox-position-test-token']) return { props: {} }
  else return {
    redirect: {
      permanent: false,
      destination: "/login",
    },
  };
}
