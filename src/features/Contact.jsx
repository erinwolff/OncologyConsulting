import ContactForm from "./EmailForm"
import { Text } from "@chakra-ui/react"

export default function Contact() {
  return (
    <>
      <Text
        fontSize="2xl"
        textAlign="center"
        pt="10vh">
        For questions or more information, 
        <br/>please reach out to <Text as="a" href="mailto:johannes@wolffoncology.com" textDecor="underline">johannes@wolffoncology.com </Text> 
        <br/>or submit a message below.
      </Text>
      <ContactForm />
    </>
  )
}