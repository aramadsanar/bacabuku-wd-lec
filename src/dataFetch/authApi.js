import usersDb from '../mockDatas/user/usersDb.json'

const login = async (username, password) => {
  return usersDb.users.filter(
    user => user.username === username && user.password === password
  )[0]
}

export default {
  login
}
