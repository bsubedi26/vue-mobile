export default (value) => {
  if (value && value.charAt(0) !== '-') {
    return `+${value}`
  }
  return value
}
