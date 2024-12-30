

const routerMenu = [
    {
        name: "Menu",
        icon: "",
        children: [
            {
                name: "Dashboard",
                path: "/dashboard",
                icon: "bx bx-home-circle",
                active: false,
            },
            {
                name: "Master",
                path: "/",
                icon: "bx bx-user",
                active: false,
                children: [
                    {
                        name: "Job Title",
                        path: "/master/job_title",
                        icon: "",
                        active: false,
                    },
                    {
                        name: "Employee",
                        path: "/master/employee",
                        icon: "",
                        active: false,
                    },
                    {
                        name: "Roles",
                        path: "/master/roles",
                        icon: "",
                        active: false,
                    },
                    {
                        name: "Users",
                        path: "/master/users",
                        icon: "",
                        active: false,
                    }
                ]
            },
            {
                name: "Settings",
                path: "/",
                icon: "bx bx-cog",
                active: false,
                children: [
                    {
                        name: "Menu",
                        path: "/settings/menu",
                        icon: "",
                        active: false,
                    },
                    {
                        name: "Permissions",
                        path: "/settings/permissions",
                        icon: "",
                        active: false,
                    },
                ]
            },
            {
                name: "Geolocalization",
                path: "/",
                icon: "bx bx-map",
                active: false,
                children: [
                    {
                        name: "Google Map",
                        path: "/geolocation",
                        icon: "",
                        active: false,
                    },
                    {
                        name: "Leaflet Map",
                        path: "/leaflocation",
                        icon: "",
                        active: false,
                    },
                ]
            },
            {
                name: "Supply Chain",
                path: "/",
                icon: "bx bx-shopping-bag",
            },
            {
                name: "Fixed Assets",
                path: "/",
                icon: "bx bx-box",
            },
            {
                name: "Company",
                path: "/",
                icon: "bx bx-buildings",
            },
            {
                name: "Report",
                path: "/",
                icon: "bx bx-book-open",
            },
            {
                name: "Pembelian",
                path: "/",
                icon: "bx bx-cart",
            },
            {
                name: "Pajak",
                path: "/",
                icon: "bx bx-file",
            },
            {
                name: "Sales",
                path: "/",
                icon: "bx bx-cart",
            },
            {
                name: "Finance",
                path: "/",
                icon: "bx bx-money",
            },
            {
                name: "Manajemen Route",
                path: "/",
                icon: "                                                                                                          ",
            },
        ],
    },
];
export default routerMenu;