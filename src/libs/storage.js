import { getEnv } from './util'

export const setStorage = (key, value) => {
  window.localStorage.setItem(`${key}-${getEnv()}`, value)
}

export const getStorage = (key) => {
  return window.localStorage.getItem(`${key}-${getEnv()}`)
}

export const removeStorage = (key) => {
  window.localStorage.removeItem(`${key}-${getEnv()}`)
}
