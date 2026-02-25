const API_ENDPOINT = process.env.API_ENDPOINT;
export type methods = "GET" | "POST" | "PUT" | "DELETE";

export type FetchHandlerProps<T> = {
  endpoint: string;
  method?: "GET" | "POST" | "PUT" | "DELETE";
  data?: T;
};
export const fetchHandler = async <T>({
  endpoint,
  method = "GET",
  data,
}: FetchHandlerProps<T>) => {
  const res = await fetch(`${API_ENDPOINT}${endpoint}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2F3Y2FpLmNsb3VkL3NjcmlwdC93YXJlaG91c2UvYXBpL2xvZ2luIiwiaWF0IjoxNzcxODcxNDU4LCJleHAiOjE3NzE4NzUwNTgsIm5iZiI6MTc3MTg3MTQ1OCwianRpIjoiSldIcUJLU0NyOHJzaEpObSIsInN1YiI6IjEiLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.E4oQirSvLUVAh-oQ7f-dDfWFPzP10_EuUvw0LkT2dMw",
    },
    body: data ? JSON.stringify(data) : undefined,
    cache: "no-store",
  });

  if (!res.ok) {
    const error = await res.json();
    return error;
  }

  return res.json();
};
