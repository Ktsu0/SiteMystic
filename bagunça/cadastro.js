// Retorna o signo com base na data
function getZodiacSign(day, month) {
  const signs = [
    { sign: "Capricórnio", icon: "♑", start: [12, 22], end: [1, 19] },
    { sign: "Aquário", icon: "♒", start: [1, 20], end: [2, 18] },
    { sign: "Peixes", icon: "♓", start: [2, 19], end: [3, 20] },
    { sign: "Áries", icon: "♈", start: [3, 21], end: [4, 19] },
    { sign: "Touro", icon: "♉", start: [4, 20], end: [5, 20] },
    { sign: "Gêmeos", icon: "♊", start: [5, 21], end: [6, 20] },
    { sign: "Câncer", icon: "♋", start: [6, 21], end: [7, 22] },
    { sign: "Leão", icon: "♌", start: [7, 23], end: [8, 22] },
    { sign: "Virgem", icon: "♍", start: [8, 23], end: [9, 22] },
    { sign: "Libra", icon: "♎", start: [9, 23], end: [10, 22] },
    { sign: "Escorpião", icon: "♏", start: [10, 23], end: [11, 21] },
    { sign: "Sagitário", icon: "♐", start: [11, 22], end: [12, 21] }
  ];

  for (let i = 0; i < signs.length; i++) {
    const { sign, icon, start, end } = signs[i];
    const [startMonth, startDay] = start;
    const [endMonth, endDay] = end;

    if (
      (month === startMonth && day >= startDay) ||
      (month === endMonth && day <= endDay)
    ) {
      return { sign, icon };
    }
  }

  return { sign: "Desconhecido", icon: "❓" };
}

document.getElementById("registerForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const nome = document.getElementById("nome").value;
  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;
  const birthdate = document.getElementById("birthdate").value;

  // Salvando no localStorage
  localStorage.setItem("userName", nome);
  localStorage.setItem("userEmail", email);
  localStorage.setItem("userPassword", senha);
  localStorage.setItem("userBirthdate", birthdate);

  // Calculando signo
  const [year, month, day] = birthdate.split("-");
  const zodiac = getZodiacSign(Number(day), Number(month));
  localStorage.setItem("userZodiac", JSON.stringify(zodiac));

  // Redireciona para a tela de perfil
  window.location.href = "perfil.html"; // ou a página que você estiver usando
});
