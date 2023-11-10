export function emailValidator(email) {
    const re = /\S+@\S+\.\S+/
    if (!email) return "Email no puede estar vacio."
    if (!re.test(email)) return 'Ooops! Email no valido, prueba con otro.'
    return ''
  }