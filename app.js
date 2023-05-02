// Navbar fix

window.onscroll = function () {
  const header = document.querySelector("header");
  const fixedNav = header.offsetTop;
  const toTop = document.querySelector("#to-top");

  if (window.pageYOffset > fixedNav) {
    header.classList.add("navbar-fixed");
    toTop.classList.remove("hidden");
    toTop.classList.add("flex");
  } else {
    header.classList.remove("navbar-fixed");
    toTop.classList.remove("flex");
    toTop.classList.add("hidden");
  }
};

// Hamburger

const hamburger = document.querySelector("#hamburger");
const navMenu = document.querySelector("#nav-menu");

hamburger.addEventListener("click", function () {
  hamburger.classList.toggle("hamburger-active");
  navMenu.classList.toggle("hidden");
});

// klik diluar hamburger

window.addEventListener("click", function (e) {
  if (e.target != hamburger && e.target != navMenu) {
    hamburger.classList.remove("hamburger-active");
    navMenu.classList.add("hidden");
  }
});

// darlmode toggle
const darkToggle = document.querySelector("#dark-toggle");
const html = document.querySelector("html");

darkToggle.addEventListener("click", function () {
  if (darkToggle.checked) {
    html.classList.add("dark");
    localStorage.theme = "dark";
  } else {
    html.classList.remove("dark");
    localStorage.theme = "light";
  }
});

// pindah toggle sesuai mode

if (
  localStorage.theme === "dark" ||
  (!("theme" in localStorage) &&
    window.matchMedia("(prefers-color-scheme: dark)").matches)
) {
  darkToggle.checked = true;
} else {
  darkToggle.checked = false;
}

// validation batas input karakter

document.addEventListener("DOMContentLoaded", function () {
  const inputMaxLengthOnLoad = document.querySelector("#inputStatus").maxLength;
  let inputStatus = document.querySelector("#inputStatus");

  document.querySelector("#sisaKarakter").innerText = inputMaxLengthOnLoad;
  document.querySelector("#inputStatus").addEventListener("input", function () {
    let jumlahKarakterDiketik =
      document.querySelector("#inputStatus").value.length;
    const jumlahKarakterMaksimal =
      document.querySelector("#inputStatus").maxLength;

    console.log("jumlahKarakterDiketik: ", jumlahKarakterDiketik);
    console.log("jumlahKarakterMaksimal: ", jumlahKarakterMaksimal);

    let sisaKarakterUpdate = jumlahKarakterMaksimal - jumlahKarakterDiketik;

    document.querySelector("#sisaKarakter").innerText =
      sisaKarakterUpdate.toString();

    const notifikasiSisaKarakter = document.querySelector(
      "#notifikasiSisaKarakter"
    );
    const batasTercapai = document.querySelector("#batasTercapai");

    if (sisaKarakterUpdate === 0) {
      batasTercapai.innerText = "*Batas maksimal karakter telah tercapai";
      batasTercapai.classList.remove("hidden");
      notifikasiSisaKarakter.classList.add("hidden");
    } else if (sisaKarakterUpdate <= 10) {
      notifikasiSisaKarakter.classList.add("text-pink-500");
      notifikasiSisaKarakter.classList.remove("text-slate-600");
      batasTercapai.classList.add("hidden");
      notifikasiSisaKarakter.classList.remove("hidden");
    } else {
      notifikasiSisaKarakter.classList.remove("text-pink-500");
      notifikasiSisaKarakter.classList.add("text-slate-600");
      batasTercapai.classList.add("hidden");
      notifikasiSisaKarakter.classList.remove("hidden");
    }
  });

  inputStatus.addEventListener("focus", function () {
    console.log("inputStatus: focus");
    document
      .querySelector("#notifikasiSisaKarakter")
      .classList.replace("opacity-50", "opacity-100");
  });

  inputStatus.addEventListener("blur", function () {
    console.log("inputNama: blur");
    document
      .querySelector("#notifikasiSisaKarakter")
      .classList.replace("opacity-100", "opacity-50");
  });
});

// load image pada input form status
let selectedImage;
const previewDiv = document.querySelector("#preview");
const tombolHapusImage = document.querySelector("#hapusImage");

function handleFileSelect(event) {
  const file = event.target.files[0];
  const reader = new FileReader();

  reader.onload = function (event) {
    const img = new Image();
    const imgstatus = document.createElement("img");
    imgstatus.src = event.target.result;
    document.getElementById("statusCuit").appendChild(imgstatus);

    img.src = reader.result;
    img.style.objectFit = "cover";
    img.style.width = "100%";
    img.style.height = "200px";

    previewDiv.innerHTML = "";
    previewDiv.classList.replace("hidden", "flex");
    tombolHapusImage.classList.replace("hidden", "inline-flex");
    previewDiv.appendChild(img);
    selectedImage = img;
  };

  reader.readAsDataURL(file);
}

function deleteImage() {
  if (selectedImage) {
    previewDiv.classList.replace("flex", "hidden");
    tombolHapusImage.classList.replace("inline-flex", "hidden");
    previewDiv.removeChild(selectedImage);

    selectedImage = null;
  }
}
