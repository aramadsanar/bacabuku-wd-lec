import React, { useState, useEffect } from 'react'
import bookApi from '../dataFetch/bookApi'
import BookItem from './common/BookItem'
import { List, ThemeProvider, GridList, Container } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import useDebounce from '../hooks/useDebounce'
import GridListTile from '@material-ui/core/GridListTile'
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
  const [books, setBooks] = useState(initialValue)
  const [searchQuery, updateSearchQuery] = useState('')
  const [isSearching, setIsSearching] = useState(false)
  const debouncedSearchQuery = useDebounce(searchQuery, 500)

  const handleSearchChange = e => {
    updateSearchQuery(e.target.value)
  }

  useEffect(() => {
    bookApi.getAllBooks().then(books => setBooks(books))
  }, [])

  useEffect(() => {
    console.log('qq', debouncedSearchQuery)
    if (debouncedSearchQuery) {
      setIsSearching(true)

      //callApi
      bookApi.findBooksByQuery(debouncedSearchQuery).then(({ data: books }) => {
        setIsSearching(false)
        setBooks(books)
      })
    } else {
      setBooks([])
    }
  }, [debouncedSearchQuery])
  return (
    <Container fixed className={classes.container}>
      <TextField
        id="standard-search"
        label="Search field"
        type="search"
        className={classes.textField}
        margin="normal"
        value={searchQuery}
        onChange={handleSearchChange}
      />

      <GridList cellHeight={160} className={classes.listBox} cols={3}>
        {books.map(book => (
          <BookItem
            key={`book-${book.id}`}
            bookTitle={book.title}
            bookId={book.id}
            pageCount={book.pageCount}
            bookImage={book.imageUrl}
          />
        ))}
      </GridList>
    </Container>
  )
}

export default BooksList
