import React, { useState, useEffect } from 'react'
import bookApi from '../dataFetch/bookApi'
import BookItem from './common/BookItem'
import { List, ThemeProvider, GridList, Container } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const initialValue = []

const useStyles = makeStyles(theme => {
  return {
    listBox: {
      margin: theme.spacing(8),
      display: 'flex',
      flexDirection: 'row'
    }
  }
})

function BooksList() {
  const classes = useStyles()
  const [books, updateBooks] = useState(initialValue)

  useEffect(() => {
    bookApi.getAllBooks().then(books => updateBooks(books))
  }, [])

  return (
    // <List class={classes.listBox}>

    // </List>

    <Container fixed>
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
