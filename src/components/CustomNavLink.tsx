import NextLink from 'next/link';
import { Link } from '@chakra-ui/react';
import { useRouter } from 'next/router'

const CustomNavLink = ({ href, children }) => {
  const router = useRouter()
  return (
    <>
      <NextLink href={href} passHref>
        <Link
          mr={4}
          py="2px"
          color={`${router.pathname}` === href ? "active" : "secondary"}
          _hover={{
            color: "hover",
            textDecoration: "none"
          }}
          fontWeight="semibold"
        >
          {children}
        </Link>
      </NextLink>
    </>
  )
};

export default CustomNavLink;
