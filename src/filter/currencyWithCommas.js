export default (value) => {
  value = value.toString().slice(0, value.indexOf('.'))
  return value.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}
