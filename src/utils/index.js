export * from "./colors";

export const querify = params => {
  return Object.keys(params)
    .map(key => `${key}=${params[key]}`)
    .join("&");
};
