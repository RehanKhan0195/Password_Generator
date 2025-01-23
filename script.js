// DOM Elements
const passwordDisplay = document.getElementById("password-display");
const copyBtn = document.getElementById("copy-password");
const charLength = document.getElementById("char-length");
const charLengthValue = document.getElementById("char-length-value");
const checkUppercase = document.getElementById("uppercase");
const checkLowercase = document.getElementById("lowercase");
const checkNumbers = document.getElementById("numbers");
const checkSymbols = document.getElementById("symbols");
const strengthBar = document.getElementById("strength-fill");
const generateBtn = document.getElementById("generate-btn");

// Strength text element
const strengthText = document.createElement("p");
strengthText.className = "text-sm text-center mt-2";
strengthBar.parentNode.parentNode.appendChild(strengthText); // Add below the bar

// Character pools
const uppercaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowercaseLetters = "abcdefghijklmnopqrstuvwxyz";
const numbers = "0123456789";
const symbols = "!@#$%^&*()_+[]{}|;:,.<>?";

// Update character length value
charLength.addEventListener("input", () => {
  charLengthValue.textContent = charLength.value;
});

// Generate password function
function generatePassword() {
  const length = parseInt(charLength.value);
  let characterPool = "";

  if (checkUppercase.checked) characterPool += uppercaseLetters;
  if (checkLowercase.checked) characterPool += lowercaseLetters;
  if (checkNumbers.checked) characterPool += numbers;
  if (checkSymbols.checked) characterPool += symbols;

  if (characterPool === "") {
    passwordDisplay.value = "Please select at least one option!";
    strengthText.textContent = ""; // Clear strength text
    return;
  }

  let password = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characterPool.length);
    password += characterPool[randomIndex];
  }

  passwordDisplay.value = password;
  updateStrength(length, characterPool);
}

// Update strength bar and text
function updateStrength(length, pool) {
  const uniqueCharTypes = [
    checkUppercase.checked,
    checkLowercase.checked,
    checkNumbers.checked,
    checkSymbols.checked,
  ].filter(Boolean).length;

  let strength = Math.min((length / 20) * 100, 100); // Cap strength to 100%
  strengthBar.style.width = `${strength}%`;

  if (length < 8 || uniqueCharTypes <= 1) {
    strengthBar.classList.replace("bg-green-500", "bg-red-500");
    strengthBar.classList.replace("bg-yellow-500", "bg-red-500");
    strengthText.textContent = "Mot de passe non sécurisé";
    strengthText.classList.replace("text-yellow-400", "text-red-400");
    strengthText.classList.add("text-red-400");
  } else if (length >= 8 && length <= 11 && uniqueCharTypes >= 2) {
    strengthBar.classList.replace("bg-green-500", "bg-yellow-500");
    strengthBar.classList.replace("bg-red-500", "bg-yellow-500");
    strengthText.textContent = "Mot de passe moyen";
    strengthText.classList.replace("text-red-400", "text-yellow-400");
    strengthText.classList.add("text-yellow-400");
  } else {
    strengthBar.classList.replace("bg-yellow-500", "bg-green-500");
    strengthBar.classList.replace("bg-red-500", "bg-green-500");
    strengthText.textContent = "Mot de passe sécurisé";
    strengthText.classList.replace("text-red-400", "text-green-400");
    strengthText.classList.replace("text-yellow-400", "text-green-400");
    strengthText.classList.add("text-green-400");
  }
}

// Copy to clipboard
copyBtn.addEventListener("click", () => {
  navigator.clipboard.writeText(passwordDisplay.value);
  alert("Password copied to clipboard!");
});

// Generate password on button click
generateBtn.addEventListener("click", generatePassword);
