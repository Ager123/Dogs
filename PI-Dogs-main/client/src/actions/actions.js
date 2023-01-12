import axios from "axios";

export const GET_DOGS = "GET_DOGS";

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
