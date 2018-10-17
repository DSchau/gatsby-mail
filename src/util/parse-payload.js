function parsePayload(payload) {
  if (typeof window === `undefined`) {
    return ``;
  }
  return atob(
    payload.data
      .replace(/-/g, '+')
      .replace(/_/g, '/')
  );
}

export default parsePayload