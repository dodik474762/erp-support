type Permission = {
  menu_name: string;
  path: string;
  icon: string;
  action: string[];
};

export const checkPermission = async (
  permission: string,
  session: any
): Promise<Permission> => {
  let result: Permission = {
    menu_name: "",
    path: "",
    icon: "",
    action: [],
  };
  const authToken = localStorage.getItem("authToken");

  if (session.status == "authenticated") {
    const user_id = session.data.user.id;
    const req = await fetch(
      process.env.API_BASE_URL +
        "/auth/get-akses-menu?id=" +
        user_id +
        "&module=" +
        permission,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      }
    );
    const res = await req.json();
    if (res.statusCode == 200) {
      const menu = res.data;
      menu.forEach((item: any) => {
        if (item.path == permission) {
          const action = item.action.split(",");
          result = {
            menu_name: item.menu_name,
            path: item.path,
            icon: item.icon,
            action: action,
          };
        }
      });
    }
  }
  return result;
};

export const getPermissionsMenu = async (session: any): Promise<any> => {
  const authToken = localStorage.getItem("authToken");
  let treeMenu: any = {
    name: "Menu",
    icon: "",
    children: [],
  };

  const resultResponse = {
    treeMenu: [treeMenu],
    isAuthorized: true,
  };

  const user_id = session.data.user.id;
  const res = await fetch(
    process.env.API_BASE_URL + "/auth/get-akses-menu?id=" + user_id,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    }
  );

  const result = await res.json();
  if (result.statusCode == 200) {
    const menus = result.data;
    menus.forEach((item: any) => {
      if (item.menu_parent == null || item.menu_parent == "") {
        item.name = item.menu_name;

        const children = menus.filter(
          (child: any) => child.menu_parent == item.menu_code
        );
        item.action = item.action == "" ? [] : item.action.split(",");
        if (children.length > 0) {
          item.children = children;
        }
        treeMenu.children.push(item);
      }
    });
  } else {
    if (result.statusCode == 401) {
      resultResponse.isAuthorized = false;
      return resultResponse;
    }
  }
  resultResponse.treeMenu = [treeMenu];
  return resultResponse;
};
