import React, { useState } from 'react'
import { Diary } from '../types'
import { useDispatch } from 'react-redux'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    Heading,
    FormControl,
    FormLabel,
    Input,
    Textarea,
    Select,
    Center
  } from "@chakra-ui/react"
import diaryService from '../services/diaries'
import { useDisclosure } from '@chakra-ui/hooks'
import { editDiary } from '../states/diaryState'
export function EditDiaryModal({ diaryText, diaryId, diaryPriv }: { diaryText: string, diaryId: string, diaryPriv: boolean }) {

  const { isOpen, onOpen, onClose } = useDisclosure()
  const [ text, setText ] = useState(diaryText)
  const [ privacy, setPrivacy ] = useState(diaryPriv.toString())

  const dispatch = useDispatch()


  const handleEdit = async (event: React.SyntheticEvent<EventTarget>) => {
    event.preventDefault()
    if (!canBeSubmitted()) {
      return;
    }
    const editObject = {
      id: diaryId,
      text, 
      priv: (privacy === 'true')
    }
    try {
      const editedDiary = await diaryService.editDiary(editObject.id, editObject.text, editObject.priv)
      dispatch(editDiary(editedDiary)) 
      setText('')
      onClose()
    } 
    catch(e) {
      alert(e)
    }
    }
    
    const canBeSubmitted = () => {
      return (
          (text.length >= 10) &&  (text.length <= 500)
      )
    }
    const canSubmit = canBeSubmitted()

  return (
    <>
         <Button onClick={onOpen}>Edit Dream</Button>

<Modal isOpen={isOpen} onClose={onClose}>
  <ModalOverlay />
  <ModalContent>
    <ModalHeader>Edit Dream</ModalHeader>
    <ModalCloseButton />
    <ModalBody>
      <form onSubmit={handleEdit}>
    <FormControl>
        <FormLabel>Edit Dream</FormLabel>
        <Textarea value={text} onChange={({ target }) => setText(target.value)}>{text}</Textarea>
        <FormLabel>Change Privacy Setting</FormLabel>
    <Select placeholder="Select One" onChange={({ target }) => setPrivacy(target.value)}>
    <option value="true">Private</option>
    <option value="false">Public</option>
    </Select>
        <br />
        <Center><Button disabled={!canSubmit} colorScheme="blue" mr={3} type="submit">Edit Dream</Button></Center>
    </FormControl>
      </form>
    </ModalBody>

  </ModalContent>
</Modal>
    </>
  )
}