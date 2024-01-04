import { Card, Image, Flex, Box, Heading, Button } from '@chakra-ui/react';
import { EmailIcon, InfoIcon } from '@chakra-ui/icons';
import { Link as ReactRouterLink } from 'react-router-dom';
import { Link as ChakraLink, Icon } from '@chakra-ui/react';
import { LiaHandshake } from "react-icons/lia";

export default function Navbar() {
  return (
    <Card
      direction={{ base: 'column', sm: 'row' }}
      overflow='hidden'
      variant='filled'
      p={5}
    >
      <Flex align='center' justify='space-between' w='100%' flexWrap='wrap'>
        <Box display='flex' alignItems='center' mb={{ base: 4, sm: 0 }} textAlign={{ base: 'center', sm: 'left' }}>
          <Image
            objectFit='cover'
            boxSize={{ base: '40px', sm: '60px' }}
            src='/logo_favicon.png'
            alt='Logo'
            m={2}
          />
          <Heading size='xl'>Oncology Consulting Wolff LLC </Heading>
        </Box>

        <Flex align='center' justify={{ base: 'center', sm: 'flex-end' }} flex='1' mt={{ base: 4, sm: 0 }}>
          <ChakraLink as={ReactRouterLink} to='/home'>
            <Button leftIcon={<InfoIcon />} colorScheme='blue' variant='solid' size='sm' m={1}>
              About Us
            </Button>
          </ChakraLink>

          <ChakraLink as={ReactRouterLink} to='/services'>
            <Button colorScheme='blue' variant='solid' size='sm' m={1}>
              <Icon as={LiaHandshake} boxSize={{ base: 4, sm: 6 }} mr={2}/>Services
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
  );
}
