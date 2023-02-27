import ajax from "../src/http";
console.log("newsFeed");

const getNewsFeed = async () => {
  const response = await ajax("news/1.json");

  return response;
};

export default getNewsFeed;
