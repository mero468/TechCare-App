import {GET_LAB,LAB_LOADED,NORMALS_LOADED,GET_LAB_RESULTS,GET_LAB_WORKSHEETS,GET_LAB_RESULTS_NORMAL_RANGE, NORMALS_COUNT} from "../actions/lab";

const initialState ={
    labs_loaded: false,
    labs:[],
    worksheets:[],
    results:[],
    normal_objects:[

    ],
    normals_count:{},
    normals_loaded:{

    },
    
}

function LabReducer(state=initialState,action){
   switch(action.type){
        case LAB_LOADED:                
            return {
                ...state,
                labs_loaded:action.payload
            };
        case GET_LAB:

            return {
                ...state,
                labs:action.payload,
        };
        case GET_LAB_RESULTS:

            return {
                ...state,
                results:action.payload,
        };     
        case GET_LAB_WORKSHEETS:

            return {
                ...state,
                worksheets:action.payload,
        };    
        case GET_LAB_RESULTS_NORMAL_RANGE:
            state ={
                ...state,
            };
            if(action.payload.normal_range_obj == "empty"){
                
                var id = action.id;
                var obj = {};
                obj[id] = "empty";
                state.normal_objects.push(obj);     

            }
            else{
                var id = action.id;
                var obj = {};
                obj[id] = action.payload;
                state.normal_objects.push(obj);    
            }
            
            return state;
        
        case NORMALS_COUNT:
            state ={
                ...state,
            };
            var date = action.payload;
            let array = Object.keys(state.normals_count);
            var flag = false;
            array.forEach(element => {
                if(date == element){
                    flag=true;
                }
            });

            if(flag){
                state.normals_count[date] +=1; 
                console.log("the counter for ",date," is : ", state.normals_count[date]  );
                return state;
            }else{
                state.normals_count[date] = 1;
                return state;
        };

        case NORMALS_LOADED:
            state ={
                    ...state,
            };
            var date = action.payload;
            var original_count = action.original_count;
            var current_count = state.normals_count[date]; 
            if(current_count >= original_count){
                state.normals_loaded[date] = true;
            }
            else{
                state.normals_loaded[date] = false;
            }
            console.log(state.normals_loaded[date]);
        default:
            return state;
   } 
}
export default LabReducer;1