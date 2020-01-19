export * from "./colors";
export * from "./paginate";

export const querify = params => {
  return Object.keys(params)
    .map(key => `${key}=${params[key]}`)
    .join("&");
};
