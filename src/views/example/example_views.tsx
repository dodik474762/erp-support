import PageTitle from "@/components/layouts/PageTitle";
import Message from "@/utility/message";
import { _, Grid } from "gridjs-react";
import React, { useEffect, useRef, useState } from "react";
import ExampleTableKaryawanViews from "./example_table_karyawan_views";
import Link from "next/link";
import Flatpickr from "react-flatpickr";

const ExampleViews = () => {
  type User = {
    nik: string;
    username: string;
  };
  const [filterKeyword, setFilterKeyword] = useState("");
  const [filterDate, setFilterDate] = useState("");
  const filterData = {
    keyword: "",
    date: "",
  };
  let dataChecked: number[] = [];

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    name: string
  ) => {
    if (name === "filterKeyword") {
      filterData.keyword = event.target.value;
      filterData.date = filterDate;
    }
    if (name === "filterDate") {
      filterData.date = event.target.value;
      filterData.keyword = filterKeyword;
    }
  };

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
    if (dataChecked.length > 0) {
      Message.question("Apa anda yakin menghapus data ini?", () => {});
    } else {
      Message.error("Please select data to delete");
    }
  };

  const handleFilter = (e: any) => {
    e.preventDefault();
    console.log(filterData);
    setFilterKeyword(filterData.keyword == '' ? filterKeyword : filterData.keyword );
    setFilterDate(filterData.date == '' ? filterDate : filterData.date );
  };

  useEffect(() => {}, []);

  return (
    <>
      <PageTitle titlePage={"Example"} subTitle="Monitoring" />

      <div className="row">
        <div className="col-lg-12">
          <div className="card" id="tasksList">
            <div className="card-header border-0">
              <div className="d-flex align-items-center">
                <h5 className="card-title mb-0 flex-grow-1">Karyawan List</h5>
                <div className="flex-shrink-0">
                  <Link
                    href={"/example/add"}
                    className="btn btn-success add-btn"
                    id="create-btn"
                  >
                    <i className="ri-add-line align-bottom me-1"></i> Create
                    Order
                  </Link>
                  <Link
                    style={{ marginLeft: "6px" }}
                    href={"/example/import"}
                    className="btn btn-info"
                  >
                    <i className="ri-file-download-line align-bottom me-1"></i>{" "}
                    Import
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
              <form>
                <div className="row g-3">
                  <div className="col-xxl-5 col-sm-12">
                    <div className="search-box">
                      <input
                        type="text"
                        className="form-control search bg-light border-light"
                        placeholder="Search for tasks or something..."
                        onInput={(e: any) => {
                          setFilterKeyword(e.target.value);
                          handleInputChange(e, "filterKeyword");
                        }
                          
                        }
                        onKeyUp={(e: any) => {
                          if (e.keyCode === 13) {
                            handleFilter(e);
                          }
                        }}
                      />
                      <i className="ri-search-line search-icon"></i>
                    </div>
                  </div>

                  <div className="col-xxl-3 col-sm-4">
                    <Flatpickr
                      className="form-control bg-light border-light"
                      id="demo-datepicker"
                      data-provider="flatpickr"
                      data-date-format="Y-m-d"
                      data-range-date="true"
                      placeholder="Select date range"
                      onInput={(e: any) => handleInputChange(e, "filterDate")}
                    />
                    {/* <input
                      type="text"
                      className="form-control bg-light border-light"
                      id="demo-datepicker"
                      data-provider="flatpickr"
                      data-date-format="Y-m-d"
                      data-range-date="true"
                      placeholder="Select date range"
                      onInput={(e: any) => handleInputChange(e, "filterDate")}
                    /> */}
                  </div>

                  {/* <div className="col-xxl-3 col-sm-4">
                    <div className="input-light">
                      <select
                        className="form-control"
                        name="choices-single-default"
                        id="idStatus"
                      >
                        <option value="">Status</option>
                        <option value="all" selected>
                          All
                        </option>
                        <option value="New">New</option>
                        <option value="Pending">Pending</option>
                        <option value="Inprogress">Inprogress</option>
                        <option value="Completed">Completed</option>
                      </select>
                    </div>
                  </div> */}

                  <div className="col-xxl-1 col-sm-4">
                    <button
                      type="button"
                      className="btn btn-primary w-100"
                      onClick={(e : any) => handleFilter(e)}
                    >
                      {" "}
                      <i className="ri-equalizer-fill me-1 align-bottom"></i>
                      Filters
                    </button>
                  </div>
                </div>
              </form>
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
                    <i className=" ri-inbox-line me-1 align-bottom"></i> All
                    Orders
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link py-3 Delivered"
                    data-bs-toggle="tab"
                    id="Delivered"
                    href="#delivered"
                    role="tab"
                    aria-selected="false"
                  >
                    <i className="ri-checkbox-circle-line me-1 align-bottom"></i>{" "}
                    Delivered
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link py-3 Pickups"
                    data-bs-toggle="tab"
                    id="Pickups"
                    href="#pickups"
                    role="tab"
                    aria-selected="false"
                  >
                    <i className="ri-truck-line me-1 align-bottom"></i> Pickups{" "}
                    <span className="badge bg-danger align-middle ms-1">2</span>
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link py-3 Returns"
                    data-bs-toggle="tab"
                    id="Returns"
                    href="#returns"
                    role="tab"
                    aria-selected="false"
                  >
                    <i className="ri-arrow-left-right-fill me-1 align-bottom"></i>{" "}
                    Returns
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link py-3 Cancelled"
                    data-bs-toggle="tab"
                    id="Cancelled"
                    href="#cancelled"
                    role="tab"
                    aria-selected="false"
                  >
                    <i className="ri-close-circle-line me-1 align-bottom"></i>{" "}
                    Cancelled
                  </a>
                </li>
              </ul>

              <div className="table-responsive table-card mb-4">
                <ExampleTableKaryawanViews
                  filterDate={filterDate}
                  filterKeyword={filterKeyword}
                  handleCheck={handleCheck}
                  handleCheckAll={handleCheckAll}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ExampleViews;
