function generatePassword() {
  const length = document.getElementById("length").value;
  const uppercase = document.getElementById("uppercase").checked;
  const lowercase = document.getElementById("lowercase").checked;
  const numbers = document.getElementById("numbers").checked;
  const symbols = document.getElementById("symbols").checked;

  const password = generateRandomPassword(
    length,
    uppercase,
    lowercase,
    numbers,
    symbols
  );

  document.getElementById("password").value = password;
}

function generateRandomPassword(
  length,
  uppercase,
  lowercase,
  numbers,
  symbols
) {
  const charset = [];

  if (uppercase) charset.push("ABCDEFGHIJKLMNOPQRSTUVWXYZ");
  if (lowercase) charset.push("abcdefghijklmnopqrstuvwxyz");
  if (numbers) charset.push("0123456789");
  if (symbols) charset.push("!@#$%^&*()_+[]{}|;:,.<>?");

  if (charset.length === 0) {
    alert("Please select at least one character type.");
    return "";
  }

  const allChars = charset.join("");
  let password = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * allChars.length);
    password += allChars.charAt(randomIndex);
  }

  return password;
}

function copyToClipboard() {
  const passwordField = document.getElementById("password");
  passwordField.select();
  document.execCommand("copy");
  alert("Password copied to clipboard!");
}
