export const sortDate = (data) => {
    for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < data.length; j++) {
            const previous = new Date(data[i].publishDate).getTime();
            const current = new Date(data[j].publishDate).getTime();
            if (previous > current) {
                const post = data[j];
                data[j] = data[i];
                data[i] = post;
            }
        }
    }
    return data;
};
