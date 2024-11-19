import { RootState } from "../store";

export const authHeader = () : any => {
  return {
    baseUrl: import.meta.env.VITE_API_URL,
    credentials: "omit", //it will bypass CORS
    prepareHeaders: (headers: Headers, { getState }: any) => {
      const token = (getState() as RootState).user.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  };
};