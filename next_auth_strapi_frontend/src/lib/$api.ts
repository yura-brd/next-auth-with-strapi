interface IPops {
  method?: "GET" | "POST" | "PUT" | "DELETE" | "UPDATE";
  body?: Record<string, any>
}
export const $api = async <T>(url: string, options: IPops = {}): Promise<T> => {
  const {method = 'GET', body} = options;

  let urlRes = `${process.env.NEXT_PUBLIC_API_URL}/api/${url}`;
  const optionsForFetch: Record<string, any> = {
    method: method,
  };
  if (body) {
    if (method === "GET") {
      Object.keys(body).forEach((key, index) => {
        urlRes += index === 0 ? '?' : '&'
        urlRes += `${key}=${body[key].toString()}`;
      })
    } else {
      optionsForFetch['body'] = JSON.stringify(body);
    }
  }

  const response = await fetch(urlRes, {
    headers: {
      'content-type': 'application/json',
    },
    ...optionsForFetch
  });


  return await response.json() as Promise<T>;


}