import http from "../src/http";
console.log("newsFeed");

const getNewsFeed = () => http("news/1.json");

export default getNewsFeed;
