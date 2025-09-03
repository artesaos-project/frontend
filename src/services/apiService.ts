import axios, { AxiosRequestConfig } from "axios";

type FetchOptions = {
  body?: unknown;
  withCredentials?: boolean;
  headers?: Record<string, string>;
  method?: AxiosRequestConfig["method"];
};

export const apiRequest = async <T>(
  endpoint: string,
  { body, withCredentials, headers, method }: FetchOptions = {}
): Promise<T> => {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  if (!baseUrl) {
    throw new Error("API_BASE_URL is not defined in environment variables");
  }

  const url = `${baseUrl}${endpoint}`;

  try {
    const response = await axios<T>({
      url,
      method: method || (body ? "POST" : "GET"),
      data: body,
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      withCredentials: withCredentials ?? false,
    });

    return response.data;
  } catch (error: any) {
    console.error("API request error:", error);
    throw new Error(error.response?.data?.message || "Network request failed");
  }
};