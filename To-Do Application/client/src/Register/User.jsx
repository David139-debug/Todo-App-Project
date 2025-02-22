const api_url = "https://6755c9c911ce847c992b2bd5.mockapi.io";

export const create = async (data) => {
        const response = await fetch(api_url + "/user", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        });

        const responseData = await response.json();

        let date = new Date();
        date.setDate(date.getDate());
        
        responseData.createdAt = date.toUTCString();

        const updatedResponse = await fetch(api_url + "/user/" + responseData.id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(responseData)
        });

        const updatedData = await updatedResponse.json();
        
        return await updatedData;
};

export const get = async () => {
    const response = await fetch(api_url + "/user");
    const data = await response.json();
    return data;
};