import Swal from "sweetalert2";


export default class Message {
    static success(message: string) {
        Swal.fire({
            title: "Informasi",
            text: message,
            icon: "success"
        });
    }
    static error(message: string) {
        Swal.fire({
            icon: "error",
            title: "Informasi",
            text: message,
            confirmButtonColor: "#364574",
        });
    }

    static warning(message: string) {
        Swal.fire({
            icon: "warning",
            title: "Informasi",
            text: message,
            confirmButtonColor: "#364574",
        });
    }

    static info(message: string) {
        Swal.fire({
            icon: "info",
            title: "Informasi",
            text: message,
            confirmButtonColor: "#364574",
        });
    }

    static question(message: string, callback?: any) {
        Swal.fire({
            icon: "question",
            title: "Are you sure?",
            text: message,
            confirmButtonColor: "#364574",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
            showCancelButton: !0,
        }).then((result) => {
            if (result.isConfirmed) {
                callback("confirm");
            }else{
                this.error("Data Tidak Batal");
            }
        });
    }
}

