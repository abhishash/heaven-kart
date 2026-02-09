const API_ENDPOINT = process.env.API_ENDPOINT;
export type methods =
    "GET" | "POST" | "PUT" | "DELETE";

export type FetchHandlerProps<T> = {
    endpoint: string;
    method?: "GET" | "POST" | "PUT" | "DELETE";
    data?: T;
};
export const fetchHandler = async <T,>({
    endpoint,
    method = "GET",
    data,
}: FetchHandlerProps<T>) => {
    const res = await fetch(`${API_ENDPOINT}${endpoint}`, {
        method,
        headers: {
            "Content-Type": "application/json",
        },
        body: data ? JSON.stringify(data) : undefined,
    });

    if (!res.ok) {
        const error = await res.json();
        return error
    }

    return res.json();
}