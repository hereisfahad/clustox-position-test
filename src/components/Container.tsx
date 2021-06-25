import { Flex, FlexProps } from '@chakra-ui/react'

import Navbar from './Navbar'

const Container = (props: FlexProps) => {

  return (
    <>
      <Navbar />
      <Flex
        direction="column"
        alignItems="center"
        justifyContent="flex-start"
        bg="gray.50"
        color="black"
        {...props}
      />
    </>
  )
}

export default Container
