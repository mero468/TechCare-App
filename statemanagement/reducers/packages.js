import { GET_PACKAGES, GET_PACKAGES_RESULT,GET_PACKAGES_DETAILS,
    PACKAGES_LOADED,PACKAGES_RESULT_LOADED,DETAILS_LOADED} from "../actions/packages";

const initialState ={
    packages_result: [],
    packages: [],
    packages_details: [],
    package_loaded:false,
    flag:false,
    details_flag : false,
}

function PackagesReducer(state=initialState,action){
   switch(action.type){
        case GET_PACKAGES_RESULT:
            return {
                ...state,
                packages_result:action.payload
            };
        case GET_PACKAGES:
            return {
                ...state,
                packages:action.payload
            };
        case GET_PACKAGES_DETAILS:
            return {
                ...state,
                packages_details:action.payload
            }; 
        case PACKAGES_LOADED:
            return {
                ...state,
                package_loaded:action.payload
            };  
        case PACKAGES_RESULT_LOADED:
            return {
                ...state,
                flag:action.payload
            };
        case DETAILS_LOADED:
            return {
                ...state,
                details_flag:action.payload
            };        
        default:
            return state;
   } 
}
export default PackagesReducer;