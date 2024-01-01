import { Card, Image, Stack, CardBody, Heading, Text } from '@chakra-ui/react'
import { Link as ReactRouterLink } from 'react-router-dom'
import { Link as ChakraLink } from '@chakra-ui/react'

export default function Navbar() {

  return (
    <>
      <Card
        direction={{ base: 'column', sm: 'row' }}
        overflow='hidden'
        variant='outline'
      >
        <Image
          objectFit='cover'
          boxSize='100px'
          src='/logo_favicon.png'
          alt='Logo'
        />

        <Stack>
          <CardBody>
            <Heading size='lg'>Oncology Consulting Wolff LLC </Heading>
            <Text fontSize='xl'>
              <ChakraLink as={ReactRouterLink} to='/home'>About Us</ChakraLink> | 
              <ChakraLink as={ReactRouterLink} to='/services'> Services</ChakraLink> | 
              <ChakraLink as={ReactRouterLink} to='/contact'> Contact Us</ChakraLink>
            </Text>
          </CardBody>
        </Stack>
      </Card>
    </>
  );
}
