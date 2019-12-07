import React, { useEffect, useState } from 'react'
import { Container, Typography, CircularProgress } from '@material-ui/core'
import PDFViewer from 'pdf-viewer-reactjs'
import { Document, Page } from 'react-pdf/dist/entry.webpack'
import bookApi from '../dataFetch/bookApi'
import { makeStyles } from '@material-ui/core/styles'
import { SizeMe } from 'react-sizeme'
import Button from '@material-ui/core/Button'

const useStyles = makeStyles(theme => ({
  titleText: {
    ...theme.typography.button,
    backgroundColor: theme.palette.background.paper
  },
  readingArea: {
    margin: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column'
  },
  prevButton: {
    margin: '16dp',
    float: 'left'
  },
  nextButton: {
    margin: '16dp',
    float: 'right'
  },
  buttonArea: {
    display: 'flex'
  }
}))

function ReadBook(props) {
  const classes = useStyles()
  const bookId = Number(props.match.params.bookId)
  const [bookData, setBookData] = useState({ title: '', pdfUrl: '' })
  const [readState, setReadState] = useState({
    numPages: null,
    pageNumber: 1
  })
  useEffect(() => {
    bookApi.findBookById(bookId).then(book => {
      console.log(book.data)
      console.log(process.env.PUBLIC_URL)
      setBookData(book.data)
    })
  }, [])

  const onDocumentLoadSuccess = ({ numPages }) => {
    setReadState(prevState => ({ ...prevState, numPages }))
  }

  const goToNextPage = () => {
    setReadState(p => {
      return { ...p, pageNumber: p.pageNumber + 1 }
    })
  }
  const goToPrevPage = () => {
    setReadState(p => {
      return { ...p, pageNumber: p.pageNumber - 1 }
    })
  }
  return (
    <div fixed className={classes.readingArea}>
      <Typography className={classes.titleText}>{bookData.title}</Typography>
      {bookData.pdfUrl ? (
        <React.Fragment className={classes.readingArea}>
          <div className={classes.buttonArea}>
            <Button
              variant="contained"
              color="primary"
              className={classes.prevButton}
              onClick={goToPrevPage}
            >
              PREV
            </Button>
            <Button
              variant="contained"
              color="primary"
              className={classes.nextButton}
              onClick={goToNextPage}
            >
              NEXT
            </Button>
          </div>
          <SizeMe
            monitorHeight
            monitorWidth
            refreshRate={128}
            refreshMode={'debounce'}
            render={({ size }) => (
              <div>
                <Document
                  file={bookData.pdfUrl}
                  onLoadSuccess={onDocumentLoadSuccess}
                >
                  <div className={classes.pageBorder}>
                    <Page
                      width={size.width}
                      pageNumber={readState.pageNumber}
                    />
                  </div>
                </Document>
              </div>
            )}
          />
        </React.Fragment>
      ) : (
        <CircularProgress color="secondary" />
      )}
    </div>
  )
}

export default ReadBook
