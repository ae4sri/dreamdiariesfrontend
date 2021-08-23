import React from "react";
import { useState } from "react";
import { RootState } from "../store";
import { useSelector, useDispatch } from 'react-redux'
import { Link as BrowserLink } from 'react-router-dom'
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Button,
  Center,
  Link,
  Box,
  Divider
} from "@chakra-ui/react"
import userService from '../services/users'
import { Redirect } from "react-router";
import { setUser } from "../states/userState";

export function RegisterForm() {

  const dispatch = useDispatch()
  // eslint-disable-next-line no-var
  const redirect = false

  const handleRegister = async (event: React.SyntheticEvent<EventTarget>) => {
    event.preventDefault()
    if (!canBeSubmitted()) {
        return;
      }
    try {
      const user = await userService.createUser({ username, password })
      dispatch(setUser(user))
    } catch(e) {
      alert(e)
    }

  }

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const canBeSubmitted = () => {
    return (
        (password === confirmPassword) && (password.length >= 5) && (username.length >= 3)
    );
  }

  const canSubmit = canBeSubmitted()

      return (
        <Center>
        <form onSubmit={handleRegister}>
  <FormControl paddingTop="10">
    <FormLabel>Username (minimum 3 characters)</FormLabel>
    <Input type="text" value={username} onChange={({ target }) => setUsername(target.value)} />
    <FormLabel paddingTop="5">Password (minimum 5 characters)</FormLabel>
    <Input type="password" value={password} onChange={({ target }) => setPassword(target.value)} />
    <FormLabel paddingTop="5">Confirm Password (must be the same as password)</FormLabel>
    <Input type="password" value={confirmPassword} onChange={({ target }) => setConfirmPassword(target.value)} />
    <Button disabled={!canSubmit} type="submit">Register</Button> <BrowserLink to="/login"><Button>Back to Login</Button></BrowserLink>
  </FormControl>
  {redirect && <Redirect to="/login" />}

  </form>
  </Center>
      )
  }
      

