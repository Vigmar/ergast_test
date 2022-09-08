import { GET_RACE_LIST_SUCCESS, GET_RACE_LIST_REQUEST,GET_RACE_LIST_FAIL } from '../constants';

const initialState = {
  racesList: [],
  isLoading: false,
  error: '',
  pageNumber:0,
  totalPages: 0,
  driverId: '',

};
const racesReducer = (state = initialState, action) => {
  switch(action.type) {
    case GET_RACE_LIST_SUCCESS:
	
      return {
        ...state,
        racesList:action.payload.data,
		pageNumber: action.payload.pageNumber,
		totalPages: action.payload.totalPages,
		isLoading:false,
		error: '',
      };
	case GET_RACE_LIST_REQUEST:
      return {
        ...state,
		racesList: [],
        isLoading:true,
		error: '',
		driverId: action.payload,
      };  
	  case GET_RACE_LIST_FAIL:
      return {
        ...state,
		racesList: [],
		error: action.payload,
        isLoading:false,
      };  
	  
    default:
      return state;
  }
}
export default racesReducer;
