
const apiBaseUrl : any = process.env.API_BASE_URL;
const RolesServices = {
    getDataById: (id: string, base_url:String) => {
        return new Promise((resolve, reject) => {
            const url = apiBaseUrl + base_url+"/getDetail?id=" + id
            fetch(url)
                .then((res) => res.json())
                .then((res) => {
                    if(res.statusCode === 200) {                        
                        resolve({
                            is_valid: true,
                            data: res.data,
                        })
                    }else{
                        resolve({
                            is_valid: false,
                            data: "error",
                        })
                    }
                })
                .catch((err) => {
                    resolve({
                        is_valid: false,
                        data: err
                    })
                });
                
        });
    }
}

export default RolesServices;