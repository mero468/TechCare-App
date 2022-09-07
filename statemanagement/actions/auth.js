export const SET_USER = 'SET_USER';
export const SET_IS_AUTHENTICATED = 'SET_IS_AUTHENTICATED';
export const SET_TOKEN = 'SET_TOKEN'


export const setUser = user => dispatch =>{
  dispatch({
      type:SET_USER,
      payload: user,
  })

}
export const setIsAuthenticated = isauthenticated => dispatch =>{
  dispatch({
      type:SET_IS_AUTHENTICATED,
      payload: isauthenticated,
  })

}
export const setToken = token => dispatch =>{
  dispatch({
      type:SET_TOKEN,
      payload: token,
  })

}