import React from 'react'
import { Diary } from '../types'
import { useSelector } from 'react-redux'
import { RootState } from '../store'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setDiaries } from '../states/diaryState'
import { DiaryTextModal } from './DiaryTextModal'
import diaryService from '../services/diaries'
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  Heading
} from "@chakra-ui/react"
// import { addDiary, removeDiary, initializeDiaries } from '../features/counter/diaryState'

export function DiaryList() {

  const dispatch = useDispatch()

  useEffect(() => {
    async function fetch() {
      const initialDiaries = await diaryService.getPublicDiaries()
      dispatch(setDiaries(initialDiaries))
    }
    fetch()
  }, [dispatch])
  
  const diaries = useSelector((state: RootState) => state.diaries).filter(d => d.priv == false) // state holds all diaries for page, so filter out users private diaries for this page


  return (
    <div>
      <Heading>Public Dreams</Heading>
      <Table>
      <TableCaption>Public Dream Journal Entries</TableCaption>
        <Thead>
          <Tr>
            <Th>Title</Th>
            <Th>Date</Th>
            <Th>Dream</Th>
            <Th>User</Th>
          </Tr>
        </Thead>
        <Tbody>
        {
          Object.values(diaries).map((diary: Diary) => {
            return (
              <Tr key={diary.id}>
                <Td>{diary.title}</Td>
                <Td>{diary.date.substring(0, 9)}</Td>
                <Td color="blue"><DiaryTextModal diaryText={diary.text} /></Td>
                <Td>{diary.user.username}</Td>
              </Tr>
            )
          })
        }
        </Tbody>
      </Table>
    </div>
  )
}