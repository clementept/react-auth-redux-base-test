import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setCredentials, logOut } from "../../features/auth/authSlice";

const BASE_URL = "http://localhost:8000/api"

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const excludedEndpoints = ["/login", "/refresh"];

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 403) {
    // Check if the current endpoint is in the excluded list
    if (!excludedEndpoints.includes(args.url)) {
      console.log("Sending refresh token");
      // send refresh token to get new access token
      const refreshResult = await baseQuery("/login/refresh", api, extraOptions);

      if (refreshResult?.data) {
        const user = api.getState().auth.user;

        //store new token
        api.dispatch(setCredentials({ ...refreshResult.data, user }));

        // retry original query with new access token
        result = await baseQuery(args, api, extraOptions);
      } else {
        console.log("Logging out");
        api.dispatch(logOut());
      }
    }
  }
  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({}),
});
