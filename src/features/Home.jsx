import { Heading } from '@chakra-ui/react'
import { Text } from '@chakra-ui/react'
import { Card, CardBody, Image, Stack, Flex  } from '@chakra-ui/react'

export default function Home() {
  return (
    <>
      <Card
        direction={{ base: 'column', sm: 'row' }}
        overflow='hidden'
        variant='outline'
        mt={5}
        mx='auto'
        alignContent='center'
        maxW='4xl'
      >
        <Stack>
          <CardBody>
            <Heading
              size='xl'
              textAlign='center'>
              Vision
            </Heading>
            <Text
              py='2'
              textAlign='center'>
              To improve cancer care by fostering oncology drug development, innovative study designs and data analyses, taking the individual needs of current patients, clinical investigators, drug developers, sponsors and shareholders into account and synchronizing them to the cure even more patients with cancer in the future.
            </Text>
          </CardBody>
        </Stack>
        <Image
          objectFit='cover'
          maxW={{ base: '100%', sm: '300px' }}
          src='/mountain.jpg'
          alt='Mt. Rainier'
        />
      </Card>

      <Card
        overflow='hidden'
        variant='outline'
        maxW='90%'
        mt={6}
        varient='outline'
        mx={{ base: 4, sm: 'auto' }}
      >
        <Flex
          direction={{ base: 'column', sm: 'row' }}
          align='center'
          justify='center'
        >
          <Image
            objectFit='cover'
            maxW={{ base: '100%', sm: '300px' }}
            src='/johannes.jpg'
            alt='Johannes Wolff'
          />
          <Stack spacing='3' mt={{ base: 5, sm: 0 }} ml={{ sm: 4 }}>
            <Heading size='xl'>Johannes Wolff</Heading>
            <Text fontSize='2xl'>Founder and CMO</Text>
            <Text gridColumn={{ sm: 'span 2' }}>
              Dr med habil Johannes E Wolff, MD PhD is an accomplished medical researcher, physician, and drug developer. He has completed medical training in Germany to be board certified pediatric hematologist oncologist. His medical practice of three decades was in Europe, Canada, and the United States, and he considers among all these places MDAnderson Cancer Center in Houston his academic home. He developed, wrote, led, and published international cooperative clinical trials, tested novel drugs in his laboratories, taught biostatistics, spearheaded immune therapy, and personalized targeted therapy.
              <br />
              <br />His academic titles included the title of professor in four different universities, and his administrative roles went beyond staff physician and medical faculty to section head (MDAnderson), divisions chief (Tufts), and department chair (Cleveland Clinic). His move to the pharmaceutical industry came after over 200 peer-reviewed publications, and it started in Medical Affairs in Novartis. Within the pharmaceutical industry, Johannes Wolff calls AbbVie his home, where he worked in late development (Venetoclax), early oncology development, and safety. After moving to smaller companies to become proficient in the business agility necessary for resource-poor environments, he now runs his own company allowing to independently distribute his experience wider.
            </Text>
          </Stack>
        </Flex>
      </Card >
    </>
  );
}

