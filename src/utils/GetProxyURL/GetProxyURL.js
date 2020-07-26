const getProxyURL = url => {
  if (JSON.parse(process.env.CORS_PROXY_ENABLED) === true) {
    return `https://c-hive-proxy.herokuapp.com/${url}`;
  }

  return url;
};

export default getProxyURL;
