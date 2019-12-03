import booksList from '../mockDatas/books/booksList.json'

const findBookById = id => {
  return { data: booksList.data.filter(book => book.id === id)[0] }
}

const getAllBooks = () => {
  return booksList
}

module.exports = {
  findBookById,
  getAllBooks
}
