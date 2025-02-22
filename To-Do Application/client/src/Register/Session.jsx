export const createSession = (userId) => {
    const date = new Date();
    date.setDate(date.getDate() + 7);
    const expires = date.toUTCString();
    document.cookie = `userId=${userId}; expires=${expires}`;
};

export const getSession = () => {
    const cookies = document.cookie.split("; ");
    for(const cookie of cookies) {
        const [key, value] = cookie.split("=");
        if(key === "userId") {
            return value;
        }
    }
};

export const destroySession = () => {
    const date = new Date();
    date.setDate(date.getDate() - 1);
    const expires = date.toUTCString();

    document.cookie = `userId=; expires=${expires};`;
};