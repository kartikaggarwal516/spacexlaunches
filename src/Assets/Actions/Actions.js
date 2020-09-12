//2.action types
export const LAUNCHES = "LAUNCHES_INFO"

//3.Action Creators
export const getLaunches = launches => {
    return{
        type: LAUNCHES,
        payload: launches
    }
}