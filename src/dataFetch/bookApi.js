import booksList from '../mockDatas/books/booksList.json'
import sanitizeRegex from '../utils/regexSanitizer'

const findBookById = async id => {
  let result = booksList.data.filter(book => book.id === id)[0]
  return { data: result }
}

const getAllBooks = async () => {
  return booksList.data
}

const findBooksByQuery = async query => {
  query = sanitizeRegex(query)
  let pattern = new RegExp(query, 'ig')
  if (query === '')
    return {
      data: booksList.data
    }

  return {
    data: booksList.data.filter(book => {
      if (book.title.match(pattern)) return book
      return null
    })
  }
}

export default {
  findBookById,
  findBooksByQuery,
  getAllBooks
}
