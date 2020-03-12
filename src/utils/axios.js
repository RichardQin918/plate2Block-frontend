
export default async function axios_request(method, url, data,){
    // console.log('method', method);
    // console.log('url', url);
    // console.log(data);
    // console.log('token', token);
  
    return new Promise((resolve, reject) => {
        axios.request({
            url,
            method,
            data,
            // headers: headers(token),
        })
            .then(res => {
                resolve(res.data)
            })
            .catch(error => {
                console.log(error);
  
                if (error.response) {
                    if (error.response.status && error.response.status === 401) {
                        AsyncStorage.removeItem('token');
                        navigate('Login', {});
                    }
                    if (error.response.data && error.response.data.message) {
                        reject(error.response.data.message)
                    }
                }
  
                /* disabled for UX purpose */
                // Toast.show(I18nText('common.request_error'), {
                //   duration: Toast.durations.LONG,
                //   position: Toast.positions.BOTTOM,
                //   shadow: true,
                //   animation: true,
                //   hideOnPress: true,
                // });
                reject('common.request_error')
            })
    })
  }