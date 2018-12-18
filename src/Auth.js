import _ from 'lodash'

export const isAuthenticated = () => {
  return !_.isEmpty(localStorage.jwt)
}

export const logOut = () => {
  localStorage.removeItem('jwt')
}