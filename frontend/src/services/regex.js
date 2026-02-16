function validateEmail(email) {
  const regex = /^[a-zA-Z0-0._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(email.trim());
}

function validatePassword(password) {
  // 1 minuscule, 1 majuscule, 1 caractère spécial et 8 caractères min
  const regex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&"#'()+,-./:;<=>?[\]^_`{|}~])[A-Za-z\d@$!%*?&"#'()+,-./:;<=>?[\]^_`{|}~]{8,}$/;
  return regex.test(password);
}

function validateName(name) {
  const regex = /^[a-zA-ZÀ-ÿ]+(?:[\s'-][a-zA-ZÀ-ÿ]+)*$/;
  return regex.test(name.trim()); // Ajout de .trim() enlever les espaces avant/apres
}
function validateSurname(surname) {
  const regex = /^[a-zA-ZÀ-ÿ]+(?:[\s'-][a-zA-ZÀ-ÿ]+)*$/;
  return regex.test(surname.trim());
}
export { validateEmail, validatePassword, validateName, validateSurname };
