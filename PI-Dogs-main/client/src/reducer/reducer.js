import {GET_DOGS, FILTER_ORIGIN, ORDER_BY_NAME, GET_BY_NAME} from "../actions/actions.js";


const initialState={
    dogs: [],
    dogsbackup: []
};

const rootReducer = (state=initialState, action) =>{
    switch(action.type){
        case GET_DOGS: {
            return{
                ...state,
                dogs: action.payload,
                dogsbackup: action.payload
                
            }    
            
        }
        case FILTER_ORIGIN:{
            const allDogs=state.dogsbackup;
            const filtered = action.payload === "created" ?  allDogs.filter(el=>el.created) : allDogs.filter(el=>!el.created)
            return{
                ...state,
                dogs: action.payload==="All" ? allDogs : filtered 
            }
        }
        case ORDER_BY_NAME:{
            let sortedArray= action.payload === "asc" ? state.dogs.sort(function(a,b){
                                                                            if(a.name>b.name)return 1;
                                                                            if(a.name<b.name)return -1;
                                                                            return 0
                                                                            }) : 
                                                        state.dogs.sort(function(a,b){
                                                            if(a.name>b.name)return -1;
                                                            if(a.name<b.name)return 1;
                                                            return 0
                                                            })
            return{
                ...state,
                dogs: sortedArray
            }
        }
        case GET_BY_NAME:{
            return{
                ...state,
                dogs:action.payload
            }

        }
        
        default: return {...state};
    }
};

export default rootReducer;