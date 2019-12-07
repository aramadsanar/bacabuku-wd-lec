import React, { useEffect, useState } from 'react'
import { Typography, CircularProgress } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import PdfReader from './common/PdfReader'
import bookApi from '../dataFetch/bookApi'

const useStyles = makeStyles(theme => ({
  titleText: {
    ...theme.typography.button,
    backgroundColor: theme.palette.background.paper
  },
  readingArea: {
    margin: theme.spacing(2)
  }
}))

function ReadBook(props) {
  const classes = useStyles()
  const bookId = Number(props.match.params.bookId)
  const [bookData, setBookData] = useState({ title: '', pdfUrl: '' })

  useEffect(() => {
    bookApi.findBookById(bookId).then(book => {
      setBookData(book.data)
    })
  }, [])

  return (
    <div className={classes.readingArea}>
      <Typography className={classes.titleText}>{bookData.title}</Typography>
      {bookData.pdfUrl ? (
        <PdfReader url={bookData.pdfUrl} />
      ) : (
        <CircularProgress color="secondary" />
      )}
    </div>
  )
}

export default ReadBook
