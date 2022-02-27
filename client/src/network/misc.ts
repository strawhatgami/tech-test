export const HttpError = async (httpResponse: Response) => {
  const { url, status, statusText } = httpResponse;

  let err: Error;
  try {
    const { message: remoteMessage, stack } = await httpResponse.json();

    err = new Error(statusText + ": " + remoteMessage);
    Object.assign(err, { url, status, statusText, remoteMessage, stack });
  }
  catch (e) {
    err = new Error(statusText);
    Object.assign(err, { url, status, statusText });
  }

  return err;
}

export const apiFetch = (token: string) => 
  async (options: { headers?: any; method?: any; uri: any; content?: any; }) => 
    customFetch({
      ...options,
      headers: {
        ...(options.headers || {}),
        'Authorization': 'Bearer ' + token,
      },
    }
  );

export const customFetch = async ({ method = "GET", uri, content = null, headers = null }) => {
  const contentHeaders = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  };

  let customHeaders = {};

  if (method && method.toUpperCase() != "GET" && content) customHeaders = {
    ...customHeaders,
    ...contentHeaders,
  };

  if (headers) customHeaders = {
    ...customHeaders,
    ...headers,
  };

  const body = content !== null ? JSON.stringify(content) : null;

  const response = await fetch(uri, {
    method: method || "GET",
    headers: customHeaders,
    body,
  });

  if (!response.ok) {
    const err = await HttpError(response);
    throw err;
  }

  const contentType = response.headers.get("content-type");

  let response_content = null;
  if (contentType?.includes("application/json")) {
    response_content = await response.json();
  } else {
    response_content = await response.text();
  }

  return response_content;
}
