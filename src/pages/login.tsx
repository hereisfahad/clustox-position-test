import { useState } from 'react';
import NextLink from 'next/link'
import { useForm } from 'react-hook-form';
import { gql, useMutation } from '@apollo/client'
import { useRouter } from 'next/router'
import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Stack,
  Link,
  Text,
} from '@chakra-ui/react';

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
  const { push } = useRouter()
  const [loading, setLoading] = useState(false);

  const {
    handleSubmit,
    register,
    getValues,
    formState: { errors },
  } = useForm();

  const [signin] = useMutation(LOGIN_USER, {
    variables: getValues(),
    onCompleted: () => {
      push('/');
    }
  });

  const onLogin = async () => {
    setLoading(true);
    await signin()
    setLoading(false);
  };

  return (
    <Flex align="center" justify="center" h="100vh" backgroundColor="gray.100">
      <Stack
        as="form"
        backgroundColor="white"
        borderRadius={[0, 8]}
        maxWidth="400px"
        onSubmit={handleSubmit((data) => onLogin())}
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
        <FormControl isInvalid={errors.email && errors.email.message}>
          <FormLabel htmlFor="email">Email Address</FormLabel>
          <Input
            autoFocus
            aria-label="Email Address"
            id="email"
            name="email"
            {...register("email", {
              required: 'Please enter your email.'
            })}
            placeholder="name@site.com"
          />
          <FormErrorMessage>
            {errors.email && errors.email.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={errors.password && errors.password.message}>
          <FormLabel htmlFor="password">Password</FormLabel>
          <Input
            aria-label="Password"
            name="password"
            id="password"
            type="password"
            {...register("password", {
              required: 'Please enter a password.'
            })}
          />
          <FormErrorMessage>
            {errors.password && errors.password.message}
          </FormErrorMessage>
        </FormControl>
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
              Don't have an account?
            </Link>
          </NextLink>

        </Flex>
      </Stack>
    </Flex>
  );
};

export default Login;

export const getServerSideProps = async (ctx) => {
  const { req } = ctx
  const { cookies } = req
  if (cookies['clustox-position-test-token']) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
    }
  }
  else return { props: {} }
}