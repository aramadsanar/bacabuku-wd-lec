import React, { useEffect, useState } from 'react'
import { Document, Page } from 'react-pdf/dist/entry.webpack'
import { SizeMe } from 'react-sizeme'
import Button from '@material-ui/core/Button'
import sty from '../../styles/PdfReader.css'

function PdfReader({ url }) {
  const [readState, setReadState] = useState({
    numPages: null,
    pageNumber: 1
  })

  const onDocumentLoadSuccess = ({ numPages }) => {
    setReadState(prevState => ({ ...prevState, numPages }))
  }

  const goToNextPage = () => {
    setReadState(({ pageNumber, numPages }) => {
      let nextPageNumber = 0
      if (pageNumber >= numPages) {
        nextPageNumber = numPages
      } else {
        nextPageNumber = pageNumber + 1
      }

      return { numPages, pageNumber: nextPageNumber }
    })
  }
  const goToPrevPage = () => {
    setReadState(({ pageNumber, numPages }) => {
      let prevPageNumber = 0
      if (pageNumber <= 1) {
        prevPageNumber = 1
      } else {
        prevPageNumber = pageNumber - 1
      }

      return { numPages, pageNumber: prevPageNumber }
    })
  }
  return (
    <div>
      <div className="pdfReader">
        <SizeMe
          monitorHeight
          monitorWidth
          refreshRate={128}
          refreshMode={'debounce'}
          render={({ size }) => (
            <div>
              <Document file={url} onLoadSuccess={onDocumentLoadSuccess}>
                <div>
                  <Page width={size.width} pageNumber={readState.pageNumber} />
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
      <p className="pdfReadProgressIndicator">
        Page {readState.pageNumber} of {readState.numPages}
      </p>
    </div>
  )
}

export default PdfReader
