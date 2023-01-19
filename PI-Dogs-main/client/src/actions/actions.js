import axios from "axios";

export const GET_DOGS = "GET_DOGS";
export const FILTER_ORIGIN = "FILTER_ORIGIN";
export const FILTER_TEMPERAMENT = "FILTER_TEMPERAMENT";
export const ORDER_BY_NAME =  "ORDER_BY_NAME";
export const ORDER_BY_WEIGHT = "ORDER_BY_WEIGHT"
export const GET_BY_NAME = "GET_BY_NAME";
export const GET_TEMPERAMENTS = "GET_TEMPERAMENTS";
export const GET_BY_ID = "GET_BY_ID";
export const SET_ERROR = "SET_ERROR";

export function getDogs (){
    // return async function (dispatch) {
    //     try{
    //         var allDogs = await axios.get("http://localhost:3001/dogs",{});
    //     dispatch(
    //         {
    //             type: GET_DOGS,
    //             payload: allDogs.data
    //         }
    //     )
    //     }catch(error){
    //         console.log(error.response.data)
    //         dispatch(
    //         {
    //             type: SET_ERROR,
    //             payload: error
    //         }
    //     )
    //     }
    // }
    return function(dispatch){
        return axios.get("http://localhost:3001/dogs")
        .then(({data})=>{
            dispatch(
              {
                 type: GET_DOGS,
                 payload: data
              }
            )
        })
        .catch((error)=>{
        console.log(error.response)
        dispatch(
                    {
                        type: SET_ERROR,
                        payload: error.response
                    })
    })
}
};

export function getDogsByName(name){
    return async function(dispatch){
      try{
        var dog= await axios.get(`http://localhost:3001/dogs?name=${name}`);
        dispatch(
            {
                type: GET_BY_NAME,
                payload: dog.data
            }
        )
      }catch(error){
        console.log(error.response.data)
        dispatch(
        {
            type: SET_ERROR,
            payload: error.response.data
        }
        )
    }
    }
}

export function getDogsById(id){
    return async function(dispatch){
        try{
            const dog= await axios.get(`http://localhost:3001/dogs/${id}`);
            dispatch({
                type: GET_BY_ID,
                payload: dog.data[0]
        })
        }catch(error){
            console.log(error.response.data)
            dispatch(
            {
                type: SET_ERROR,
                payload: error
            }
            )
        }
    }
}

export function getTemperaments (){
    return async function (dispatch){
        try{
            var temps= await axios.get("http://localhost:3001/temperaments")
        return dispatch({
            type: GET_TEMPERAMENTS,
            payload: temps.data
        })
        }catch(error){
            console.log(error.response.data)
            dispatch(
            {
                type: SET_ERROR,
                payload: error
            }
            )
        }
    }
};

export function postDog(newDog){
    return async function (dispatch){
        try{
            const req=await axios.post("http://localhost:3001/dogs",newDog);
            // console.log(req.data)
            console.log(req.data)
            
        }catch(error){
            console.log(error.response.data)
            dispatch(
            {
                type: SET_ERROR,
                payload: error
            }
            )
        }
    }
}

export function filterByOrigin(option){
    return{
        type: FILTER_ORIGIN,
        payload: option
    }

}

export function orderByName(option){
    return{
        type: ORDER_BY_NAME,
        payload:option
    }

}

export function filterByTemperament(option){
    return{
        type: FILTER_TEMPERAMENT,
        payload: option
    }
}

export function orderByWeight(option){
    return{
        type: ORDER_BY_WEIGHT,
        payload:option
    }
}


