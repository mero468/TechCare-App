export const GET_PACKAGES_RESULT= 'GET_PACKAGES_RESULT';
export const GET_PACKAGES = 'GET_PACKAGES';
export const GET_PACKAGES_DETAILS = 'GET_PACKAGES_DETAILS';
export const PACKAGES_LOADED = 'PACKAGES_LOADED';
export const PACKAGES_RESULT_LOADED = 'PACKAGES_RESULT_LOADED';
export const DETAILS_LOADED = 'DETAILS_LOADED';

import { domain } from '../../api_info';

export const getPackagesResult = (token,username) => {
    try{
        return async dispatch =>{
          let myHeaders = new Headers();
          myHeaders.append("Authorization", `Token ${token}`);
          let requestOptions = {
              method: 'GET',
              headers: myHeaders,
              redirect: 'follow'
          };

        await fetch(`${domain}/api/get-patient-packages/${username}/`, requestOptions)
        .then(response => response.json())
        .then(result => {
          dispatch(
              {
                type : GET_PACKAGES_RESULT,
                payload: result,
              }
            )
          dispatch(
            {
              type:PACKAGES_RESULT_LOADED,
              payload: true,
            }
          )
        })
        .catch(error => console.log('error', error));
    }}
    catch{

    }
}

export const getPackages = (token) => {
  try{
      return async dispatch =>{
        let myHeaders = new Headers();
        myHeaders.append("Authorization", `Token ${token}`);
        let requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

      await fetch(`https://super-dashboard.lite.flims.co/techCare/package/`, requestOptions)
      .then(response => response.json())
      .then(result => {
        dispatch(
            {
              type : GET_PACKAGES,
              payload: result,
            }
          )
        dispatch(
          {
            type:PACKAGES_LOADED,
            payload: true,
          }
        )
      })
      .catch(error => console.log('error', error));
  }}
  catch{

  }
}

export const getPackagesDetails =(packages,patient_log) => dispatch =>{
  const result = [];
  for (let i = 0; i < patient_log.length; i++) {
    const log = patient_log[i];
    for (let j = 0; j < packages.length; j++) {
      const health_package = packages[j];
      if(log.package_id == health_package.id ){

          const item = {
            id: health_package.id,
            title:health_package.title,
            title_ar: health_package.title_ar,
            html_file: health_package.html_file,
            package_id_for_store:health_package.package_id_for_store ,
            image:health_package.image , 
          }
          result.push(item);
          break;
      }

    }
    
  }
  dispatch({
    type:GET_PACKAGES_DETAILS,
    payload: result,
  })
  if(result.length < 1){
    dispatch({
      type:DETAILS_LOADED,
      payload: false,
    })  
  }
  else{
    dispatch({
      type:DETAILS_LOADED,
      payload: true,
    })  
  }

}