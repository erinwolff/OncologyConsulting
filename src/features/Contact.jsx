import ContactForm from "./EmailForm"
import { Text } from "@chakra-ui/react"

export default function Contact() {
  return (
    <>
      <Text
        fontSize="2xl"
        textAlign="center"
        pt="10vh">
        For questions or more information, please reach out below.
      </Text>
      <ContactForm />
    </>
  )
}