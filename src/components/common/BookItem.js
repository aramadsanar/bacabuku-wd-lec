import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles({
  card: {
    maxWidth: 150
  },
  media: {
    height: 140
  }
})

function BookItem({ bookImage, bookTitle, bookId, pageCount }) {
  const classes = useStyles()

  const goToBookPage = () => {
    window.location = `/book/${bookId}`
  }

  return (
    <Card className={classes.card}>
      <CardActionArea onClick={goToBookPage}>
        <CardMedia
          className={classes.media}
          image={bookImage}
          title={bookTitle}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {bookTitle}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {pageCount} pages
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default BookItem
