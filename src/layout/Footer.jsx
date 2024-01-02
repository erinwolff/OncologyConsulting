import { Box, Card, Flex, Text, SimpleGrid, CardHeader, Heading, CardBody, Link } from '@chakra-ui/react';
import { ExternalLinkIcon } from '@chakra-ui/icons';

export default function Footer() {
  return (
    <Box as="footer" w="100%" zIndex="1000" mt="auto" pt={5}>
      <Card direction={{ base: 'column', sm: 'row' }} overflow="hidden" variant="filled" p={5}>
        <Flex align="center" justify="space-between" w="100%" flexWrap="wrap">
          <Box display="flex" alignItems="center" mb={{ base: 4, sm: 0 }} justifyContent="center" width="100%">
            <SimpleGrid spacing={4} templateColumns={{ base: '1fr', sm: 'repeat(3, 1fr)' }} minChildWidth={{ base: 'auto', sm: '300px' }} justifyContent='center' textAlign="center">
              <Card>
                <CardHeader>
                  <Heading size='md'> Location</Heading>
                </CardHeader>
                <CardBody>
                  <Text as="a" href="https://maps.app.goo.gl/38p8WZ4RagoaWEDF8" target="_blank" rel="noopener noreferrer">12418 138th Avenue <br />
                    Puyallup, WA 98374
                  </Text>
                </CardBody>
              </Card>
              <Card>
                <CardHeader>
                  <Heading size='md'> Contact</Heading>
                </CardHeader>
                <CardBody>
                  <Text fontSize="md">
                    <Text as="b">Email</Text>: <Text as="a" href="mailto:consulting.oncology@gmail.com" textDecor="underline">consulting.oncology@gmail.com</Text><br />
                    <Text as="b">Phone</Text>: +1 253 250 1037<br />
                  </Text>
                </CardBody>
              </Card>
              <Card>
                <CardHeader>
                  <Heading size='md'> Quick Links</Heading>
                </CardHeader>
                <CardBody>
                  <Link href='https://www.linkedin.com/in/johannes-wolff-md-phd-2a8998106/' isExternal>
                    LinkedIn<ExternalLinkIcon mx='2px' />
                  </Link>
                  <br />
                  <Link href='https://www.doximity.com/profiles/315a804f-665a-40f3-8521-8fb89b4c22ef/edit' isExternal>
                    Doximity<ExternalLinkIcon mx='2px' />
                  </Link>
                  <br />
                  <Link href='https://www.researchgate.net/profile/Johannes-Wolff-2' isExternal>
                    Research Gate<ExternalLinkIcon mx='2px' />
                  </Link>
                </CardBody>
              </Card>
            </SimpleGrid>
          </Box>
          <Box mt={4} width="100%">
            <Text fontSize="sm" textAlign="center">
              Oncology Consulting Wolff LLC is an American small company solely owned by the founder
              and structured as Limited Liability Company operating from the Seattle area in
              Washington State. The company provides services in person or outsources specific
              services to other small companies. Marketing is based on word by mouth, and personal
              professional network. Income is services per contract and revenue is invoiced.
            </Text>
          </Box>
        </Flex>
      </Card>
    </Box>
  );
}
