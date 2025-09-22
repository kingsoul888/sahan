const btnEl = document.getElementById("btn");
const birthdayEl = document.getElementById("birthday");
const resultEl = document.getElementById("result");

function calculateAge() {
  const birthdayValue = birthdayEl.value;
  if (birthdayValue === "") {
    // Add shake animation for error
    birthdayEl.style.animation = "shake 0.5s ease-in-out";
    setTimeout(() => {
      birthdayEl.style.animation = "";
    }, 500);

    resultEl.innerHTML = `
      <i class="fas fa-exclamation-triangle" style="color: #ff6b6b;"></i>
      <p style="color: #ff6b6b;">Please enter your birthday</p>
    `;
    resultEl.classList.remove("show");
  } else {
    const age = getAge(birthdayValue);
    const ageDetails = getDetailedAge(birthdayValue);

    resultEl.innerHTML = `
      <i class="fas fa-birthday-cake" style="color: #ffd700;"></i>
      <p>You are <strong>${age}</strong> ${age !== 1 ? "years" : "year"} old</p>
      <p style="font-size: 0.9rem; opacity: 0.8; margin-top: 5px;">
        ${ageDetails.years} years, ${ageDetails.months} months, ${ageDetails.days} days
      </p>
    `;

    resultEl.classList.add("show");

    // Add celebration animation
    btnEl.style.animation = "pulse 0.6s ease-in-out";
    setTimeout(() => {
      btnEl.style.animation = "";
    }, 600);
  }
}

function getAge(birthdayValue) {
  const currentDate = new Date();
  const birthdayDate = new Date(birthdayValue);
  let age = currentDate.getFullYear() - birthdayDate.getFullYear();
  const month = currentDate.getMonth() - birthdayDate.getMonth();

  if (
    month < 0 ||
    (month === 0 && currentDate.getDate() < birthdayDate.getDate())
  ) {
    age--;
  }

  return age;
}

function getDetailedAge(birthdayValue) {
  const currentDate = new Date();
  const birthdayDate = new Date(birthdayValue);

  let years = currentDate.getFullYear() - birthdayDate.getFullYear();
  let months = currentDate.getMonth() - birthdayDate.getMonth();
  let days = currentDate.getDate() - birthdayDate.getDate();

  if (days < 0) {
    months--;
    const lastMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      0
    );
    days += lastMonth.getDate();
  }

  if (months < 0) {
    years--;
    months += 12;
  }

  return { years, months, days };
}

// Add CSS animations dynamically
const style = document.createElement("style");
style.textContent = `
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-5px); }
    75% { transform: translateX(5px); }
  }
  
  @keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.05); }
    100% { transform: scale(1); }
  }
`;
document.head.appendChild(style);

btnEl.addEventListener("click", calculateAge);

// Allow Enter key to calculate
birthdayEl.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    calculateAge();
  }
});
