import { Tabs, TabList, Tab, TabPanels, TabPanel, Card, Heading, Text, UnorderedList, ListItem, Image, Center } from '@chakra-ui/react';


export default function Services() {
  return (
    <>
      <Card direction={{ base: 'column', sm: 'row' }}
        overflow='hidden'
        variant='unstyled'
        mt={{ base: 5, sm: 10 }}
        mx='auto'
        alignContent='center'
        maxW='sm'>
        <Heading textAlign="center" mx="auto">Our Services</Heading>
      </Card>
      <br />
      <Card
        maxW={{ base: '100vw', lg: '90vw' }}
        mx='auto'
        variant='filled'
        mt={{ base: 10, sm: 30 }}
        mb={{ base: 10, sm: 30 }}>
        <Tabs
          isFitted
          variant='solid-rounded'
          colorScheme='blue'
          defaultIndex={0}>
          <TabList mb={{ base: '0.5em', sm: '1em' }} flexWrap="wrap">
            <Tab>Medical Monitoring</Tab>
            <Tab>Data Review</Tab>
            <Tab>Order a Product</Tab>
            <Tab>Strategic Consultation & Leadership</Tab>
            <Tab>Teaching, Coaching, Education</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Center>
                <UnorderedList spacing={3}>
                  <ListItem>Protocol writing </ListItem>
                  <ListItem>Site selection </ListItem>
                  <ListItem>Site Initiation Visits </ListItem>
                  <ListItem>Investigator relation management </ListItem>
                  <ListItem>Patient eligibility </ListItem>
                  <ListItem>Causality assessment of Adverse Events </ListItem>
                  <ListItem>Aggregate data review </ListItem>
                  <ListItem>Publications </ListItem>
                  <ListItem>And others </ListItem>
                </UnorderedList>
              </Center>
              <br />
              <Text marginLeft="10vw" marginRight="10vw" textAlign="left">The service is typically structured similarly to the Job description of an employed senior medical director in the pharmaceutical industry. It includes all medical functions from protocol development over study conduct to result reporting. Core specific items may include site initiation visits, checking eligibility criteria of potential patients to be enrolled, review of safety events, investigator meetings, and review of aggregate data. The consultant is embedded in the study team and provides medical advice to Clinical Operation team, Biometrics, Biomarkers, and other functions. Safety monitoring functions such as 24 hour medical coverage, adverse event causality assessment, CIOMs narratives, aggregate data review, or safety work ups may or may not be included. Safety operation such as SUSAR reporting is not offered at this point in time. The service is typically compensated on hourly basis.
              </Text>
              <br />
              <Center>
                <Image alignItems='center' src="/medical_monitoring.jpg" alt="Medical Monitoring" objectFit='cover' maxW='100%' />
              </Center>
            </TabPanel>
            <TabPanel>
              <Text>These are services combining Medical expertise with basic statistics in various degrees:</Text>
              <UnorderedList>
                <br />
                <ListItem><Text as='b'>Aggregate Safety Data Reviews</Text>:
                  <br /><Text>The customer is a pharmaceutical company conducting a clinical trial, a sponsor in ICH terminology. They deliver tables and listings. The review is a part of the risk management plan of the sponsor. Typical data are TEAE or SAEs or related drug reactions ranked by frequency in columns of treatment arms or cohorts or dose levels, or grades. Consulting Wolff LLC reviews the data for detection of safety signals, items (red flags) to be queried (cleaned) before the data are to be presented outside the company, and strategic advice on risk management, and data presentation. In phase 3 studies, the data are typically fire-walled from the clinical development department, and privy only to high level leadership and the safety department.  Findings are summarized as Word document or PowerPoint slide deck, and presented in a Video conference.</Text></ListItem>
                <br />
                <ListItem><Text as='b'>Efficacy Data Bench Mark Creation by Review of Literature and Labels</Text>:
                  <br /><Text>The customer is a pharmaceutical company conducting or planning a clinical trial. They deliver desired indication including histological diagnosis, stage, age, and previous line of treatment, tables and listings. The review is a part of the risk management plan of the sponsor. Consulting Wolff LLC reviews the existing literature, summarizes it in a power point presentation, and makes a concluding recommendation on which endpoint to use, and bench mark to assign for further development. The depth of the research can vary and is agreed upon in the project outline. In the minimum this may be the selection of the best suitable published comparator, in maximum it may be a complete formal meta-analysis.</Text></ListItem>
                <br />
                <ListItem><Text as='b'>Efficacy Study Data Exploratory Analysis</Text>:
                  <br /><Text>The customer is a pharmaceutical company conducting or planning a clinical trial. The customer is a pharmaceutical company conducting a clinical trial, a sponsor in ICH terminology. They deliver data in Excel. The data structure is one line per patient. Variables (columns) are previously agreed upon, and typically include prognostic indicators such as tumor stage, previous lines of treatment as well as outcome variables such as best overall response (BOR), time on treatment, or event free survival. The data are typically not cleaned, and not source verified. Consulting Wolff LLC will review and analyze the data. The product is a PowerPoint presentation with key findings, and an SPSS report of all calculations included in the final version.  The finding will include: Red flags: items that appear unlikely, should result in a query or further explanation before presenting the data outside of the company, an aggregate overview of the observed efficacy (overall response rates, median PFS as applicable), a comparison to the bench mark or TPP, and strategic recommendations for further study conduct.</Text></ListItem>
              </UnorderedList>
              <br />
              <Center>
                <Image alignItems='center' src="/data.png" alt="Data Review" objectFit='cover' maxW='100%' />
              </Center>
            </TabPanel>
            <TabPanel>
              <Text> These are services that have a tangible product as outcome.</Text>
              <UnorderedList>
                <br />
                <ListItem><Text as='b'>Clinical Development Plan</Text>:
                  <br /><Text>Based upon mechanism of action, animal data, Target product Profile, and company vision, the CDP will be created in communication with team and leadership, and presented as a PowerPoint product describing to company leadership, investors, and company employees.  It starts with the first in human (FIH) trial, and ends the vision of approval.  It includes indication, patient numbers, decision points, bench marks, geostrategy, and time lines.</Text></ListItem>
                <br />
                <ListItem><Text as='b'>Protocol Writing</Text>:
                  <br /><Text>Based upon the CDP, and existing data, patient numbers based upon a statistical power calculation delivered by the sponsor, and potentially a company protocol template, Oncology Consulting Wolff LLC will deliver a first draft for a protocol.  Thereafter a company review is supported, comments are included, and a second draft is created.</Text></ListItem>
                <br />
                <ListItem><Text as='b'>Publications</Text>:
                  <br /><Text>Conference posters (PowerPoint), review articles, clinical trial publications are typical products to be ordered and delivered to the customer.</Text></ListItem>
              </UnorderedList>
              <br />
              <Center>
                <Image alignItems='center' src="/development_plan.jpg" alt="Development Plan" objectFit='cover' maxW='70%' />
              </Center>
            </TabPanel>
            <TabPanel>
              <Text>These services are very flexible and dependent on the status of the drug development.  They may include developing the medical components of the IND, CDP, NDA, or launch.  Data review, competitive intelligence may be a part of the preparation work.  Internal or external presentations may be part of the deliverables.
              </Text>
              <br />
              <Center>
                <Image alignItems='center' src="/consulting.jpg" alt="Consulting" objectFit='cover' maxW='70%' />
              </Center>
            </TabPanel>
            <TabPanel>
              <UnorderedList>
                <ListItem><Text><Text as="b">Didactic lectures</Text> for specific oncology indications, response definitions, drug classes, clinical trial best practice, and basics in biostatistics will be provided specifically tailored to the customers needs.</Text></ListItem>
              <br />
              <ListItem><Text><Text as="b">Mentoring</Text> of junior employees, in particular medical and safety directors will be provided on scheduled one on one video conference basis, as well as providing resources, and out of schedule point of contact support.</Text></ListItem>
              <br />
              <ListItem><Text><Text as="b">Coaching</Text> of senior employees, focusing on medical doctors switching to the industry on senior levels will be provided as a structured process over a predetermined time period.  This may include an initial assessment of issues that may have occurred, personal meetings, a coaching plan, scheduled one on one video conference basis, and out of schedule point of contact support, a midterm coaching assessment, and a final project conclusion.</Text></ListItem>
            </UnorderedList>
            <br />
            <Center>
              <Image alignItems='center' src="/coaching.jpg" alt="Coaching" objectFit='cover' maxW='80%' />
            </Center>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Card >
    </>
  )
}