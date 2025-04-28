export function setToken(token) {
  if (!token) {
    console.error("El token es nulo o indefinido.");
    return; 
}

  sessionStorage.setItem("token", token);
}

export function getToken() {
    return sessionStorage.getItem("token");
  }
  
export function clearToken() {
    sessionStorage.removeItem("token");
}