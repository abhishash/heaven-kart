export async function getHomeData() {
    const res = await fetch(`${process?.env.API_ENDPOINT}/products` as string, {
      cache: "no-store", // SSR fresh data
      // headers: { Authorization: "Bearer token" }
    });  
    if (!res.ok) {
      throw new Error("Failed to fetch home data");
    }
  
    return res.json();
  }