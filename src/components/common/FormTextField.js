import React from 'react'
import {
  Paper,
  withStyles,
  Grid,
  TextField,
  Button,
  FormControlLabel,
  Checkbox
} from '@material-ui/core'
import { Person, Fingerprint } from '@material-ui/icons'

function FormTextField(props) {
  const { icon, id, type, label, ...rest } = props
  return (
    <Grid container spacing={8} alignItems="flex-end">
      <Grid item>{icon ? icon : null}</Grid>
      <Grid item md={true} sm={true} xs={true}>
        <TextField id={id} type={type} label={label} {...rest} />
      </Grid>
    </Grid>
  )
}

export default FormTextField
