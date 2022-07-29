export const localTokenSet = (token: object) => {
  localStorage.setItem("token", JSON.stringify(token));
};
export const localTokenGet = () => {
  const localToken = localStorage.getItem("token")
    ? JSON.parse(localStorage.getItem("token") as string)
    : null;
  return localToken;
};
//const { localTokenSet, localTokenGet };
export default localTokenSet;
