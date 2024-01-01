import { Card, Image, Flex, Box, Heading, Button } from '@chakra-ui/react'
import { EmailIcon, InfoIcon, CheckIcon } from '@chakra-ui/icons'
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
        <Flex align='center' justify='space-between' w='100%'>
          <Box display='flex' alignItems='center'>
            <Image
              objectFit='cover'
              boxSize='60px'
              src='/logo_favicon.png'
              alt='Logo'
              m={2}
            />
            <Heading size='2xl'>Oncology Consulting Wolff LLC </Heading>
          </Box>

          <Flex align='center'>
            <ChakraLink as={ReactRouterLink} to='/home'>
              <Button leftIcon={<InfoIcon />} colorScheme='telegram' variant='ghost' size='lg' m={2}>
                About Us
              </Button>
            </ChakraLink>

            <ChakraLink as={ReactRouterLink} to='/services'>
              <Button leftIcon={<CheckIcon />} colorScheme='telegram' variant='ghost' size='lg' m={2}>
                Services
              </Button>
            </ChakraLink>

            <ChakraLink as={ReactRouterLink} to='/contact'>
              <Button leftIcon={<EmailIcon />} colorScheme='telegram' variant='ghost' size='lg' m={2}>
                Contact Us
              </Button>
            </ChakraLink>
          </Flex>
        </Flex>
      </Card>
    </>
  );
}