function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search_input");
  let city = document.querySelector("#city");
  city.innerHTML = searchInput.value;
}

let searchForm = document.querySelector("#search_form");
searchForm.addEventListener("submit", handleSearchSubmit);
