import { SET_USER,SET_TOKEN,SET_IS_AUTHENTICATED,SET_USERNAME } from "../actions/auth";

const initialState ={
    user: '',
    token: '',
    isauthenticated: false,
    username:'',
}

function loginReducer(state=initialState,action){
   switch(action.type){
        case SET_USER:                
            return {
                ...state,
                user:action.payload
            };
        case SET_USERNAME:                
            return {
                ...state,
                username:action.payload
        };
        case SET_TOKEN:
            return {...state,token:action.payload};
        case SET_IS_AUTHENTICATED:
            return {...state,isauthenticated:action.payload};
        default:
            return state;
   } 
}
export default loginReducer;