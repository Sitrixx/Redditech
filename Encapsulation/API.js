export const fetchData = async (url, route) => {
    try {
        const response = await fetch(url, {
            headers: {
                Authorization: `bearer ${route}`,
                "User-Agent": "ChangeMeClient/0.1 by enzotech"
            }
        });
        const json = await response.json();
        setUsername(json.name);
        setIconImage(json.icon_img);
    } catch (err) {
        console.log("error", err);
    }
}

            // axios({
            //     method: 'POST',
            //     url: 'https://www.reddit.com/api/v1/access_token',
            //     data: `grant_type=authorization_code&code=${route.params.paramKey}&redirect_uri=exp://127.0.0.1:19000`,
            //     headers: {
            //         "Authorization": `Basic ${base64.encode(client_id+':'+client_secret)}`,
            //         "content-type": "application/x-www-form-urlencoded"
            //     },
            // }).then((res) => {
            //     setToken(res.data['access_token'])
            // })
            // console.log(token)