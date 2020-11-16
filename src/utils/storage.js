export function storage(key, data) {
  if (!data) {
    return JSON.parse(localStorage.getItem(key));
  }

  localStorage.setItem(key, JSON.stringify(data));
}


export function clearStorage() {
  localStorage.clear();
  window.location.reload();
};