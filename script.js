const URL = "https://jsonplaceholder.typicode.com";
let getUsers = () => {
  return fetch(`${URL}/users`)
    .then((response) => {
      return response.json();
    })
    .then((users) => {
      console.log(users);
      return users;
    })
    .catch((error) => {
      console.log(error);
      return [];
    });
};
let getPosts = async (userId) => {
  let response = await fetch(`${URL}/posts?userId=${userId}`);
  let posts = await response.json();
  console.log(posts);
  return posts;
};

let buildTabs = (users) => {
  for (let user of users) {
    let tab = document.createElement("button");
    tab.innerText = user.name;
    tab.classList.add("tab");
    document.querySelector("nav").appendChild(tab);
    tab.addEventListener("click", async () => {
      let posts = await getPosts(user.id);
      let main = document.querySelector("main");
      main.innerHTML = "";
      buildPosts(posts);
    });
  }
};
let buildPosts = (posts) => {
  let main = document.querySelector("main");
  for (let post of posts) {
    let postDiv = document.createElement("div");
    postDiv.innerText = post.title;
    main.appendChild(postDiv);
  }
};
window.addEventListener("load", async () => {
  let users = await getUsers();
  let posts = await getPosts(users[0].id);
  buildTabs(users);
  buildPosts(posts);
});

