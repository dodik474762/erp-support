const isAuthorized = async (session: any) => {
  const req = await fetch(process.env.API_BASE_URL + "/auth/get-akses-menu?id=" + session.data.user.id, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session.data.user.token}`,
    },
  });
  const res = await req.json();
  if (res.statusCode == 200) {
    return true;
  }

  return res.statusCode == 401 ? false : true;
};


export default isAuthorized;