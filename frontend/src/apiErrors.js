const BACKEND_UNAVAILABLE =
  'Cannot reach the backend API. In a separate terminal: cd backend, run npm run dev, wait for "Server running on port 5000" and "MongoDB connected", then refresh this page.';

function isDevProxyFailure(err) {
  if (!err.response) return false;
  const status = err.response.status;
  if (![500, 502, 503, 504].includes(status)) return false;
  const data = err.response.data;
  if (data && typeof data === 'object' && data.message) return false;

  const bodyText = typeof data === 'string' ? data : '';
  const axiosMsg = err.message || '';
  return (
    bodyText.includes('Proxy error') ||
    bodyText.includes('ECONNREFUSED') ||
    axiosMsg.includes('status code 500') ||
    axiosMsg.includes('status code 502') ||
    axiosMsg.includes('status code 504')
  );
}

export function getErrorMessage(err, fallbackMessage) {
  if (err.response?.data?.message) return err.response.data.message;

  if (!err.response) {
    const msg = err.message || '';
    if (msg === 'Network Error' || err.code === 'ERR_NETWORK') {
      return BACKEND_UNAVAILABLE;
    }
  }

  if (isDevProxyFailure(err)) {
    return BACKEND_UNAVAILABLE;
  }

  if (err.message) return err.message;
  return fallbackMessage;
}
