import React from "react";
import { useState, useEffect } from "react";
import { RootState } from "../store";
import { useSelector, useDispatch } from 'react-redux'
import { setUser } from "../states/userState";
// import { loginUser } from "../states/userState";
import loginService from '../services/login'
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Button,
  Center,
  Box
} from "@chakra-ui/react"
import { Link } from 'react-router-dom'

const LoginForm = () => {

  const dispatch = useDispatch()

  const handleLogin = async (event: React.SyntheticEvent<EventTarget>) => {
    event.preventDefault()
    if (!canBeSubmitted()) {
        return;
      }
    try {
      const user = await loginService.login({ username, password })
      await dispatch(setUser(user))
      setUsername('')
      setPassword('')
    } catch(e) {
      alert("Login failed, error: " + e)
    }
  }

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const canBeSubmitted = () => {
    return (
        (password.length >= 5) && (username.length >= 3)
    );
  }

  const canSubmit = canBeSubmitted()

      return (
        <Center>
        <form onSubmit={handleLogin}>
  <FormControl>
    <FormLabel>Username</FormLabel>
    <Input type="text" value={username} onChange={({ target }) => setUsername(target.value)} />
    <FormLabel>Password</FormLabel>
    <Input type="password" value={password} onChange={({ target }) => setPassword(target.value)} />
    <Button disabled={!canSubmit} type="submit">Login</Button> <Link to="register"><Button>Register</Button></Link>
    
  </FormControl>
  </form>
  </Center>
      )
  }
      

  export default LoginForm