document.addEventListener("DOMContentLoaded", () => {
  let tickets = JSON.parse(localStorage.getItem("ticketapp_tickets") || "[]");

  const ticketGrid = document.getElementById("ticket-grid");
  const ticketModal = document.getElementById("ticket-modal");
  const confirmModal = document.getElementById("confirm-delete-modal");
  const ticketForm = document.getElementById("ticket-form");
  const titleInput = document.getElementById("ticket-title");
  const descInput = document.getElementById("ticket-desc");
  const statusSelect = document.getElementById("ticket-status");
  const modalTitle = ticketModal.querySelector(".modal-title");

  let editingTicketId = null;
  let deletingTicketId = null;

  function saveTickets() {
    localStorage.setItem("ticketapp_tickets", JSON.stringify(tickets));
    renderTickets();
  }

  function renderTickets() {
    ticketGrid.innerHTML = "";
    if (!tickets.length) {
      ticketGrid.innerHTML = `<p class="no-tickets">No tickets found.</p>`;
      return;
    }
    tickets.forEach(ticket => {
      const card = document.createElement("div");
      card.className = "ticket-card";
      card.dataset.id = ticket.id;
      card.innerHTML = `
        <h2>${ticket.title}</h2>
        ${ticket.description ? `<p>${ticket.description}</p>` : ""}
        <span class="status ${ticket.status}">${ticket.status.replace("_", " ").toUpperCase()}</span>
        <div class="ticket-actions">
          <button class="edit-btn" data-id="${ticket.id}">Edit</button>
          <button class="delete-btn" data-id="${ticket.id}">Delete</button>
        </div>
      `;
      ticketGrid.appendChild(card);
    });
  }

  // ===== Modal Functions =====
  function openTicketModal(ticket = null) {
    ticketModal.classList.remove("hidden");
    if (ticket) {
      modalTitle.textContent = "Edit Ticket";
      titleInput.value = ticket.title;
      descInput.value = ticket.description || "";
      statusSelect.value = ticket.status;
      editingTicketId = ticket.id;
    } else {
      modalTitle.textContent = "Create Ticket";
      ticketForm.reset();
      editingTicketId = null;
    }
  }

  function closeTicketModal() {
    ticketModal.classList.add("hidden");
  }

  function openConfirmModal(ticketId) {
    confirmModal.classList.remove("hidden");
    deletingTicketId = ticketId;
  }

  function closeConfirmModal() {
    confirmModal.classList.add("hidden");
    deletingTicketId = null;
  }

  // ===== Toast =====
  function showToast(message, type = "success") {
    const container = document.getElementById("toast-container");
    const toast = document.createElement("div");
    toast.textContent = message;
    toast.className = `toast ${type}`;
    container.appendChild(toast);

    toast.style.transform = "translateY(-100px)";
    toast.style.opacity = "0";
    toast.style.transition = "all 0.4s ease-in-out";
    requestAnimationFrame(() => {
      toast.style.transform = "translateY(30px)";
      toast.style.opacity = "1";
    });

    setTimeout(() => {
      toast.style.transform = "translateY(-100px)";
      toast.style.opacity = "0";
      toast.addEventListener('transitionend', () => toast.remove());
    }, 2500);
  }

  // ===== Event Listeners =====
  document.getElementById("new-ticket-btn").addEventListener("click", () => openTicketModal());

  // Close ticket modal
  ticketModal.querySelector(".modal-close").addEventListener("click", closeTicketModal);

  // Close confirm modal
  confirmModal.querySelector(".modal-close")?.addEventListener("click", closeConfirmModal);

  // Cancel delete
  confirmModal.querySelector("#cancel-delete").addEventListener("click", closeConfirmModal);

  // Confirm delete
  confirmModal.querySelector("#confirm-delete").addEventListener("click", () => {
    tickets = tickets.filter(t => t.id != deletingTicketId);
    saveTickets();
    closeConfirmModal();
    showToast("Ticket deleted successfully!", "success");
  });

  // Edit / Delete buttons
  ticketGrid.addEventListener("click", (e) => {
    if (e.target.classList.contains("edit-btn")) {
      const id = e.target.dataset.id;
      const ticket = tickets.find(t => t.id == id);
      openTicketModal(ticket);
    } else if (e.target.classList.contains("delete-btn")) {
      openConfirmModal(e.target.dataset.id);
    }
  });

  // Ticket form submit
  ticketForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const title = titleInput.value.trim();
    if(!title){
      showToast("Title is required.", "error");
      return;
    }

    const ticketData = {
      id: editingTicketId || Date.now(),
      title,
      description: descInput.value.trim(),
      status: statusSelect.value
    };

    if (editingTicketId) {
      tickets = tickets.map(t => t.id == editingTicketId ? ticketData : t);
      showToast("Ticket updated successfully!", "success");
    } else {
      tickets.push(ticketData);
      showToast("Ticket created successfully!", "success");
    }

    saveTickets();
    closeTicketModal();
  });

  renderTickets();
});
