import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient();

export async function fetchOrders({
  signal,
  token,
  searchTerm,
  sortBy,
  page,
  size,
  isDescending,
}) {
  const filters = Object.keys(searchTerm).reduce((result, name) => {
    if (!searchTerm[name] || !searchTerm[name]?.length) {
      return result;
    }
    if (Array.isArray(searchTerm[name])) {
      let arrayParams = "";
      searchTerm[name].forEach((val) => (arrayParams += `${name}[]=${val}&`));
      return `${result}${arrayParams}`;
    }
    return `${result}${name}=${searchTerm[name]}&`;
  }, "");
  const url = `https://dev.tapgo.cc/test/orders?${filters}page=${page}&sort_by=${sortBy}&size=${size}&is_descending=${isDescending}`;

  const response = await fetch(url, {
    signal,
    headers: {
      Authorization: token,
    },
    method: "GET",
  });

  if (!response.ok) {
    const error = new Error("fetch orders fail");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const result = await response.json();

  return result;
}

export async function login(loginData) {
  const response = await fetch("https://dev.tapgo.cc/test/auth/login", {
    method: "POST",
    body: JSON.stringify(loginData),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const error = new Error("Login fail");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const { token } = await response.json();

  return token;
}
