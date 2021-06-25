import { useState } from 'react';
import { HamburgerIcon, CloseIcon, TriangleDownIcon } from "@chakra-ui/icons"
import { useRouter } from 'next/router'
import { gql, useMutation, useApolloClient } from '@apollo/client'
import {
  Box,
  Flex,
  Avatar,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuGroup,
  MenuItem,
  Icon
} from '@chakra-ui/react';

const SignOutMutation = gql`
  mutation SignOutMutation {
    signOut
  }
`
import CustomMenuLink from './CustomMenuLink';
import CustomNavLink from './CustomNavLink';
import { ViewerQuery } from 'pages';

const Navbar = () => {
  const client = useApolloClient()
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);
  const { push } = useRouter()
  const [signOut] = useMutation(SignOutMutation)

  const handleSignOut = async () => {
    await signOut()
    await client.clearStore()
    push('/login')
  }

  const { viewer } = client.readQuery({
    query: ViewerQuery,
  });

  return (
    <Flex
      alignItems="center"
      justifyContent="space-between"
      pt={4}
      pb={4}
      maxW="1250px"
      margin="0 auto"
      w="full"
      px={8}
      h="60px"
    >
      <Flex align="center">
        {/* mobile nav menu */}
        <Box display={{ base: "block", md: "none" }}>
          <Menu onClose={() => setIsHamburgerOpen(false)} autoSelect={false}>
            <MenuButton onClick={() => setIsHamburgerOpen(!isHamburgerOpen)}>
              {isHamburgerOpen ? <CloseIcon /> : <HamburgerIcon />}
            </MenuButton>
            <MenuList>
              <MenuGroup title="">
                <CustomMenuLink href="/">Home</CustomMenuLink>
              </MenuGroup>
            </MenuList>
          </Menu>
        </Box>

        {/* desktop nav */}
        <Box display={{ base: "none", md: "block" }}>
          <CustomNavLink href="/">Home</CustomNavLink>
        </Box>
      </Flex>
      <Flex justifyContent="center" alignItems="center">
        <Menu autoSelect={false}>
          <MenuButton _hover={{ color: "primary" }} color="secondary">
            <Avatar name={viewer?.name} size="sm" bg="primary" />
            <Icon as={TriangleDownIcon} />
          </MenuButton>
          <MenuList>
            <MenuGroup title="">
              <MenuItem onClick={handleSignOut}>
                <Text marginRight="10px" cursor="pointer" color="red.500">Signout</Text>
              </MenuItem>
            </MenuGroup>
          </MenuList>
        </Menu>
      </Flex>
    </Flex>
  );
};

export default Navbar;
