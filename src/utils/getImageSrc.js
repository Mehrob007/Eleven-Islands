export const getImageSrc = (imageName) =>
  `${import.meta.env.VITE_ENV_URL_FILE}photos?photo=${imageName}`;
