import getNewsFeed from "../services/newsFeed";
console.log("App");

(async () => {
  const res = await getNewsFeed();
  const feed = res.data;

  console.log("feed", feed);
})().finally(() => console.log("isLoading", false));
