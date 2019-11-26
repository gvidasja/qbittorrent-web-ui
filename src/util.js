export const preventDefault = handler => e => {
  !e.isDefaultPrevented() && e.preventDefault()
  return handler(e)
}
