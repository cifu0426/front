// Guarda el username en localStorage
export function saveUsernameToStorage(username: string) {
  localStorage.setItem("username", username)
}

// Obtiene el username desde localStorage
export function getUsernameFromStorage() {
  return typeof window !== "undefined" ? localStorage.getItem("username") : null
}
