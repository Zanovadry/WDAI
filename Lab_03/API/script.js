const productsTableContent = document
  .getElementById("productsTable")
  .getElementsByTagName("tbody")[0];
const filterInput = document.getElementById("filterInput");
const sortSelect = document.getElementById("sortSelect");
let products = [];

fetch("https://dummyjson.com/products")
  .then((response) => response.json())
  .then((data) => {
    products = data.products.slice(0, 30);
    renderTable(products);
  });

function renderTable(products) {
  let index = 0;
  productsTableContent.innerHTML = "";
  products.forEach((product) => {
    index++;
    const row = productsTableContent.insertRow();
    row.innerHTML = `
                    <td>${index}</td>
                    <td><img src="${product.thumbnail}" alt="${product.title}"></td>
                    <td>${product.title}</td>
                    <td>${product.description}</td>
                `;
  });
}

filterInput.addEventListener("input", () => {
  const filterText = filterInput.value.toLowerCase();
  const filteredProducts = products.filter(
    (product) =>
      product.title.toLowerCase().includes(filterText) ||
      product.description.toLowerCase().includes(filterText)
  );
  renderTable(filteredProducts);
});

sortSelect.addEventListener("change", () => {
  const sortValue = sortSelect.value;
  let sortedProducts;
  if (sortValue === "ascending") {
    sortedProducts = [...products].sort((a, b) =>
      a.title.localeCompare(b.title)
    );
  } else if (sortValue === "descending") {
    sortedProducts = [...products].sort((a, b) =>
      b.title.localeCompare(a.title)
    );
  } else {
    sortedProducts = [...products];
  }
  renderTable(sortedProducts);
});
