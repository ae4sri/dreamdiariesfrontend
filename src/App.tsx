import React from 'react';
import LoginForm from './components/LoginForm';
import { DiaryList } from './components/DiaryList';
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from './store'
import diaryService from './services/diaries'
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, Center, Heading, Button, Link as ClickableLink } from '@chakra-ui/react'
import { UserDiaryList } from './components/UserDiaryList'
import { CreateDiaryModal } from './components/CreateDiaryModal'
import { RegisterForm } from './components/RegisterForm'
import { logout } from './states/userState';

function Nav() {
  const dispatch = useDispatch()

  const logoutUser = () => {
    dispatch(logout())
  }

  return (
<Breadcrumb spacing="8px">  
<BreadcrumbItem>
    <BreadcrumbLink as={Link} to="/publicdiaries">
      Public Dreams
    </BreadcrumbLink>
  </BreadcrumbItem>
  <BreadcrumbItem>
    <BreadcrumbLink as={Link} to="/mydiaries">
      My Dreams
    </BreadcrumbLink>
  </BreadcrumbItem>
  <BreadcrumbItem>
      <CreateDiaryModal />
  </BreadcrumbItem>
  <BreadcrumbItem>
  <ClickableLink onClick={logoutUser}>Logout</ClickableLink>
  </BreadcrumbItem>

</Breadcrumb>
  )
}
function App() {
  const user = useSelector((state: RootState) => state.user)
  if (user.token !== '') diaryService.setToken(user.token) // set authentification token for requests to server

  return (
    <>
    <Router>
      <div className="App">
      {user.username != '' && <Nav />}
        <Switch>
          <Route path="/publicdiaries">
            {user.username == '' && <Redirect to='/login' />}
            <DiaryList />
          </Route>
          <Route path="/mydiaries">
            {user.username == '' && <Redirect to='/login' />}
            <UserDiaryList />
          </Route>
          <Route path="/register">
            <Center><Heading>Register</Heading></Center>
            {user.username != '' && <Redirect to='/' />}
            <RegisterForm />
          </Route>
          <Route path="/login">
            <Center><Heading>Login Page</Heading></Center>
            <LoginForm />
            {user.username != '' && <Redirect to='/' />}
          </Route>
          <Route path='/'>
            {user.username == '' && <Redirect to='/login' />} 
            {user.username != '' && <Redirect to='/publicdiaries' />}
          </Route>
        </Switch>
      </div>
    </Router>
    </>
  )
  
}
export default App
