import React, { useState } from 'react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalBody,
    ModalCloseButton,
    Text,
    Link
  } from "@chakra-ui/react"

  import { useDisclosure } from '@chakra-ui/hooks'

export function DiaryTextModal({ diaryText }: { diaryText: string }) {
  
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
         <Link onClick={onOpen}>Read Dream</Link>

<Modal isOpen={isOpen} onClose={onClose}>
  <ModalOverlay />
  <ModalContent>
    <ModalCloseButton />
    <ModalBody>
      <br />
        <Text>{diaryText}</Text>
    </ModalBody>

  </ModalContent>
</Modal>
    </>
  )
}