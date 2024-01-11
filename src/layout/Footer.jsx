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
                  <Text>Puyallup, WA 98374
                  </Text>
                </CardBody>
              </Card>
              <Card>
                <CardHeader>
                  <Heading size='md'> Contact</Heading>
                </CardHeader>
                <CardBody>
                  <Text fontSize="md">
                    <Text as="b">Email</Text>: <Text as="a" href="mailto:johannes@wolffoncology.com" textDecor="underline">johannes@wolffoncology.com </Text><br />
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
                  <Link href='https://www.researchgate.net/profile/Johannes-Wolff-2' isExternal>
                    Research Gate<ExternalLinkIcon mx='2px' />
                  </Link>
                  <br />
                  <Link href='https://pubmed.ncbi.nlm.nih.gov/?term=wolff+JE%5Bau%5D' isExternal>
                    PubMed<ExternalLinkIcon mx='2px' />
                  </Link>
                </CardBody>
              </Card>
            </SimpleGrid>
          </Box>
          <Box mt={4} width="100%" textAlign="center">
            <Text as="a" href="https://www.linkedin.com/in/erinmwolff/" target="_blank" rel="noopener noreferrer" fontSize="xs">Website Designed by Erin Wolff
            </Text>
          </Box>
        </Flex>
      </Card>
    </Box>
  );
}
