import newsFeed from "../services/newsFeed";
console.log("App");

(async () => {
  const a = await newsFeed();
  console.log(a);
})();
