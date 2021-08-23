import React, { useState } from 'react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    Button,
    FormControl,
    FormLabel,
    Input,
    Textarea,
    Select,
    Center,
    Link,
  } from "@chakra-ui/react"
  import { useDispatch } from 'react-redux'
  import { createDiary } from '../states/diaryState'
  import { useDisclosure } from '@chakra-ui/hooks'
  import diaryService from '../services/diaries'

export function CreateDiaryModal() {

  const dispatch = useDispatch()
  const [ title, setTitle ] = useState('')
  const [ text, setText ] = useState('')
  const [ privacy, setPrivacy ] = useState('')

  const { isOpen, onOpen, onClose } = useDisclosure()

  const handleCreate = async (event: React.SyntheticEvent<EventTarget>) => {
    event.preventDefault()
    if (!canBeSubmitted()) {
      return;
    }
    const diary = {
      text,
      title,
      priv: (privacy === 'true') 
    }
    try {
      const newDiary = await diaryService.createDiary(diary)
      dispatch(createDiary(newDiary))
      setText('')
      setTitle('')
      onClose()
    } 
    catch(e) {
      alert(e)
    }
    }

    const canBeSubmitted = () => {
      return (
          (5 <= title.length) && (30 >= title.length) && (text.length >= 10) &&  (text.length <= 500)
      )
    }
    const canSubmit = canBeSubmitted()
  return (
    <>
         <Link onClick={onOpen}>Write About A Dream</Link>

<Modal isOpen={isOpen} onClose={onClose}>
  <ModalOverlay />
  <ModalContent>
    <ModalHeader>Write about your dream</ModalHeader>
    <ModalCloseButton />
    <ModalBody>
      <form onSubmit={handleCreate}>
      <FormControl>
    <FormLabel>Title (5 to 30 chars)</FormLabel>
    <Input type="text" onChange={({ target }) => setTitle(target.value)} />
    <FormLabel>Dream Description (10 to 500 chars)</FormLabel>
    <Textarea onChange={({ target }) => setText(target.value)} />
    <FormLabel>Privacy Setting</FormLabel>
    <Select placeholder="Select option" onChange={({ target }) => setPrivacy(target.value)} >
    <option value="true">Private</option>
    <option value="false">Public</option>
    </Select>
    <br />
    <Center><Button disabled={!canSubmit} colorScheme="blue" mr={3} type="submit">Create Dream Journal Entry</Button></Center>
  </FormControl>
      </form>
    </ModalBody>

  </ModalContent>
</Modal>
    </>
  )
}