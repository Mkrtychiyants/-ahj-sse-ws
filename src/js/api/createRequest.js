const createRequest = async (options) => {

    const response = await fetch(options.url, {
        method: options.method,
        headers: options.headers,
        body: options.body,
    });

    return response;
}


export default createRequest;
