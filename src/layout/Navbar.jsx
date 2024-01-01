import { Card, Image, Flex, Box, Heading, Button, Spacer } from '@chakra-ui/react'
import { EmailIcon, InfoIcon, CheckIcon } from '@chakra-ui/icons'
import { Link as ReactRouterLink } from 'react-router-dom'
import { Link as ChakraLink } from '@chakra-ui/react'

export default function Navbar() {
  return (
    <>
      <Card
        direction={{ base: 'column', sm: 'row' }}
        overflow='hidden'
        variant='filled'
        p={5}
      >
        <Flex align='center' justify='space-between' w='100%' flexWrap='wrap'>
          <Box display='flex' alignItems='center' mb={{ base: 4, sm: 0 }}>
            <Image
              objectFit='cover'
              boxSize='60px'
              src='/logo_favicon.png'
              alt='Logo'
              m={2}
            />
            <Heading size='xl'>Oncology Consulting Wolff LLC </Heading>
          </Box>

          <Flex align='center' justify={{ base: 'center', sm: 'flex-end' }} flex='1'>
            <ChakraLink as={ReactRouterLink} to='/home'>
              <Button leftIcon={<InfoIcon />} colorScheme='blue' variant='solid' size='sm' m={1}>
                About Us
              </Button>
            </ChakraLink>

            <ChakraLink as={ReactRouterLink} to='/services'>
              <Button leftIcon={<CheckIcon />} colorScheme='blue' variant='solid' size='sm' m={1}>
                Services
              </Button>
            </ChakraLink>

            <ChakraLink as={ReactRouterLink} to='/contact'>
              <Button leftIcon={<EmailIcon />} colorScheme='blue' variant='solid' size='sm' m={1}>
                Contact Us
              </Button>
            </ChakraLink>
          </Flex>
        </Flex>
      </Card>
    </>
  );
}