import { SET_DRIVER_INFO, GET_PAGE_LIST_SUCCESS, GET_PAGE_LIST_REQUEST,GET_PAGE_LIST_FAIL } from '../constants';
const initialState = {
  pageList: [],
  isLoading: false,
  error: '',
  pageNumber:0,
  totalPages: 0,
  driverInfo: null,
};
const pageReducer = (state = initialState, action) => {
  switch(action.type) {
    case GET_PAGE_LIST_SUCCESS:
	
      return {
        ...state,
        pageList:action.payload.data,
		pageNumber: action.payload.pageNumber,
		totalPages: action.payload.totalPages,
		isLoading:false,
		error: '',
      };
	case GET_PAGE_LIST_REQUEST:
      return {
        ...state,
		pageList: [],
        isLoading:true,
		error: '',
      };  
	  case GET_PAGE_LIST_FAIL:
      return {
        ...state,
		error: action.payload,
        isLoading:false,
      };  
	  case SET_DRIVER_INFO:
	  
      return {
        ...state,
		driverInfo: {...action.payload}
      };  
    default:
      return state;
  }
}
export default pageReducer;
