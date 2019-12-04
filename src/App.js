import React from 'react'
import logo from './logo.svg'
import './App.css'
import Login from './components/Login'
import { Route, Redirect, Switch } from 'react-router-dom'
import ProtectedRoute from './components/common/ProtectedRoute'
import Pricing from './components/PageTemplate'
import PageHeader from './components/common/PageHeader'
import PageFooter from './components/common/PageFooter'
import { Container } from '@material-ui/core'
import { Box } from '@material-ui/core/Box'
import SignIn from './components/LoginPageTemplate'
import Register from './components/Register'
import Logout from './components/Logout'

const Placeholder = ({ text }) => {
  return <h1>{text}</h1>
}

const styles = {
  marginTop: '16dp'
}

function App() {
  return (
    <React.Fragment>
      <header>
        <PageHeader />
      </header>
      <Container className="container" style={styles}>
        <Switch>
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <Route path="/logout" component={Logout} />
          <ProtectedRoute
            path="/books"
            component={props => <Placeholder text="books list" />}
          />
          <ProtectedRoute
            path="/book/:id"
            component={props => <Placeholder text="book item" />}
          />
          <Route
            path="/not-found"
            component={props => <Placeholder text="not found 404" />}
          />
          <Redirect from="/" exact to="/login" />
          <Redirect to="/not-found" />
        </Switch>
      </Container>
      <footer>
        <PageFooter />
      </footer>
    </React.Fragment>
    // <SignIn />
  )
}

export default App
