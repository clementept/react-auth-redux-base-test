import { apiSlice } from "../../app/api/apiSlice";
import { setCredentials, logOut } from "./authSlice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => {
        let bodyFormData = new FormData();
        bodyFormData.append("username", credentials.username);
        bodyFormData.append("password", credentials.password);
        return {
          url: "/login",
          method: "POST",
          body: bodyFormData,
          FormData: true,
        };
      },
    }),
    // refresh: builder.mutation({
    //   query: () => {
    //     return {
    //       url: "/login/refresh",
    //       method: "GET"
    //     };
    //   },
    // })
    refresh: builder.mutation({
      query: () => ({
        url: "/login/refresh",
        method: "GET",
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          console.log(data);
          dispatch(setCredentials({ ...data, email: "" }));
        } catch (err) {
          console.log(err);
        }
      },
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/logout",
        method: "GET",
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          console.log(data);
          dispatch(logOut());
        } catch (err) {
          console.log(err);
        }
      },
    }),
  }),
});

export const { useLoginMutation, useRefreshMutation, useLogoutMutation } =
  authApiSlice;
