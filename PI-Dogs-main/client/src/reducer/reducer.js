import {GET_DOGS, 
    FILTER_ORIGIN, 
    ORDER_BY_NAME, 
    GET_BY_NAME,
    GET_TEMPERAMENTS,
    GET_BY_ID,
    FILTER_TEMPERAMENT,
    ORDER_BY_WEIGHT,
    SET_ERROR} from "../actions/actions.js";


const initialState={
    dogs: [],
    temperaments:[],
    detailedDog:{},
    error: {}
};

const rootReducer = (state=initialState, action) =>{
    switch(action.type){
        case GET_DOGS: {
              return{
                ...state,
                dogs: action.payload,
            }    
        }
        case FILTER_ORIGIN:{
            const allDogs=state.dogs;
            const filtered = action.payload === "created" ?  allDogs.filter(el=>el.created) : allDogs.filter(el=>!el.created)
            return{
                ...state,
                dogs: action.payload==="All" ? allDogs : filtered 
            }
        }
        case FILTER_TEMPERAMENT:{
            const allDogs=[...state.dogs];
            const filtered = allDogs.filter(dog => (dog.temperament && (dog.temperament.includes(action.payload))) || 
                                                    (dog.temperaments && (dog.temperaments.map(o=>o.name).includes(action.payload))))
            return{
                ...state,
                dogs: filtered
            }                           
        }
        case ORDER_BY_NAME:{
            let sortedArray= action.payload === "asc" ? state.dogs.sort(function(a,b){
                                                                            if(a.name.toUpperCase()>b.name.toUpperCase())return 1;
                                                                            if(a.name.toUpperCase()<b.name.toUpperCase())return -1;
                                                                            return 0
                                                                            }) : 
                                                        state.dogs.sort(function(a,b){
                                                            if(a.name.toUpperCase()>b.name.toUpperCase())return -1;
                                                            if(a.name.toUpperCase()<b.name.toUpperCase())return 1;
                                                            return 0
                                                            })
            return{
                ...state,
                dogs: sortedArray
            }
        }
        case ORDER_BY_WEIGHT:{
            let sortedByWeight= action.payload === "asc" ? state.dogs.sort(function(a,b){
                                                                if(parseInt(a.avgWeight)>parseInt(b.avgWeight))return 1;
                                                                if(parseInt(a.avgWeight)<parseInt(b.avgWeight))return -1;
                                                                return 0
                                                                }) : 
                                                        state.dogs.sort(function(a,b){
                                                        if(parseInt(a.avgWeight)>parseInt(b.avgWeight))return -1;
                                                        if(parseInt(a.avgWeight)<parseInt(b.avgWeight))return 1;
                                                        return 0
                                                        })
            return{
                ...state,
                dogs: sortedByWeight
            }
        }
        case GET_BY_NAME:{
            return{
                ...state,
                dogs: action.payload
            }
        }
        case GET_BY_ID:{
            return{
                ...state,
                detailedDog: action.payload

            }
        }
        case GET_TEMPERAMENTS:{
            return{
                ...state,
                temperaments: action.payload
            }
        }
        case SET_ERROR:{
            const catchedError=action.payload
            return{
                ...state,
                error: catchedError
            }
        }
        default: return {...state};
    }
};

export default rootReducer;