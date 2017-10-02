/**
  * Returns a promise that resolves after the given time
  * Example: async () => await delay(3000)
  * @param {time: number} 
*/

export default (time) => {
  return new Promise(resolve => setTimeout(resolve, time))
}
