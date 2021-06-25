import NextLink from 'next/link';
import { Link, MenuItem } from '@chakra-ui/react';
import { useRouter } from 'next/router'
import { ReactNode } from "react";

const CustomMenuLink = ({ href, children }: { href: string, children: ReactNode }) => {
  const router = useRouter()
  return (
    <>
      <NextLink href={href} passHref>
        <MenuItem
          _hover={{
            bg: "hover",
            color: "white",
          }}
          bg={`${router.pathname}` === href ? "primary" : "none"}
          color={`${router.pathname}` === href ? "white" : "secondary"}
        >
          <Link
            mr={4}
            _hover={{
              textDecoration: "none"
            }}
          >
            {children}
          </Link>
        </MenuItem>
      </NextLink>
    </>
  )
};

export default CustomMenuLink;
