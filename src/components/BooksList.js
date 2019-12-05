import React, { useState, useEffect } from 'react'
import bookApi from '../dataFetch/bookApi'
import BookItem from './common/BookItem'
import { List, ThemeProvider, GridList, Container } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'

const initialValue = []

const useStyles = makeStyles(theme => {
  return {
    listBox: {
      margin: theme.spacing(8),
      display: 'flex',
      flexDirection: 'row'
    },
    container: {
      alignItems: 'center'
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: '100%'
    }
  }
})

function BooksList() {
  const classes = useStyles()
  const [books, updateBooks] = useState(initialValue)
  const [searchQuery, updateSearchQuery] = useState('')

  useEffect(() => {
    bookApi.getAllBooks().then(books => updateBooks(books))
  }, [])

  return (
    <Container fixed className={classes.container}>
      <TextField
        id="standard-search"
        label="Search field"
        type="search"
        className={classes.textField}
        margin="normal"
      />
      <GridList cellHeight={160} className={classes.listBox} cols={3}>
        {books.map(book => (
          <BookItem
            bookTitle={book.title}
            bookId={book.id}
            pageCount={book.pageCount}
            bookImage={`${process.env.PUBLIC_URL}${book.imageUrl}`}
          />
        ))}
      </GridList>
    </Container>
  )
}

export default BooksList
