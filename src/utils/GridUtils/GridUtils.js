export const GetLeaguesUpdateRemainingTime = () => {
  const fiveMinsInMs = 5 * 60000;
  const currentTime = new Date().getTime();
  const lastLeaguesUpdateTime = localStorage.getItem("lastLeaguesUpdateTime");

  const remainingTime = fiveMinsInMs - (currentTime - lastLeaguesUpdateTime);

  return remainingTime;
};
