export const formatTime = (seconds: number) => {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const remainingSeconds = seconds % 60

  let formattedTime = ""

  if (hours > 0) {
    formattedTime += `${hours}h `
  }

  if (minutes > 0 || hours > 0) {
    formattedTime += `${minutes < 10 ? "0" : ""}${minutes}m `
  }

  formattedTime += `${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}s`

  return formattedTime.trim()
}

export const formatTimeCompact = (seconds: number) => {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const remainingSeconds = seconds % 60

  let formattedTime = ""

  if (hours > 0) {
    formattedTime += `${hours}h`
    if (minutes > 0) {
      formattedTime += ` ${minutes}m`
    }
    return formattedTime
  }

  if (minutes > 0) {
    formattedTime += `${minutes}m`
    if (remainingSeconds > 0) {
      formattedTime += ` ${remainingSeconds}s`
    }
    return formattedTime
  }

  return `${remainingSeconds}s`
}
