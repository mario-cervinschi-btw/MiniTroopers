function navBurgerClick() {
  const elem = document.getElementById("nav-links");
  if (elem.style.display === "none" || elem.style.display === "") {
    elem.style.display = "flex";
  } else {
    elem.style.display = "none";
  }
}

document.getElementById("nav-burger").addEventListener("click", navBurgerClick);
