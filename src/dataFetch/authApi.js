import usersDb from '../mockDatas/user/usersDb.json'

const JWT_TOKEN = 'JWT_TOKEN'

const login = async (username, password) => {
  return usersDb.users.filter(
    user => user.username === username && user.password === password
  )[0]
}
const register = async (username, password) => {
  const result = {
    username,
    password,
    jwt_token: 'abcde'
  }
  usersDb.users.push(result)

  return result
}
const setToken = jwt => localStorage.setItem(JWT_TOKEN, jwt)

const getToken = () => localStorage.getItem(JWT_TOKEN)

const logout = async () => {
  localStorage.removeItem(JWT_TOKEN)
}

const checkIfLoggedInAndSendToHome = () => {
  if (getToken()) window.location = '/books'
}

export default {
  login,
  logout,
  register,
  setToken,
  getToken,
  checkIfLoggedInAndSendToHome
}
