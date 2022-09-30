export const GET_LAB = 'GET_LAB';
export const GET_LAB_RESULTS = 'GET_LAB_RESULTS';
export const GET_LAB_RESULTS_NORMAL_RANGE = 'GET_LAB_RESULTS_NORMAL_RANGE';
export const GET_LAB_WORKSHEETS = 'GET_LAB_WORKSHEETS';
export const LAB_LOADED = 'LAB_LOADED';
export const NORMALS_LOADED = 'NORMALS_LOADED';
export const NORMALS_COUNT = 'NORMALS_COUNT';


export const getLab = (token,username) => {
    try{
        return async dispatch =>{
          let myHeaders = new Headers();
          myHeaders.append("Authorization", `Token ${token}`);
          let requestOptions = {
              method: 'GET',
              headers: myHeaders,
              redirect: 'follow'
          };
  
        await fetch(`https://results.techcare.health/api/get-patient-all-results/${username}/`, requestOptions)
        .then(response => response.json())
        .then(result => {
          dispatch(
              {
                type : GET_LAB,
                payload: result,
              }
            )
          dispatch(
            {
              type:GET_LAB_RESULTS,
              payload: result.all_result,
            }
          )
          dispatch(
            {
              type:GET_LAB_WORKSHEETS,
              payload: result.all_worksheet,
            }
          )
          dispatch(
            {
              type:LAB_LOADED,
              payload: true,
            }
          )
        })
        .catch(error => console.log('error', error));
    }}
    catch{
  
    }
}

export const getResultNoramlRange = (count,token,username,test_id,test_result,date) =>{
  try{
  return async dispatch =>{
      let myHeaders = new Headers();
      myHeaders.append("Authorization", `Token ${token}`);
      let requestOptions = {
          method: 'GET',
          headers: myHeaders,
          redirect: 'follow'
      };

      await fetch(`https://results.techcare.health/api/get-patient-normal-range/${test_id}/${test_result}/${username}/`, requestOptions)
      .then(response => response.json())
      .then(result => {
          dispatch(
            {
              type: GET_LAB_RESULTS_NORMAL_RANGE,
              payload:result.normal_range,
              id: test_id
            }
          )
          dispatch(
            {
              type:NORMALS_COUNT, 
              payload:date
            }
          )
          dispatch(
            {
              type:NORMALS_LOADED, 
              payload:date,
              original_count : count
            }
          )
      })
      .catch(error => console.log('error', error));
      }}
      catch{
      
      }
}