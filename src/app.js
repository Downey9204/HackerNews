import ajax from "./http";
import handleBars from "handlebars";

const NEWS_URL = "https://api.hnpwa.com/v0/news/@page.json";
const CONTENT_URL = "https://api.hnpwa.com/v0/item/@id.json";

const app = document.querySelector("#root");
console.log(location.hash);
const store = {
  currentPage: 1,
};

window.addEventListener("load", init);
window.addEventListener("hashchange", setRoutes);

/** Init */
function init() {
  setRoutes();
}

/** Set Router */
function setRoutes() {
  const path = location.hash;

  if (path === "") {
    createFeed();
  } else if (path.includes("detail")) {
    createContent();
  } else if (path.includes("page")) {
    store.currentPage = Number(path.substring(7));
    createFeed();
  } else console.log("404 Error");
}

/** Create News Feed */
function createFeed() {
  const page = store.currentPage;
  const newsFeed = ajax("GET", NEWS_URL.replace("@page", page), false);
  const template = handleBars.compile(`
    <section class="newsFeed">
      <h1 class="newsFeed__title">News Feed</h1>
      <div class="newsFeed__navigator">
        <span class="newsFeed__navigator__prev">
          <a href="#/page/{{prevPage}}">To Prev</a>
        </span>
        <span class="newsFeed__navigator__next">
          <a href="#/page/{{nextPage}}">To Next</a>
        </span>
      </div>
      <ul class="newsFeed__list">
        {{#each newsFeed}}
        <li class="newsFeed__list__item">
          <a href="#/detail/{{id}}">
            {{title}}
          </a>
        </li>
        {{/each}}
      </ul>
    </section>
  `);
  const data = {
    newsFeed,
    prevPage: store.currentPage > 1 ? store.currentPage - 1 : 1,
    nextPage: newsFeed.length ? store.currentPage + 1 : store.currentPage,
  };

  app.innerHTML = template(data);
}

/** Create News Content */
function createContent() {
  const id = location.hash.substring(9);
  const newsContent = ajax("GET", CONTENT_URL.replace("@id", id), false);
  const template = handleBars.compile(`
    <section>
      <h1>{{newsContent.title}}</h1>
      <a href="#/page/{{currentPage}}">To List</a>
    </section>
  `);
  const data = {
    newsContent,
    currentPage: store.currentPage,
  };

  app.innerHTML = template(data);
}
