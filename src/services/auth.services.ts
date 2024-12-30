const AuthServices = {
  signIn: (
    email: string,
    password: string,
    token: string,
    nik: string,
    username: string
  ) => {
    return new Promise((resolve, reject) => {
      const urlAuth = process.env.API_BASE_URL + "/auth/login";
      fetch(urlAuth, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, token, nik, username }),
      }).then((res) => {
        console.log('response ',res);
        if (res.status === 200) {
          resolve({
            is_valid: true,
            data: res.json(),
          });
        } else {
          resolve({
            is_valid: false,
            data: res.json(),
          })
        }
      }).catch((err) => {
        console.log('responseerror ',err);
        resolve({
          is_valid: false,
          data: err
        })
      });
    });
  },
};

export default AuthServices;
