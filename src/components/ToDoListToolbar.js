import React, { Component } from 'react'
import { MenuItem } from '@material-ui/core'

class ToDoListToolbar extends Component {
  state = {
    searchQuery: '',
    filterSelection: 'all',
    skip: 0,
    limit: 0
  }

  render() {
    const { filterSelection, searchQuery } = this.state
    return (
      <div>
        <TextField
          id="standard-search"
          label="Search field"
          type="search"
          value={searchQuery}
        />
        <FormControl className={classes.formControl}>
          <InputLabel id="searchFilterSelectionLabel">Status</InputLabel>
          <Select
            labelId="searchFilterSelection"
            value={filterSelection}
            onChange={() => console.log('')}
          >
            <MenuItem value={'all'}>All</MenuItem>
            <MenuItem value={'done'}>Done</MenuItem>
            <MenuItem value={'undone'}>Undone</MenuItem>
          </Select>
        </FormControl>
      </div>
    )
  }
}

export default ToDoListToolbar
