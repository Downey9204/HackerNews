import ajax from "./http";

const NEWS_URL = "https://api.hnpwa.com/v0/news/@page.json";
const CONTENT_URL = "https://api.hnpwa.com/v0/item/@id.json";

const app = document.querySelector("#root");
const store = {
  currentPage: 1,
};

window.addEventListener("load", init);
window.addEventListener("hashchange", setRoutes);

/** Init */
function init() {
  createFeed();
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
  let template = `
    <section>
      <h1>News Feed</h1>
      <ul>
        {{__news_feed__}}
      </ul>
      <div>
        <span>
          <a href="#/page/{{__prev_page__}}">To Prev</a>
          <a href="#/page/{{__next_page__}}">To Next</a>
        </span>
      </div>
    </section>
  `;

  const newsList = [];
  for (let i = 0; i < newsFeed.length; i++) {
    newsList.push(`
      <li>
        <a href="#/detail/${newsFeed[i].id}">
          ${newsFeed[i].title}
        </a>
      </li>
    `);
  }

  const prev = store.currentPage > 1 ? store.currentPage - 1 : 1;
  const next = newsList.length ? store.currentPage + 1 : store.currentPage;
  template = template.replace("{{__news_feed__}}", newsList.join(""));
  template = template.replace("{{__prev_page__}}", prev);
  template = template.replace("{{__next_page__}}", next);

  app.innerHTML = template;
}

/** Create News Content */
function createContent() {
  const id = location.hash.substring(9);
  const newsContent = ajax("GET", CONTENT_URL.replace("@id", id), false);
  let template = `
    <section>
      <h1>{{__content_title__}}</h1>
      <a href="#/page/{{__current_page__}}">To List</a>
    </section>
  `;

  template = template.replace("{{__content_title__}}", newsContent.title);
  template = template.replace("{{__current_page__}}", store.currentPage);

  app.innerHTML = template;
}
