const form = document.getElementById("supportForm");
const resultSection = document.getElementById("resultSection");
const resultTitle = document.getElementById("resultTitle");
const resultMessage = document.getElementById("resultMessage");
const summaryGrid = document.getElementById("summaryGrid");
const newRequestBtn = document.getElementById("newRequestBtn");
const messageInput = document.getElementById("message");
const charCount = document.getElementById("charCount");

messageInput.addEventListener("input", () => {
  charCount.textContent = messageInput.value.length;
});

function clearErrors() {
  document.querySelectorAll(".error").forEach(el => el.textContent = "");
}

function setError(id, message) {
  const el = document.getElementById(id);
  if (el) el.textContent = message;
}

function validateForm(data) {
  clearErrors();
  let valid = true;

  if (!data.fullName.trim()) {
    setError("fullNameError", "Please enter your name.");
    valid = false;
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(data.email.trim())) {
    setError("emailError", "Enter a valid email.");
    valid = false;
  }

  const phoneDigits = data.phone.replace(/\D/g, "");
  if (phoneDigits.length !== 10) {
    setError("phoneError", "Enter a 10-digit phone number.");
    valid = false;
  }

  if (!data.userType) {
    setError("userTypeError", "Select patient or volunteer.");
    valid = false;
  }

  if (!data.city.trim()) {
    setError("cityError", "Enter your city.");
    valid = false;
  }

  if (!data.need) {
    setError("needError", "Select the support type.");
    valid = false;
  }

  return valid;
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const data = {
    fullName: document.getElementById("fullName").value,
    email: document.getElementById("email").value,
    phone: document.getElementById("phone").value,
    userType: document.getElementById("userType").value,
    city: document.getElementById("city").value,
    need: document.getElementById("need").value,
    message: document.getElementById("message").value
  };

  if (!validateForm(data)) return;

  const requestId = "HC-" + Math.floor(100000 + Math.random() * 900000);
  const request = {
    ...data,
    requestId,
    submittedAt: new Date().toLocaleString()
  };

  localStorage.setItem("healthConnectLatestRequest", JSON.stringify(request));

  resultTitle.textContent = `Thank you, ${data.fullName.split(" ")[0]}!`;
  resultMessage.textContent =
    `Your ${data.userType.toLowerCase()} support request has been recorded successfully. Request ID: ${requestId}.`;

  const fields = [
    ["Request ID", requestId],
    ["Name", data.fullName],
    ["Type", data.userType],
    ["City", data.city],
    ["Support Needed", data.need],
    ["Submitted", request.submittedAt],
    ["Email", data.email],
    ["Phone", data.phone],
    ["Message", data.message || "No additional message"]
  ];

  summaryGrid.innerHTML = fields.map(([label, value]) => `
    <div class="summary-item">
      <span>${escapeHTML(label)}</span>
      <strong>${escapeHTML(value)}</strong>
    </div>
  `).join("");

  resultSection.classList.remove("hidden");
  resultSection.scrollIntoView({ behavior: "smooth", block: "start" });
});

newRequestBtn.addEventListener("click", () => {
  form.reset();
  charCount.textContent = "0";
  clearErrors();
  resultSection.classList.add("hidden");
  document.getElementById("register").scrollIntoView({ behavior: "smooth" });
});

function escapeHTML(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

// ---------------- FAQ Assistant ----------------

const chatForm = document.getElementById("chatForm");
const chatInput = document.getElementById("chatInput");
const chatMessages = document.getElementById("chatMessages");

const faqResponses = [
  {
    keywords: ["register", "registration", "signup", "sign up", "form"],
    answer: "You can register by filling in the support form. Choose Patient or Volunteer, enter the required details, and submit the request."
  },
  {
    keywords: ["service", "services", "help", "support"],
    answer: "This concept app covers patient support, volunteer registration, healthcare-support information, and FAQ assistance."
  },
  {
    keywords: ["volunteer", "volunteering"],
    answer: "Choose 'Volunteer' in the registration form and describe the type of assistance you can provide."
  },
  {
    keywords: ["patient", "medical", "doctor", "hospital"],
    answer: "Patients can submit their basic details and describe the support or healthcare information they need. This prototype does not provide medical diagnosis."
  },
  {
    keywords: ["emergency", "urgent", "ambulance"],
    answer: "This is a concept-level support app, not an emergency medical service. For an emergency, contact your local emergency service or go to the nearest appropriate healthcare facility."
  },
  {
    keywords: ["contact", "reach", "ngo"],
    answer: "For this prototype, the registration form is the main contact channel. A production NGO version could add verified phone, email, and support-centre details."
  },
  {
    keywords: ["data", "privacy", "safe", "stored"],
    answer: "The demo stores only the latest submitted request in your browser using localStorage. It does not send data to a server."
  }
];

function getBotResponse(message) {
  const text = message.toLowerCase();

  for (const item of faqResponses) {
    if (item.keywords.some(keyword => text.includes(keyword))) {
      return item.answer;
    }
  }

  return "I can help with registration, patient support, volunteering, services, privacy, or emergency-service information. Try asking one of those questions.";
}

function addMessage(text, type) {
  const bubble = document.createElement("div");
  bubble.className = `chat-bubble ${type}`;
  bubble.textContent = text;
  chatMessages.appendChild(bubble);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

chatForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const message = chatInput.value.trim();
  if (!message) return;

  addMessage(message, "user");
  chatInput.value = "";

  setTimeout(() => {
    addMessage(getBotResponse(message), "bot");
  }, 350);
});

document.querySelectorAll(".suggestion").forEach(button => {
  button.addEventListener("click", () => {
    const question = button.textContent;
    addMessage(question, "user");

    setTimeout(() => {
      addMessage(getBotResponse(question), "bot");
    }, 350);
  });
});
