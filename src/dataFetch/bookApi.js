import booksList from '../mockDatas/books/booksList.json'

const findBookById = id => {
  return { data: booksList.data.filter(book => book.id === id)[0] }
}

const getAllBooks = async () => {
  return booksList.data
}

export default {
  findBookById,
  getAllBooks
}
