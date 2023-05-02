// const statusCuit = [];
// const RENDER_EVENT = "render-status";
// const SAVED_EVENT = "saved-statusCuit";
// const STORAGE_KEY = "CUIT_APPS";

// document.addEventListener("DOMContentLoaded", function () {
//   const submitForm = document.querySelector("#form");
//   submitForm.addEventListener("submit", function (event) {
//     event.preventDefault();
//     addStatus();
//   });

//   if (isStorageExist()) {
//     loadDataFromStorage();
//   }
// });

// function addStatus() {
//   const generateUniqueId = () => {
//     const timestamp = new Date().getTime();
//     const random = Math.floor(Math.random() * 1000000);
//     return `${timestamp}-${random}`;
//   };

//   const generateID = generateUniqueId();
//   const textStatus = document.querySelector("#inputStatus").value;
//   const imgUrl = selectedImage ? selectedImage.src : null;
//   const like = 0;
//   const timestamp = new Date();

//   const statusObject = generateStatusObject(
//     generateID,
//     textStatus,
//     imgUrl,
//     timestamp,
//     like
//   );
//   statusCuit.push(statusObject);

//   document.dispatchEvent(new Event(RENDER_EVENT));
//   saveData();
// }

// function generateStatusObject(id, status, imgUrl, timestamp, like) {
//   return {
//     id,
//     status,
//     imgUrl,
//     timestamp,
//     like,
//   };
// }

// function renderStatus(statusObject) {
//   const container = document.createElement("div");
//   container.classList.add(
//     "container",
//     "w-full",
//     "py-3",
//     "border-b",
//     "border-slate-300",
//     "hover:bg-slate-50"
//   );

//   const flexContainer = document.createElement("div");
//   flexContainer.classList.add("flex", "items-start", "space-x-3");

//   const imgContainer = document.createElement("div");
//   imgContainer.classList.add("flex-shrink-0");

//   const profileImg = document.createElement("img");
//   profileImg.setAttribute("src", "/src/img/img1.jpg");
//   profileImg.setAttribute("alt", "Profile Picture");
//   profileImg.classList.add("rounded-full", "w-10", "h-10", "object-cover");

//   imgContainer.appendChild(profileImg);
//   flexContainer.appendChild(imgContainer);

//   const groupContainer = document.createElement("div");
//   groupContainer.classList.add("flex-grow", "group");

//   const usernameLink = document.createElement("a");
//   usernameLink.setAttribute("href", "#");
//   usernameLink.classList.add("font-bold", "dark:text-white", "mr-2");
//   usernameLink.innerText = "Username";

//   const usernameSpan = document.createElement("span");
//   usernameSpan.classList.add("text-gray-500", "text-xs", "mr-2");
//   usernameSpan.innerText = "@username";

//   const dotSpan = document.createElement("span");
//   dotSpan.classList.add("dot", "text-gray-500", "text-xs", "mr-2");
//   dotSpan.innerText = "•";

//   const timeSpan = document.createElement("span");
//   timeSpan.classList.add("text-gray-500", "text-sm");
//   timeSpan.innerText = getTimeDiff(statusObject.timestamp);

//   const nameTimeContainer = document.createElement("div");
//   nameTimeContainer.classList.add("flex", "items-center");
//   nameTimeContainer.appendChild(usernameLink);
//   nameTimeContainer.appendChild(usernameSpan);
//   nameTimeContainer.appendChild(dotSpan);
//   nameTimeContainer.appendChild(timeSpan);

//   groupContainer.appendChild(nameTimeContainer);

//   const statusText = document.createElement("div");
//   statusText.classList.add(
//     "text-gray-900",
//     "dark:text-white",
//     "leading-tight",
//     "justify-center"
//   );
//   statusText.innerText = statusObject.status;
//   groupContainer.appendChild(statusText);

//   if (statusObject.imgUrl) {
//     const imgDiv = document.createElement("div");
//     imgDiv.setAttribute("id", "cuit-image");
//     imgDiv.classList.add(
//       "mt-2",
//       "rounded-xl",
//       "overflow-hidden",
//       "group-hover:scale-[96%]",
//       "transition",
//       "duration-500",
//       "ease-in-out"
//     );

//     const statusImg = document.createElement("img");
//     statusImg.setAttribute("src", statusObject.imgUrl);
//     statusImg.setAttribute("alt", "Cuit Image");
//     statusImg.classList.add(
//       "rounded-xl",
//       "object-cover",
//       "w-full",
//       "h-36",
//       "md:h-40",
//       "lg:h-64",
//       "group-hover:scale-[107%]",
//       "transition",
//       "duration-500",
//       "ease-in-out"
//     );

//     imgDiv.appendChild(statusImg);
//     groupContainer.appendChild(imgDiv);
//   }

//   const actionDiv = document.createElement("div");
//   actionDiv.classList.add("flex", "justify-start", "mt-2");

//   const commentLink = document.createElement("a");
//   commentLink.setAttribute("href", "#");
//   commentLink.classList.add("text-gray-500", "hover:text-blue-500", "mr-2");

//   const commentIcon = document.createElement("i");
//   // commentIcon;
// }

// function saveData() {
//   if (isStorageExist()) {
//     const parsed = JSON.stringify(statusCuit);
//     localStorage.setItem(STORAGE_KEY, parsed);
//     document.dispatchEvent(new Event(SAVED_EVENT));
//   }
// }

// function loadDataFromStorage() {
//   const serializedData = localStorage.getItem(STORAGE_KEY);
//   let data = JSON.parse(serializedData);

//   if (data !== null) {
//     for (const statusC of data) {
//       statusCuit.push(statusC);
//     }
//   }

//   document.dispatchEvent(new Event(RENDER_EVENT));
// }

// function isStorageExist() /* boolean */ {
//   if (typeof Storage === undefined) {
//     alert("Browser kamu tidak mendukung local storage");
//     return false;
//   }
//   return true;
// }

// document.addEventListener(SAVED_EVENT, function () {
//   let alertMessage = localStorage.getItem(STORAGE_KEY);
//   console.log(alertMessage);
// });
