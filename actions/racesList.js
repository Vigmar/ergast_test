import { GET_RACE_LIST_SUCCESS, GET_RACE_LIST_REQUEST,GET_RACE_LIST_FAIL, PAGE_LIMIT, SERVER_NAME } from '../constants';
import axios from 'axios';


let base_url = SERVER_NAME+'/f1/drivers/'


export function getRacesList(driverId,pageNumber) {
	
	
	return dispatch => {
    
    dispatch({
      type: GET_RACE_LIST_REQUEST,
      payload: driverId,
    })
	
	
	
	let url = base_url+driverId+'/races.json?limit='+PAGE_LIMIT+'&offset='+PAGE_LIMIT*pageNumber
	
    axios.get(url)
      .then(res => {
		  
        dispatch({
          type: GET_RACE_LIST_SUCCESS,
          payload: {data: res.data.MRData.RaceTable.Races,pageNumber:pageNumber,totalPages: Math.ceil(res.data.MRData.total/PAGE_LIMIT)}
        })
      })
      .catch(err => {
        dispatch({
          type: GET_RACE_LIST_FAIL,
          payload: err.message
        })
      });
	  
	  
  }
	
}

	