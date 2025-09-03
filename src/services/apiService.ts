import axios, { AxiosRequestConfig } from "axios";

type FetchOptions = {
  body?: unknown;
  withCredentials?: boolean;
  headers?: Record<string, string>;
  method?: AxiosRequestConfig["method"];
  isFormData?: boolean;
};

export const apiRequest = async <T>(
  endpoint: string,
  { body, withCredentials, headers, method, isFormData = false }: FetchOptions = {}
): Promise<T> => {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  if (!baseUrl) {
    throw new Error("API_BASE_URL is not defined in environment variables");
  }

  const url = `${baseUrl}${endpoint}`;

  try {
    const response = await axios<T>({
      url: url,
      method: method || (body ? "POST" : "GET"),
      data: body,
      headers: {
        ...(isFormData ? {} : { "Content-Type": "application/json" }),
        ...headers,
      },
      withCredentials: withCredentials ?? true,
    });

    return response.data;
  } catch (error: any) {
    console.error("API request error:", error);
    
    if (error.response?.status === 403) {
      throw new Error("UNAUTHORIZED");
    }
    
    throw new Error(error.response?.data?.message || "Network request failed");
  }
};