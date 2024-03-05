import { createSlice } from "@reduxjs/toolkit"


const authSlice = createSlice(
    {
        name: 'auth',
        initialState: {
            email: null,
            token: null
        },
        reducers: {
            setCredentials: (state, action) => {
                console.log(`Dispatching setCredentials with ${JSON.stringify(action.payload)}`)
                const { email, access_token } = action.payload
                state.user = email
                state.token= access_token
            },
            logOut: (state, action) => {
                state.email = null
                state.token = null
            }
        }
    }
)

export const { setCredentials, logOut } = authSlice.actions
export default authSlice.reducer
export const selectCurrentUser = (state) => state.auth.user
export const selectCurrentToken = (state) => state.auth.token

