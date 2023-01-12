import axios from "axios";

export const GET_DOGS = "GET_DOGS";
export const FILTER_ORIGIN = "FILTER_ORIGIN";
export const ORDER_BY_NAME =  "ORDER_BY_NAME";
export const GET_BY_NAME = "GET_BY_NAME";

export function getDogs (){
    return async function (dispatch) {
        var allDogs = await axios.get("http://localhost:3001/dogs",{});
        dispatch(
            {
                type: GET_DOGS,
                payload: allDogs.data
            }
        )
    }
};

export function getCharacterByName(name){
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
        console.log(error)
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
