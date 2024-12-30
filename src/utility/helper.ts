import Message from "./message";

const Helper = {
  handleCheck: (
    e: React.ChangeEvent<HTMLInputElement>,
    data: number,
    dataChecked: number[]
  ) => {
    const checkboxeall: any = document.querySelectorAll(
      'input[name="checkAll"]'
    );
    if (e.target.checked) {
      dataChecked.push(data);
      const checkboxes = document.querySelectorAll('input[name="checkItem"]');
      if (dataChecked.length === checkboxes.length) {
        checkboxeall[0].checked = true;
      }
    } else {
      dataChecked.splice(dataChecked.indexOf(data), 1);
      checkboxeall[0].checked = false;
    }
  },

  handleCheckAll: (
    e: React.ChangeEvent<HTMLInputElement>,
    dataChecked: number[]
  ) => {
    const checkboxes = document.querySelectorAll('input[name="checkItem"]');
    checkboxes.forEach((checkbox: any) => {
      checkbox.checked = e.target.checked;
      if (e.target.checked) {
        dataChecked.push(checkbox.value);
      } else {
        dataChecked.splice(dataChecked.indexOf(checkbox.value), 1);
      }
    });
  },

  //Usage example:
  // var file = dataURLtoFile('data:text/plain;base64,aGVsbG8=','hello.txt');
  // console.log(file);
  dataURLtoFile: (dataurl: any, filename: any) => {
    try {
      var arr = dataurl.split(","),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[arr.length - 1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);

      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new File([u8arr], filename, { type: mime });
    } catch (error) {
      return null;
    }
  },
};

export default Helper;


export const handleDelete = (e: React.ChangeEvent<HTMLInputElement>, base_url = "", dataChecked : number[] = [], result = (res:any) => {}) => {
  if (dataChecked.length > 0) {
    const authToken = localStorage.getItem("authToken");
    Message.question("Apa anda yakin menghapus data ini?", () => {
      const req = fetch(process.env.API_BASE_URL + base_url + "/deleteAll", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({
          id: dataChecked,
        }),
      }).then((res) => {
        result(res);
      });
    });
  } else {
    Message.error("Please select data to delete");
  }
};
