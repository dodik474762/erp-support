
const apiBaseUrl : any = process.env.API_BASE_URL;

const ApiServices = {
  getDataById: (id: string, base_url: String) => {
    const token = localStorage.getItem("authToken");
    return new Promise((resolve, reject) => {
      const url = apiBaseUrl + base_url + "/getDetail?id=" + id;
      fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.statusCode === 200 || res.statusCode === 201) {
            resolve({
              is_valid: true,
              data: res.data,
              origin: res,
            });
          } else {
            resolve({
              is_valid: false,
              data: "error",
            });
          }
        })
        .catch((err) => {
          resolve({
            is_valid: false,
            data: err,
          });
        });
    });
  },

  getDataByIdCustom: (id: string, base_url: String, method: string) => {
    const token = localStorage.getItem("authToken");
    return new Promise((resolve, reject) => {
      const methods = method !== "" ? method : "/getDetail?id=" + id;
      const url = apiBaseUrl + base_url + methods;
      fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.statusCode === 200 || res.statusCode === 201) {
            resolve({
              is_valid: true,
              data: res.data,
              origin: res,
            });
          } else {
            resolve({
              is_valid: false,
              data: "error",
            });
          }
        })
        .catch((err) => {
          resolve({
            is_valid: false,
            data: err,
          });
        });
    });
  },

  submit: (base_url: string, data: any, method: string) => {
    const token = localStorage.getItem("authToken");
    const methods = method !== "" ? method : "/submit";
    return new Promise((resolve, reject) => {
      const url = process.env.API_BASE_URL + base_url + methods;
      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.statusCode === 200 || res.statusCode === 201) {
            resolve({
              is_valid: true,
              data: res.data,
              origin: res,
            });
          } else {
            resolve({
              is_valid: false,
              message: "error",
            });
          }
        })
        .catch((err) => {
          resolve({
            is_valid: false,
            message: err,
          });
        });
    });
  },

  submitMultiForm: (base_url: string, data: any, method: string) => {
    const token = localStorage.getItem("authToken");
    const methods = method !== "" ? method : "/submit";
    return new Promise((resolve, reject) => {
      const url = process.env.API_BASE_URL + base_url + methods;
      fetch(url, {
        method: "POST",
        body: data,
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.statusCode === 200 || res.statusCode === 201) {
            resolve({
              is_valid: true,
              data: res.data,
              origin: res,
            });
          } else {
            resolve({
              is_valid: false,
              message: res.message ?? "error",
            });
          }
        })
        .catch((err) => {
          resolve({
            is_valid: false,
            message: err,
          });
        });
    });
  },

  get: (base_url: string, method: string) => {
    const methods = method !== "" ? method : "get";
    const token = localStorage.getItem("authToken");
    return new Promise((resolve, reject) => {
      const url = process.env.API_BASE_URL + base_url + methods;
      fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.statusCode === 200 || res.statusCode === 201) {
            resolve({
              is_valid: true,
              data: res.data,
              origin: res,
            });
          } else {
            resolve({
              is_valid: false,
              message: "error",
            });
          }
        })
        .catch((err) => {
          resolve({
            is_valid: false,
            message: err,
          });
        });
    });
  },
};

export default ApiServices;
