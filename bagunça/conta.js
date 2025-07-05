import { getZodiacSign } from './../../../signos/signo.js';

// 🟣 Alterna abas
function switchTab(index) {
  const tabs = document.querySelectorAll(".tab");
  const contents = document.querySelectorAll(".tab-content");
  tabs.forEach((tab, i) => {
    tab.classList.toggle("active", i === index);
    contents[i].classList.toggle("active", i === index);
  });
}

// 🖼️ Atualiza e salva o avatar
function handleAvatarChange(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function (e) {
    const imageUrl = e.target.result;
    document.getElementById("avatar").src = imageUrl;
    document.getElementById("avatar").classList.remove("hidden");
    document.getElementById("avatarPlaceholder").style.display = "none";
    document.getElementById("editBtn").style.display = "flex";
    document.getElementById("deleteBtn").style.display = "flex";
    localStorage.setItem("userAvatar", imageUrl);
  };
  reader.readAsDataURL(file);
}

// 🔥 Remove o avatar
function removeAvatar() {
  document.getElementById("avatar").src = "";
  document.getElementById("avatar").classList.add("hidden");
  document.getElementById("avatarPlaceholder").style.display = "flex";
  document.getElementById("editBtn").style.display = "none";
  document.getElementById("deleteBtn").style.display = "none";
  localStorage.removeItem("userAvatar");
}

// ✍️ Habilita edição de campo
function enableEdit(fieldId) {
  const input = document.getElementById(fieldId);
  input.removeAttribute("readonly");
  input.focus();
}

// 💾 Salva as informações editadas
function saveUserInfo() {
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const birthdate = document.getElementById("birthdate").value;

  if (name) localStorage.setItem("userName", name);
  if (email) localStorage.setItem("userEmail", email);
  if (birthdate) {
    localStorage.setItem("userBirthdate", birthdate);

    // ✨ Novo: calcula o signo com base na data
    const [year, monthStr, dayStr] = birthdate.split("-");
    const day = parseInt(dayStr);
    const month = parseInt(monthStr);
    const zodiac = getZodiacSign(day, month);

    localStorage.setItem("userZodiac", JSON.stringify(zodiac));

    if (birthdate) {
      localStorage.setItem("userBirthdate", birthdate);

      // Cálculo do signo
      const [year, month, day] = birthdate.split("-").map(Number);
      const zodiac = getZodiacSign(day, month);
      localStorage.setItem("userZodiac", JSON.stringify(zodiac));

      // Atualiza na interface também
      document.getElementById("userZodiac").textContent = `${zodiac.icon} ${zodiac.sign}`;
    }

    // Atualiza na tela
    document.getElementById("userZodiac").textContent = `${zodiac.icon} ${zodiac.sign}`;
  }

  // Atualiza cabeçalho
  document.getElementById("username").textContent = name || email.split("@")[0];
  document.getElementById("userEmail").textContent = email;
  document.getElementById("userEmail").href = "mailto:" + email;

  // Torna os campos readonly novamente
  ["name", "email", "birthdate"].forEach(id =>
    document.getElementById(id).setAttribute("readonly", true)
  );

  alert("Informações salvas com sucesso!");
}

// 🧠 Carrega dados salvos ao abrir a tela
function loadUserData() {
  const name = localStorage.getItem("userName") || "";
  const email = localStorage.getItem("userEmail") || "";
  const birthdate = localStorage.getItem("userBirthdate") || "";
  const avatar = localStorage.getItem("userAvatar");

  document.getElementById("name").value = name;
  document.getElementById("email").value = email;
  document.getElementById("birthdate").value = birthdate;

  // Cabeçalho
  document.getElementById("username").textContent = name || email.split("@")[0];
  document.getElementById("userEmail").textContent = email;
  document.getElementById("userEmail").href = "mailto:" + email;

  // Avatar
  const avatarImg = document.getElementById("avatar");
  const placeholder = document.getElementById("avatarPlaceholder");
  const editBtn = document.getElementById("editBtn");
  const deleteBtn = document.getElementById("deleteBtn");

  if (avatar) {
    avatarImg.src = avatar;
    avatarImg.classList.remove("hidden");
    placeholder.style.display = "none";
    editBtn.style.display = "flex";
    deleteBtn.style.display = "flex";
  } else {
    avatarImg.src = "";
    avatarImg.classList.add("hidden");
    placeholder.style.display = "flex";
    editBtn.style.display = "none";
    deleteBtn.style.display = "none";
  }

  // Signo (se existir)
  const zodiac = JSON.parse(localStorage.getItem("userZodiac"));
  if (zodiac) {
    document.getElementById("userZodiac").textContent = `${zodiac.icon} ${zodiac.sign}`;
  }
}

// 🔐 Atualiza senha local (exemplo básico)
function updatePassword() {
  const pass1 = document.getElementById("password").value;
  const pass2 = document.getElementById("passwordRepeat").value;

  if (pass1 !== pass2) {
    alert("As senhas não coincidem!");
    return;
  }

  if (pass1.trim()) {
    localStorage.setItem("userPassword", pass1);
    alert("Senha atualizada com sucesso!");
  } else {
    alert("Nada foi alterado.");
  }

  document.getElementById("password").value = "";
  document.getElementById("passwordRepeat").value = "";
}

// 📦 Registra funções globais se necessário
window.switchTab = switchTab;
window.removeAvatar = removeAvatar;
window.enableEdit = enableEdit;
window.saveUserInfo = saveUserInfo;
window.updatePassword = updatePassword;

// 🧪 Inicialização
document.addEventListener("DOMContentLoaded", () => {
  loadUserData();
  document.getElementById("avatarInput").addEventListener("change", handleAvatarChange);
});
