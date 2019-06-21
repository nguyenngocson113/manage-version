
const utils = {
    formatParams: (params) => {
        let arrParams = [];
        for (const key in params) {
            arrParams.push(`${key}=${params[key]}`);
        }
        return arrParams.join('&');
    }
};

export default utils;