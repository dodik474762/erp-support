import ButtonLoading from "@/components/layouts/ButtonLoading";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import Flatpickr from "react-flatpickr";
import ListSubTestTableViews from "./list-table-subtest";
import Message from "@/utility/message";
import Helper from "@/utility/helper";

const ListSubTestViews = ({ base_url = "/" }) => {
  const router = useRouter();
  const id: any = router.query.id;

  const [loading, setLoading] = useState(false);
  const [filterKeyword, setFilterKeyword] = useState("");

  let dataChecked: number[] = [];

  const handleCheck = (
    e: React.ChangeEvent<HTMLInputElement>,
    data: number
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
  };

  const handleCheckAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checkboxes = document.querySelectorAll('input[name="checkItem"]');
    checkboxes.forEach((checkbox: any) => {
      checkbox.checked = e.target.checked;
      if (e.target.checked) {
        dataChecked.push(checkbox.value);
      } else {
        dataChecked.splice(dataChecked.indexOf(checkbox.value), 1);
      }
    });
  };

  const handleDelete = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (dataChecked.length > 0) {
      Message.question("Apa anda yakin menghapus data ini?", () => {
        const authToken = localStorage.getItem("authToken");
        const req = fetch(
          process.env.API_BASE_URL + base_url+"/delete-all-subtest",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${authToken}`,
            },
            body: JSON.stringify({
              id: dataChecked,
            }),
          }
        ).then((res) => {
          router.push(base_url);
        });
      });
    } else {
      Message.error("Please select data to delete");
    }
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setLoading(true);
    console.log(dataChecked);
    setLoading(false);
  }

  return (
    <>
      <div className="card">
        <div className="card-header border-0">
          <div className="d-flex align-items-center">
            <h5 className="card-title mb-0 flex-grow-1">Sub Test List</h5>
            <div className="flex-shrink-0">
              <Link
                href={base_url + "/add-subtest?test="+id}
                className="btn btn-success add-btn"
                id="create-btn"
              >
                <i className="ri-add-line align-bottom me-1"></i> Create
              </Link>

              <button
                className="btn btn-soft-danger"
                style={{ marginLeft: "6px" }}
                onClick={(e: any) => handleDelete(e)}
              >
                <i className="ri-delete-bin-2-line"></i>
              </button>
            </div>
          </div>
        </div>
        <div className="card-body border border-dashed border-end-0 border-start-0">
          <div className="row g-3">
            <div className="col-xxl-5 col-sm-12">
              <div className="search-box">
                <input
                  type="text"
                  className="form-control search bg-light border-light"
                  placeholder="Search for tasks or something..."
                  onInput={(e: any) => {
                      setFilterKeyword(e.target.value);
                  }}
                />
                <i className="ri-search-line search-icon"></i>
              </div>
            </div>
          </div>
        </div>

        <div className="card-body">
          <ul
            className="nav nav-tabs nav-tabs-custom nav-success mb-3"
            role="tablist"
          >
            <li className="nav-item">
              <a
                className="nav-link active All py-3"
                data-bs-toggle="tab"
                id="All"
                href="#home1"
                role="tab"
                aria-selected="true"
              >
                <i className=" ri-inbox-line me-1 align-bottom"></i> All Data
              </a>
            </li>
          </ul>

          <div className="table-responsive table-card mb-4">
            <ListSubTestTableViews
              filterKeyword={filterKeyword}
                handleCheck={handleCheck}
                handleCheckAll={handleCheckAll}
              test={id}
              base_url={base_url}
              resultAction={(result) => {
                if (result.statusCode == 200 || result.statusCode == 201) {
                  if (result.is_valid == true) {
                    Message.success("Data Berhasil Diproses");
                  } else {
                    Message.error(result.message);
                  }
                } else {
                  Message.error(result.message);
                }
              }}
            />
          </div>
        </div>
      </div>

      <div className="text-end mb-3">
        &nbsp;
        <Link
          href={base_url}
          className="btn btn-soft-info waves-effect waves-light"
        >
          Kembali
        </Link>
      </div>
    </>
  );
};

export default ListSubTestViews;
