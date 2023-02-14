import ajax from "./http";

const NEWS_URL = "https://api.hnpwa.com/v0/news/1.json";

const app = document.querySelector("#root");

window.addEventListener("load", init);

/** Init */
function init() {
  createFeed();
}

/** Create News Feed */
function createFeed() {
  const newsFeed = ajax("GET", NEWS_URL, false);
  let template = `
    <section>
      <h1>News Feed</h1>
      <ul>
        {{__news_feed__}}
      </ul>
      <div>
        <span>
          <a href="#">To Prev</a>
          <a href="#">To Next</a>
        </span>
      </div>
    </section>
  `;

  const newsList = [];
  for (let i = 0; i < 30; i++) {
    newsList.push(`
      <li>
        <a href="#${newsFeed[i].id}">
          ${newsFeed[i].title}
        </a>
      </li>
    `);
  }

  template = template.replace("{{__news_feed__}}", newsList.join(""));

  app.innerHTML = template;
}
