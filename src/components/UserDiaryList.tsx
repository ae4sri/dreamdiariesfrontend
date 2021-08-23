import React from 'react'
import { Diary } from '../types'
import { useSelector } from 'react-redux'
import { RootState } from '../store'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { DiaryTextModal } from './DiaryTextModal'
import { EditDiaryModal } from './EditDiaryModal'
import { deleteDiary } from '../states/diaryState'
import diaryService from '../services/diaries'
import { setDiaries } from '../states/diaryState'
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  Button,
  Heading,
} from "@chakra-ui/react"
// import { addDiary, removeDiary, initializeDiaries } from '../features/counter/diaryState'

export function UserDiaryList() {

  const dispatch = useDispatch()

  useEffect(() => {
    async function fetch() {
      try {
        const usersDiaries = await diaryService.getUsersDiaries()
        dispatch(setDiaries(usersDiaries))
      } catch(e) {
        alert(e)
      }

    }
    fetch()
  }, [dispatch])

  const user = useSelector((state: RootState) => state.user)

  const diaries = useSelector((state: RootState) => state.diaries)

  const handleDelete = async (id: string) => {
    try {
      dispatch(deleteDiary(id))
    } 
    catch(e) {
      alert(e)
    }
    }

  return (
    <div>
      <Heading>Your Dreams</Heading>
      <Table>
      <TableCaption>Your Dream Journal</TableCaption>
        <Thead>
          <Tr>
            <Th>Diary Title</Th>
            <Th>Date</Th>
            <Th>Diary</Th>
            <Th>Private</Th>
            <Th>Delete</Th>
            <Th>Edit Entry</Th>
          </Tr>
        </Thead>
        <Tbody>
        {
          Object.values(diaries).map((diary: Diary) => {
            return (
              <Tr key={diary.id}>
                <Td>{diary.title}</Td>
                <Td>{diary.date.substring(0, 10)}</Td>
                <Td color="blue"><DiaryTextModal diaryText={diary.text} /></Td>
                <Td>{diary.priv.toString()}</Td>
                <Td><Button onClick={() => handleDelete(diary.id)}>Delete Diary</Button></Td>
                <Td><EditDiaryModal diaryText={diary.text} diaryId={diary.id} diaryPriv={diary.priv}/></Td>
              </Tr>
            )
          })
        }
        </Tbody>
      </Table>
    </div>
  )
}