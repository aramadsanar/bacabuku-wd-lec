import React, { useState } from 'react'

import { Paper, Grid, Button } from '@material-ui/core'
import { Person, VpnKey } from '@material-ui/icons'
import FormTextField from './common/FormTextField'

import authApi from '../dataFetch/authApi'

const styles = theme => ({
  margin: {
    margin: theme.spacing.unit * 2
  },
  padding: {
    padding: theme.spacing.unit
  }
})
const initialValue = {
  username: '',
  password: ''
}
function Login() {
  const [loginData, updateLoginData] = useState(initialValue)
  const handleChange = e => {
    let currentValue = e.target.value
    let inputId = e.target.id

    updateLoginData(prevLoginData => {
      return { ...prevLoginData, [inputId]: currentValue }
    })
  }

  const authenticateLogin = async () => {
    const { username, password } = loginData

    let result = await authApi.login(username, password)

    if (result) {
      localStorage.setItem('user_jwt', result.jwt_token)
    }
  }
  return (
    <Paper className="loginComponent">
      <div className="loginDiv">
        <FormTextField
          icon={<Person />}
          id="username"
          type="text"
          label="Username"
          fullWidth
          autoFocus
          required
          onChange={handleChange}
          value={loginData.username}
        />
        <FormTextField
          icon={<VpnKey />}
          id="password"
          type="password"
          label="Password"
          onChange={handleChange}
          value={loginData.password}
          fullWidth
          required
        />
        <Grid container justify="center" style={{ marginTop: '10px' }}>
          <Button
            variant="contained"
            color="primary"
            onClick={authenticateLogin}
          >
            Login
          </Button>
        </Grid>
      </div>
    </Paper>
  )
}

export default Login
