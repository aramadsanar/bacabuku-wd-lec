import usersDb from '../mockDatas/user/usersDb.json'

const JWT_TOKEN = 'JWT_TOKEN'

const login = async (username, password) => {
  return usersDb.users.filter(
    user => user.username === username && user.password === password
  )[0]
}

const setToken = jwt => localStorage.setItem(JWT_TOKEN, jwt)

const getToken = () => localStorage.getItem(JWT_TOKEN)

export default {
  login,
  setToken,
  getToken
}
