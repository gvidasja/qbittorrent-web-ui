export const preventDefault = handler => e => {
  !e.isDefaultPrevented() && e.preventDefault()
  return handler(e)
}

export const delay = time => new Promise(r => setTimeout(r, time))

const repeatActionUntilConditionEvery = (action, condition) => async interval => {
  let result

  while (!(await Promise.resolve(condition((result = await Promise.resolve(action())))))) {
    await delay(interval)
  }

  return result
}

export const repeat = action => ({
  until: condition => ({
    every: interval => {
      const repeatActionUntilCondition = repeatActionUntilConditionEvery(action, condition)
      return {
        miliseconds: () => repeatActionUntilCondition(interval),
        seconds: () => repeatActionUntilCondition(interval * 1000),
        minutes: () => repeatActionUntilCondition(interval * 1000 * 60),
      }
    },
  }),
})
