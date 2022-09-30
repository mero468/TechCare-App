export const LANGUAGE = "LANGUAGE";
export const LANGUAGE_TEXT = "LANGUAGE_TEXT";


export const setLanguage = lang => dispatch =>{
    dispatch({
        type:LANGUAGE,
        payload: lang,
    })
  }
export const setLanguage_text = text => dispatch =>{
    dispatch({
        type:LANGUAGE_TEXT,
        payload: text,
    })
}

const initialState={
    //true :Arabic
    //False : English
    language: false,
    text: "Language : English",
}

function GeneralReducer(state=initialState,action){
    switch(action.type){
        case LANGUAGE:
            return{
                ...state,
                language:action.payload
            };
        case LANGUAGE_TEXT:
            return{
                ...state,
                text:action.payload
            };
        default:
            return state;  
    }
}
export default GeneralReducer;          