import ajax from "./http";

const NEWS_URL = "https://api.hnpwa.com/v0/news/1.json";

console.log(ajax("GET", NEWS_URL, false));
