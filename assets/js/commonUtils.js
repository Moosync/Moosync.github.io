export function isExpired (time) {
  return Date.now() > time;
}

export function getExpiryTime () {
  const date = new Date(Date.now());
  date.setHours(date.getHours() + 2);
  return date.valueOf();
}

export function shouldRegenRequest (cache) {
  if (cache) {
    return isExpired(cache.expiry);
  }
  return true;
}

export function setCache (name, data) {
  localStorage.setItem(name, JSON.stringify(data));
}

export const setElemProperty = (id, prop, value) => {
  const elem = document.getElementById(id)
  if (elem) {
    elem[prop] = value
  }
}

export const callElemMethod = (id, prop, ...obj) => {
  const elem = document.getElementById(id)
  if (elem) {
    elem[prop](...obj)
  }
}

