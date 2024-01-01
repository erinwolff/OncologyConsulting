import { Heading } from '@chakra-ui/react'
import { Text } from '@chakra-ui/react'
import { Card } from '@chakra-ui/react'

export default function Home() {
  return (
    <>
      <Card>
        <Heading>Vision</Heading>
        <Text fontSize='md'>To improve cancer care by fostering oncology drug development, innovative study designs and data analyses, taking the individual needs of current patients, clinical investigators, drug developers, sponsors and shareholders into account and synchronizing them to the cure even more patients with cancer in the future.</Text>
      </Card>
      <br />
      <Heading>Founder and CMO: Johannes Wolff</Heading>
      <Text fontSize='md'>Dr med habil Johannes E Wolff, MD PhD is an accomplished medical researcher, physician, and drug developer.  He has completed medical training in Germany to be bord certified pediatric hematologist oncologist.  His medical practice of three decades was in Europe, Canada and the United States, and he considers among all these places MDAnderson Cancer Center in Houston his academic home.  He developed, wrote, lead and published international cooperative clinical trials, tested novel drugs in his laboratories, taught biostatistics, spearheaded immune therapy, and personalized targeted therapy.  His academic titles included the title of professor in four different universities, and his administrative roles went beyond staff physician and medical faculty to section head (MDAnderson), divisions chief (Tufts), and department chair (Cleveland Clinic).  His move to the pharmaceutical industry came after over 200 peer reviewed publications, and it started in Medical Affairs in Novartis.  Within the pharmaceutical industry, Johannes Wolff calls AbbVie his home, where he worked in late development (Venetoclax), early oncology development, and safety.  After moving to smaller companies to become perficient in the business agility necessary for resource poor environments, he now runs his own company allowing to independently distribute his experience wider.  </Text>
      <Heading>Business Address</Heading>
      <Text fontSize='md'>12418 138th Ave, WA  Puyallup 98374<br />
        <Text as='b'>Email</Text>: consulting.oncology@gmail.com<br />
        <Text as='b'>Phone</Text>: +1 253 250 1037<br />
      </Text>
      <Heading>Business Model</Heading>
      <Text fontSize='md'>Oncology Consulting Wolff LLC is an American small company solely owned by the founder and structured as Limited Liability Company operating from the Seattle area in Washington State.  The company provides services in person or outsources specific services to other small companies.  Marketing is based on word by mouth, and personal professional network.  Income is services per contract and revenue is invoiced.</Text>
    </>
  );
}

