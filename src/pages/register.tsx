import NextLink from 'next/link';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router'
import { gql, useMutation } from '@apollo/client'
import {
  Button,
  Flex,
  Stack,
  Link,
  Text,
  useToast,
} from '@chakra-ui/react';

import TextField from '@/components/TextField'

const REGISTER_USER = gql`
  mutation SignupMutation(
    $username: String!
    $name: String!
    $email: String!
    $password: String!
  ) {
    signUp(
      input: {
        username: $username
        email: $email
        password: $password
        name: $name
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

const Register = () => {
  const toast = useToast()
  const { push } = useRouter()

  const {
    handleSubmit,
    register,
    getValues,
    formState: { errors },
  } = useForm();

  const [signup, { loading }] = useMutation(REGISTER_USER, {
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
        onSubmit={handleSubmit(signup)}
        px={8}
        py={12}
        marginX={4}
        shadow={[null, 'md']}
        w="100%"
      >
        <Flex justify="center">
          <Text fontWeight="bold" fontSize="2xl">Register</Text>
        </Flex>

        <TextField
          autoFocus
          {...register("username", {
            required: 'Please enter your username.',
            maxLength: {
              value: 100,
              message: 'Username cannot be more than 100 characters.'
            }
          })}
          errorMessage={errors.username && errors.username.message}
          label="Username"
          name="username"
          placeholder="jhondoe"
        />

        <TextField
          {...register("name", {
            required: 'Please enter your name.',
            maxLength: {
              value: 100,
              message: 'Name cannot be more than 100 characters.'
            }
          })}
          errorMessage={errors.name && errors.name.message}
          label="Name"
          name="name"
          placeholder="Jhon Doe"
        />

        <TextField
          {...register("email", {
            required: 'Please enter your email.',
            maxLength: {
              value: 100,
              message: 'Email cannot be more than 100 characters.'
            }
          })}
          errorMessage={errors.email && errors.email.message}
          label="Email Address"
          name="email"
          placeholder="Jhon Doe"
        />

        <TextField
          {...register("password", {
            required: 'Please enter a password.',
            maxLength: {
              value: 30,
              message: 'Password cannot be more than 100 characters.'
            }
          })}
          errorMessage={errors.password && errors.password.message}
          label="Password"
          name="password"
        />

        <Button
          id="register"
          type="submit"
          backgroundColor="primary"
          color="white"
          isLoading={loading}
          fontWeight="medium"
          mt={4}
          h="40px"
          fontSize="lg"
          _hover={{ bg: 'hover' }}
          _active={{
            bg: 'active',
            transform: 'scale(0.95)'
          }}
        >
          Register
        </Button>

        <NextLink href="/login" passHref>
          <Link
            color='gray.900'
            fontWeight="bold"
            fontSize="sm"
          >
            Already have an account?
          </Link>
        </NextLink>
      </Stack>
    </Flex>
  );
};

export default Register;

export const getServerSideProps = async ({ req: { cookies } }) => {
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
