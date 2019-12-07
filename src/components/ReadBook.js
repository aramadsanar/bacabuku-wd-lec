import React, { useEffect, useState } from 'react'
import { Container, Typography, CircularProgress } from '@material-ui/core'
import PDFViewer from 'pdf-viewer-reactjs'
import { Document, Page } from 'react-pdf/dist/entry.webpack'
import bookApi from '../dataFetch/bookApi'
import { makeStyles } from '@material-ui/core/styles'
import { SizeMe } from 'react-sizeme'
import Button from '@material-ui/core/Button'
import zIndex from '@material-ui/core/styles/zIndex'
import sty from '../styles/ReadBook.css'
const useStyles = makeStyles(theme => ({
  titleText: {
    ...theme.typography.button,
    backgroundColor: theme.palette.background.paper
  },
  readingArea: {
    margin: theme.spacing(8)
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
    <div>
      <Typography className={classes.titleText}>{bookData.title}</Typography>
      {bookData.pdfUrl ? (
        <div className="pdfReader">
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
          <div className="pdfControlOverlay">
            <Button
              variant="contained"
              color="primary"
              className="prevButton"
              onClick={goToPrevPage}
            >
              {'<'}
            </Button>
            <Button
              variant="contained"
              color="primary"
              className="nextButton"
              onClick={goToNextPage}
            >
              {'>'}
            </Button>
          </div>
        </div>
      ) : (
        <CircularProgress color="secondary" />
      )}
    </div>
  )
}

export default ReadBook
