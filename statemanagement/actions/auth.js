export const SET_USER = 'SET_USER';
export const SET_IS_AUTHENTICATED = 'SET_IS_AUTHENTICATED';
export const SET_TOKEN = 'SET_TOKEN';
export const SET_USERNAME = 'SET_USERNAME';

export const setUser = user => dispatch =>{
  dispatch({
      type:SET_USER,
      payload: user,
  })

}
export const setUsername_auth = username => dispatch =>{
  dispatch({
      type:SET_USERNAME,
      payload: username,
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