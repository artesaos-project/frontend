
export const useFetch = async (endpoint: string, options: unknown) => {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  if (!baseUrl) {
    throw new Error("API_BASE_URL is not defined in environment variables");
  }
  const url = `${baseUrl}${endpoint}`;
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });
  console.log(response);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return await response.json();
};