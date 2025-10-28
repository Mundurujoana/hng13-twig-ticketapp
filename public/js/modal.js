// document.addEventListener("DOMContentLoaded", () => {
//   const modals = document.querySelectorAll(".modal");

//   modals.forEach(modal => {
//     const closeBtn = modal.querySelector(".modal-close");

//     // Close button
//     closeBtn.addEventListener("click", () => {
//       modal.classList.add("hidden");
//     });

//     // Click outside modal content
//     modal.addEventListener("click", (e) => {
//       if (e.target === modal) {
//         modal.classList.add("hidden");
//       }
//     });
//   });

//   // Open modal buttons
//   const openButtons = document.querySelectorAll("[data-modal-target]");
//   openButtons.forEach(btn => {
//     btn.addEventListener("click", () => {
//       const targetId = btn.getAttribute("data-modal-target");
//       const modal = document.getElementById(targetId);
//       if (modal) modal.classList.remove("hidden");
//     });
//   });
// });
