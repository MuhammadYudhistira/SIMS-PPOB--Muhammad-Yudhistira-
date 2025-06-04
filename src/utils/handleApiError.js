export function handleApiError(error, fallbackMessage) {
  if (typeof error === 'object' && error !== null && 'response' in error) {
    const err = error;
    const data = err.response?.data;

    if (data && typeof data === 'object' && !Array.isArray(data)) {
      const errorData = data;

      if (Array.isArray(errorData.errors) && errorData.errors.length > 0) {
        throw new Error(errorData.errors[0]?.msg || fallbackMessage);
      }

      if (typeof errorData.message === 'string') {
        throw new Error(errorData.message);
      }
    }

    if (typeof data === 'string') {
      throw new Error(data);
    }
  }

  console.error('Unhandled error structure:', error);
  throw new Error(fallbackMessage);
}
