import React from 'react'
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from '@chakra-ui/react';

const TextField = React.forwardRef((props: any, ref) => {
  const { label, name, errorMessage, ...rest } = props
  return (
    <FormControl isInvalid={errorMessage}>
      <FormLabel htmlFor={name}>
        {label}
      </FormLabel>
      <Input
        ref={ref}
        aria-label={label}
        id={name}
        name={name}
        {...rest}
      />
      <FormErrorMessage>
        {errorMessage}
      </FormErrorMessage>
    </FormControl>
  )
})

export default TextField
