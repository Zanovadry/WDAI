let buttonSend = document.querySelector("#buttonSend");
let carIsBroken = document.querySelector("#carIsBroken");
let carIsWorking = document.querySelector("#carIsWorking");
let carPriceError = document.querySelector("#carPriceError");
let carPrice = document.querySelector("#carPrice");
let manufactureYearError = document.querySelector("#manufactureYearError");
let manufactureYear = document.querySelector("#manufactureYear");
let carPhoto = document.querySelector("#carPhoto");
let sale = document.querySelectorAll(".sale");
let messageSend = document.querySelector("#messageForm");

function imagePreview(event) {
  if (event.target.files.length == 1) {
    carPhoto.className = "photo";
    carPhoto.src = URL.createObjectURL(event.target.files[0]);
    return;
  }
  carPhoto.className = "noPhoto";
}

function numberInputValidator(event) {
  return event.keyCode === 8 || (event.charCode >= 48 && event.charCode <= 57);
}

try {
  messageSend.addEventListener("submit", (event) => {
    alert("Formularz pomyślnie wysłano!");
  });
} catch {}

//check if form input price is within bounds
try {
  carPrice.addEventListener("input", () => {
    if (carPrice.value > 100000000) {
      carPriceError.className = "incorrectInput";
      return;
    }

    carPriceError.className = "correctInput";
  });
} catch {}

//check if form input manufactureYear is within bounds
//after input is used, keep showing message until input is reset
try {
  let interacted = false;
  manufactureYear.addEventListener("input", () => {
    if (manufactureYear.value.length == 4) {
      interacted = true;
    }
    if (manufactureYear.value.length == 0) {
      interacted = false;
    }
    if (
      (manufactureYear.value > 1999 || manufactureYear.value < 1990) &&
      interacted
    ) {
      manufactureYearError.className = "incorrectInput";
      return;
    }
    manufactureYearError.className = "correctInput";
  });
} catch {}

//enlarge sale description on click
try {
  sale.forEach((sale) => {
    let isOpen = false;
    sale.addEventListener("click", () => {
      if (isOpen) {
        sale.children[0].style = "";
        sale.children[1].style = "";
        sale.children[1].children[0].style = "";
        sale.children[1].children[2].style = "";
        sale.children[1].children[1].className = "saleDescription";
        isOpen = false;
        return;
      }
      sale.children[0].style.display = "none";
      sale.children[1].style.minHeight = "300px";
      sale.children[1].style.width = "100%";
      sale.children[1].children[0].style.display = "none";
      sale.children[1].children[2].style.display = "none";
      sale.children[1].children[1].className = "fullSaleDescription";
      isOpen = true;
    });
  });
} catch {}
