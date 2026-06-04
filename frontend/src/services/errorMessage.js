export function apiErrorMessage(error, fallback) {
  const errors = error.response?.data?.errors

  if (errors && typeof errors === 'object') {
    return Object.values(errors).flat().join(' ')
  }

  return error.response?.data?.message || fallback
}
