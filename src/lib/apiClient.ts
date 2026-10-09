// import { ofetch } from "ofetch";

// const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// const apiClient = ofetch.create({
//   baseURL: BASE_URL, 
//   credentials: "include",
// });

// export default apiClient;


import { ofetch } from "ofetch";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export class ApiError extends Error {
  statusCode: number;
  errors?: string;

  constructor(message: string, statusCode: number, errors?: string) {
    super(message);
    this.name = "ApiError";
    this.statusCode = statusCode;
    this.errors = errors;
  }
}

const apiClient = ofetch.create({
  baseURL: BASE_URL,
  credentials: "include",
  async onResponseError({ response }) {
    const body = response._data as
      | { message?: string; errors?: string }
      | undefined;

    throw new ApiError(
      body?.errors ?? body?.message ?? "Something went wrong",
      response.status,
      body?.errors,
    );
  },
});

export default apiClient;