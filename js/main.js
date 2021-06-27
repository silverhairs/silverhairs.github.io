function fetchUsers() {
  document.querySelector(
    ".tiles"
  ).innerHTML = `<img id='loading' src='../assets/loading.gif' height='250'/>`;
  fetch("https://jsonplaceholder.typicode.com/users")
    .then((res) => {
      if (!res.ok) {
        throw Error("Failed to fetch users");
      }
      return res.json();
    })
    .then((users) => {
      document.querySelector(".tiles").innerHTML = `<span></span>`;
      users.map((user, index) => {
        let id = index + 1;
        document.querySelector(
          ".tiles"
        ).innerHTML += `<div class='tile'><div class='leading'>
          <p class='leading_title title'>${user.name}</p>
          <p class='leading_subtitle subtitle is-dark'>
            ${user.email}
          </p>
        </div>
        <div class='tile_trailing' id='trailing-${id}'>
          <a class='button' id='button-${id}' onclick='fetchUserPosts(${id})'>Get User's Posts</a>
        </div>
      </div>`;
      });
    })
    .catch((error) => {
      alert(
        "Failed to fetch the users, Check your Internet and refresh this page"
      );
    });
}

fetchUsers();

function fetchUserPosts(userId) {
  const button = document.querySelector(`#button-${userId}`);
  button.innerHTML = "Loading...";
  fetch(`https://jsonplaceholder.typicode.com/users/${userId}/posts`)
    .then((res) => {
      if (!res.ok) {
        document.querySelector(
          `#trailing-${userId}`
        ).innerHTML = `<a class='button error' id='button-${userId}' onclick='fetchUserPosts(${userId})'>Failed</a>`;
        throw Error("Failed to fetch articles");
      }
      return res.json();
    })
    .then((posts) => {
      document.querySelector("#root").innerHTML = `
      <div class="content">
          <a class="breadcrumbs-link" href="${window.location.origin}">
            <span class="breadcrumbs">
              <i class="fa fa-chevron-left is-gray"></i>
              <p>Back</p>
            </span>
          </a>
        </div>
        <div class="center">
          <div class="articles">
            
          </div>
        </div>
      `;
      posts.map((post) => {
        document.querySelector(".articles").innerHTML += `
        <div class="article">
              <p class="title">
               ${post.title}
              </p>
              <p class="article_body">
                ${post.body}
              </p>
            </div>
        `;
      });
    });
}
