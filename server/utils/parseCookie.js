const parseCookies = (cookieHeader) => {

    if (!cookieHeader) return {};

    return cookieHeader.split("; ").reduce((acc, cookie) => {
        const [key, value] = cookie.split("=");
        if (key && value) {
            acc[key.trim()] = decodeURIComponent(value.trim());
        }
        return acc;
    }, {});
};

exports.module = parseCookies;