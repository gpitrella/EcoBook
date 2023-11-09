export function passwordValidator(password) {
    if (!password) return "Password no puede estar vacio."
    if (password.length < 6) return 'Password debe tener al menos 5 caracteres.'
    return ''
  }