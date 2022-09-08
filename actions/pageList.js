import { SET_DRIVER_INFO, GET_PAGE_LIST_SUCCESS, GET_PAGE_LIST_FAIL, GET_PAGE_LIST_REQUEST, PAGE_LIMIT, SERVER_NAME } from '../constants';
import axios from 'axios';


let base_url = SERVER_NAME+'/f1/drivers.json?'

export function setDriverInfo(driverInfo) {
	
	
	return dispatch => {
    
    dispatch({
      type: SET_DRIVER_INFO,
      payload: driverInfo
    })
	}
}

export function getPageList(pageNumber) {
	
	return dispatch => {
    
    dispatch({
      type: GET_PAGE_LIST_REQUEST,
      payload: true
    })
	
    
	let url = base_url+'limit='+PAGE_LIMIT+'&offset='+PAGE_LIMIT*pageNumber
	
    axios.get(url)
      .then(res => {
		  
        dispatch({
          type: GET_PAGE_LIST_SUCCESS,
          payload: {data: res.data.MRData.DriverTable.Drivers,pageNumber:pageNumber,totalPages: Math.ceil(res.data.MRData.total/PAGE_LIMIT)}
        })
      })
      .catch(err => {
		  
        dispatch({
          type: GET_PAGE_LIST_FAIL,
          payload: err.message
        })
      });
	  
	  
  }
	
}

	