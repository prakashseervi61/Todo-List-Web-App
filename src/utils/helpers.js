export const generateId = () => {
  return crypto.randomUUID();
};

export const formatDate = () => {
  const date = new Date();
  return {
    full: date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }),
    compact: date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
  };
};

export const formatTime = (timestamp) => {
  const date = new Date(timestamp);
  return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
};
