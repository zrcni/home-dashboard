export function setCSSVariable(key: string, value: string) {
  document.documentElement.style.setProperty(key, value)
}
