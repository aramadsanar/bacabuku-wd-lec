import React from 'react'
import logo from './logo.svg'
import './App.css'
import Login from './components/Login'
import { Route, Redirect, Switch } from 'react-router-dom'
import ProtectedRoute from './components/common/ProtectedRoute'

const Placeholder = ({ text }) => {
  return <h1>{text}</h1>
}

function App() {
  return (
    <React.Fragment>
      <div className="container">
        <Switch>
          <Route path="/register" component={<Placeholder text="register" />} />
          <Route path="/login" component={Login} />
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
      </div>
    </React.Fragment>
  )
}

export default App
