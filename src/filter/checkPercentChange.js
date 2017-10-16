export default (value) => {
  if (value.charAt(0) !== '-') {
    return `+${value}`
  }
  return value
}
