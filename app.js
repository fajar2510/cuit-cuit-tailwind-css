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
let imageURL; // deklarasi variabel url
const previewDiv = document.querySelector("#preview");
const tombolHapusImage = document.querySelector("#hapusImage");

function handleFileSelect(event) {
  const file = event.target.files[0];
  const reader = new FileReader();

  reader.onload = function (event) {
    const img = new Image();
    const imgstatus = document.createElement("img");
    imgstatus.src = event.target.result;
    // document.querySelector("#statusContainer").appendChild(imgstatus);

    img.src = reader.result;
    img.style.objectFit = "cover";
    img.style.width = "100%";
    img.style.height = "500px";

    previewDiv.innerHTML = "";
    previewDiv.classList.replace("hidden", "flex");
    tombolHapusImage.classList.replace("hidden", "inline-flex");
    previewDiv.appendChild(img);
    selectedImage = img;

    // Mengambil URL gambar
    imageURL = reader.result;
    console.log(imageURL);
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

// MEMBUAT LIST STATUS
const statusList = [];
const RENDER_EVENT = "render-status";

function generateId() {
  return +new Date();
}

document.addEventListener("DOMContentLoaded", function () {
  const submitForm = document.querySelector("#form");
  submitForm.addEventListener("submit", function (event) {
    event.preventDefault();
    addStatus();

    document.querySelector("#form").reset(); // Mengosongkan form setelah mengirim
    deleteImage();
  });
});

function addStatus() {
  const textStatus = document.querySelector("#inputStatus");
  const img = imageURL;
  const timeStamp = new Date();

  const generateID = generateId();
  const statusObject = generateStatusObject(
    generateID,
    textStatus.value,
    img,
    timeStamp,
    false
  );
  statusList.push(statusObject);

  document.dispatchEvent(new Event(RENDER_EVENT));
}

function timeSince(date) {
  const seconds = Math.floor((new Date() - date) / 1000);

  if (seconds < 10) {
    return "baru saja";
  } else if (seconds < 60) {
    return `${seconds} detik yang lalu`;
  } else if (seconds < 3600) {
    const minutes = Math.floor(seconds / 60);
    return `${minutes} menit yang lalu`;
  } else if (seconds < 86400) {
    const hours = Math.floor(seconds / 3600);
    return `${hours} jam yang lalu`;
  } else if (seconds < 2592000) {
    const days = Math.floor(seconds / 86400);
    return `${days} hari yang lalu`;
  } else if (seconds < 31536000) {
    const months = Math.floor(seconds / 2592000);
    return `${months} bulan yang lalu`;
  } else {
    return `sedang memuat...`;
  }
}

function generateStatusObject(id, cuit, img, timeStamp, isLike) {
  const statusObject = {
    id,
    cuit,
    img,
    timeStamp: timeSince(new Date(timeStamp)),
    isLike,
  };

  // Update timestamp string every second
  setInterval(() => {
    statusObject.timeStamp = timeSince(new Date(timeStamp));
    const timestampElement = document.getElementById(`timestamp-${id}`);
    if (timestampElement) {
      timestampElement.textContent = statusObject.timeStamp;
    }
  }, 1000);

  return statusObject;
}

function makeStatus(statusObject) {
  const timestampString = timeSince(statusObject.timeStamp);

  const htmlStatus = `
  <div class="container w-full py-3 border-b border-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 ">
  <div class="flex items-start space-x-3">
    <div class="flex-shrink-0 rounded-full border border-slate-400">
      <img
        src="${statusObject.img}"
        alt="User Profile Picture"
        class="rounded-full w-10 h-10 object-cover"
        
      />
    </div>
    <div class="flex-grow group">
      <div class="flex items-center">
        <a href="#" class="font-bold dark:text-white mr-2"
          >id${statusObject.id}</a
        >
        <span class="text-gray-500 text-xs mr-2 dark:text-slate-300 truncate ">@${statusObject.id}</span>
        <span class="dot text-gray-500 text-xs mr-2"></span>
        <span id="timestamp-${statusObject.id}" class="text-gray-500 text-sm dark:text-white">${timestampString}</span> <br />
      </div>
      <div
        class="text-gray-900 dark:text-white leading-tight justify-center"
      >
      ${statusObject.cuit}
      </div>
      <div
        id="cuit-image"
        class="mt-2 rounded-xl overflow-hidden group-hover:scale-[96%] transition duration-500 ease-in-out"
      >
      
        <img
          src="${statusObject.img}"
          class="rounded-xl object-cover w-full h-48 md:h-64 lg:h-80 group-hover:scale-[107%] transition duration-500 ease-in-out"
          alt="list 1"
        />
      </div>
      <div class="flex justify-start pl-3 mt-3">
        <a href="#" class="text-gray-500 hover:text-primary mr-2 dark:text-white"
          ><i class="far fa-comment fa-lg"></i
        ></a>
        <a href="#" class="text-gray-500 hover:text-green-500 mr-2 dark:text-white"
          ><i class="fas fa-retweet fa-lg"></i> 5</
        >
        <a href="#" id="buttonLike" class="text-gray-500 dark:text-white hover:text-pink-500 mr-2">
          <i class="far fa-heart fa-lg"></i> <span id="totalLike">10</span></a>
        <a href="#" class="text-gray-500 hover:text-pink-500 mr-2 dark:text-white" 
        onclick="deleteStatus(${statusObject.id})"
      ><i class="far fa-trash-alt fa-lg"></i></a>
      </div>
    </div>
    </div>
  </div>`;

  return htmlStatus;
}

function deleteStatus(statusId) {
  // Find the index of the status with the given ID
  const statusIndex = statusList.findIndex((status) => status.id === statusId);

  // If the status is found, remove it from the array
  if (statusIndex !== -1) {
    statusList.splice(statusIndex, 1);
  }

  // Render the updated status list
  renderStatusList();
}

function renderStatusList() {
  const statusContainer = document.querySelector("#statusContainer");
  let html = "";

  // Reverse the statusList array to display the latest status on top
  const reversedStatusList = statusList.slice().reverse();

  // loop through reversedStatusList to generate HTML for each status object
  reversedStatusList.forEach(function (statusObject) {
    html += makeStatus(statusObject);
  });

  // set the innerHTML of the status container to the generated HTML
  statusContainer.innerHTML = html;
}

document.addEventListener(RENDER_EVENT, function () {
  const statusContainer = document.querySelector("#statusContainer");
  let html = "";

  // Reverse the statusList array to display the latest status on top
  const reversedStatusList = statusList.slice().reverse();

  // loop through reversedStatusList to generate HTML for each status object
  reversedStatusList.forEach(function (statusObject) {
    html += makeStatus(statusObject);
    // console.log(statusObject);
  });

  // set the innerHTML of the status container to the generated HTML
  statusContainer.innerHTML = html;
});
