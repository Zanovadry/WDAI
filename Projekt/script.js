let buttonSend = document.querySelector("#buttonSend");
let randomDiv = document.querySelector("#randomDiv");
let carIsBroken = document.querySelector("#carIsBroken");
let carIsWorking = document.querySelector("#carIsWorking");
let carPriceError = document.querySelector("#carPriceError");
let carPrice = document.querySelector("#carPrice");

buttonSend.addEventListener("click", (e) => {
  e.preventDefault();
  if (!carIsBroken.checked && !carIsWorking.checked) {
    alert("Uzupełnij wszystkie opcje");
  }
});

var test =
  "<div>Gratulacje użytkowniku <br> <b>Darmowy iphone 17!!!!!<b></div>";

var clock = true;
let delay = setInterval(() => {
  if (clock) {
    randomDiv.innerHTML = test;
  } else {
    randomDiv.innerHTML = "";
  }
  clock = !clock;
}, 5000000);

//check if form input price is within bounds
carPrice.addEventListener("input", () => {
  if (!carPrice.checkValidity() || carPrice.value < 0) {
    carPriceError.className = "incorrectPriceInput";
  } else {
    carPriceError.className = "correctPriceInput";
  }
});
