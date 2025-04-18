const listeners = new Set();

export const onAccessTokenRefresh = (callback) => {
    listeners.add(callback);
    return () => listeners.delete(callback);
};

export const emitAccessTokenRefresh = () => {
    listeners.forEach(cb => cb());
};