// TTask 7 mock fetch api call on Table
document.addEventListener("DOMContentLoaded", () => {
  fetch("https://jsonplaceholder.typicode.com/posts")
    .then((response) => response.json())
    .then((data) => {
      const tableBody = document.getElementById("data-table-body");

      const first10Posts = data.slice(0, 10);

      first10Posts.forEach((post) => {
        const row = document.createElement("tr");
        row.innerHTML = `
                    <td>${post.id}</td>
                    <td>${post.title}</td>
                    <td>${post.body}</td>
                `;
        tableBody.appendChild(row);
      });
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
});
