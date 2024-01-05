import React from 'react';
import { useForm, ValidationError } from '@formspree/react';
import { Input, Button, Stack, InputGroup, InputLeftElement, Card, Flex, Text, Textarea } from '@chakra-ui/react';
import { LiaMailBulkSolid, LiaPhoneSolid, LiaUser } from "react-icons/lia";

export default function ContactForm() {
  const [state, handleSubmit] = useForm("myyryjlg");
  if (state.succeeded) {
    return <Text fontSize="xl" textAlign="center" pt={10} pb="38vh">Thank you for your message!</Text>;
  }
  return (
    <Flex direction="column" align="center" minH="48vh">

      <Card
        direction={{ base: 'column', sm: 'row' }}
        overflow='hidden'
        variant='unstyled'
        mx='auto'
        pt={10}
        alignContent='center'
      >

        <form onSubmit={handleSubmit}>

          <Stack spacing={4}>

            <InputGroup>
              <InputLeftElement pointerEvents='none'>
                <LiaMailBulkSolid color='gray.300' />
              </InputLeftElement>
              <Input
                variant="outline"
                placeholder="Email Address"
                id="email"
                type="email"
                name="email"
                w={{ base: '80vw', sm: '500px' }}
              />
              <ValidationError
                prefix="Email"
                field="email"
                errors={state.errors}
              />
            </InputGroup>

            <InputGroup>
              <InputLeftElement pointerEvents='none'>
                <LiaUser color='gray.300' />
              </InputLeftElement>
              <Input
                type="text"
                variant="outline"
                placeholder="Name"
                id="name"
                name="name"
                w={{ base: '80vw', sm: '500px' }}
              />
              <ValidationError
                prefix="Name"
                field="name"
                errors={state.errors}
              />
            </InputGroup>

            <InputGroup>
              <InputLeftElement pointerEvents='none'>
                <LiaPhoneSolid color='gray.300' />
              </InputLeftElement>
              <Input
                id="phone"
                name="phone"
                type="tel"
                placeholder="Phone Number"
                variant="outline"
                w={{ base: '80vw', sm: '500px' }}
              />
              <ValidationError
                prefix="Phone"
                field="phone"
                errors={state.errors}
              />
            </InputGroup>

            <Textarea
              id="message"
              name="message"
              type="text"
              variant="outline"
              placeholder="Message"
              w={{ base: '80vw', sm: '500px' }}
            />
            <ValidationError
              prefix="Message"
              field="message"
              errors={state.errors}
            />

            <Button
              type="submit"
              disabled={state.submitting}
              colorScheme='blue'
              variant="solid"
              w={{ base: '80vw', sm: '500px' }}
              mx='auto'>
              Submit
            </Button>

          </Stack>

        </form>

      </Card>
    </Flex>
  );
}
