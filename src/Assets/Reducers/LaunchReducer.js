import {LAUNCHES} from "../Actions/Actions"

let defaultstate=[]
export default function LaunchReducer(state=defaultstate,action)
{
    switch(action.type){
        case LAUNCHES: {
            state = action.payload
            return state
        }
        default: return state
    }
}