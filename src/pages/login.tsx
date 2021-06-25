import NextLink from 'next/link'
import { useForm } from 'react-hook-form';
import { gql, useMutation } from '@apollo/client'
import { useRouter } from 'next/router'
import Head from 'next/head';
import {
  Button,
  Flex,
  Stack,
  Link,
  Text,
  useToast
} from '@chakra-ui/react';

import TextField from '@/components/TextField'
import Page from '@/components/Page';

const LOGIN_USER = gql`
  mutation LoginUser(
    $email: String!
    $password: String!
  ) {
    signIn(
      input: {
        email: $email
        password: $password
      }
    ) {
      user{
        id
        name
        username
        email
      }
    }
  }
`

const Login = () => {
  const toast = useToast()
  const { push } = useRouter()

  const {
    handleSubmit,
    register,
    getValues,
    formState: { errors },
  } = useForm();

  const [signin, { loading }] = useMutation(LOGIN_USER, {
    variables: getValues(),
    onCompleted: () => {
      push('/');
    },
    onError: ({ graphQLErrors }) => {
      graphQLErrors.map(({ message }) => (
        toast({
          title: 'Error',
          description: message,
          status: 'error',
          duration: 4000,
          isClosable: true
        })
      ))
    }
  });

  return (
    <Flex align="center" justify="center" h="100vh" backgroundColor="gray.100">
      <Stack
        as="form"
        backgroundColor="white"
        borderRadius={[0, 8]}
        maxWidth="400px"
        onSubmit={handleSubmit(signin)}
        px={8}
        py={12}
        marginX={4}
        shadow={[null, 'md']}
        spacing={4}
        w="100%"
      >
        <Flex justify="center">
          <Text fontWeight="bold" fontSize="2xl">Login</Text>
        </Flex>
        <TextField
          autoFocus
          {...register("email", {
            required: 'Please enter your email.'
          })}
          errorMessage={errors.email && errors.email.message}
          label="Email Address"
          name="email"
          placeholder="name@site.com"
        />
        <TextField
          type="password"
          errorMessage={errors.password && errors.password.message}
          label="Password"
          name="password"
          {...register("password", {
            required: 'Please enter a password.'
          })}
        />
        <Button
          id="login"
          type="submit"
          backgroundColor="primary"
          color="white"
          isLoading={loading}
          fontWeight="medium"
          mt={4}
          h="50px"
          fontSize="lg"
          _hover={{ bg: 'hover' }}
          _active={{
            bg: 'active',
            transform: 'scale(0.95)'
          }}
        >
          Login
        </Button>

        <Flex
          align={['flex-start', 'center']}
          justifyContent="space-between"
          mb={8}
          width="full"
          mt={1}
          direction={['column', 'row']}
        >

          <NextLink href="/register" passHref>
            <Link
              color='gray.900'
              fontWeight="bold"
              fontSize="sm"
              mb={1}
            >
              {`Don't have an account?`}
            </Link>
          </NextLink>

        </Flex>
      </Stack>
    </Flex>
  );
};

const LoginPage = () => (
  <Page name="Login" path="/login">
    <Head>
      <script
        dangerouslySetInnerHTML={{
          __html: `
                if (document.cookie.includes('clustox-position-test-token')) {
                window.location.href = "/"
                }
            `
        }}
      />
    </Head>
    <Login />
  </Page>
);

export default LoginPage;

