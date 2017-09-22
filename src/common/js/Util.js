export function parseJson (param) {
  let result = param
  if (typeof result === 'string') {
    result = JSON.parse(param)
  }
  return result
}
