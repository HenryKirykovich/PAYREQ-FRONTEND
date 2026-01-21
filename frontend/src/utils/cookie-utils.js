export function getCookie(name) {
  const cookies = {};
  document.cookie.split(';').forEach(function(el) {
    let split = el.split('=');
    cookies[split[0].trim()] = split.slice(1).join("=");
  })
  return cookies[name];
}
