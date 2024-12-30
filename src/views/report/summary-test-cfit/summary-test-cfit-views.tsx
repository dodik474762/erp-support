import PageTitle from "@/components/layouts/PageTitle";
import Message from "@/utility/message";
import { _, Grid } from "gridjs-react";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Flatpickr from "react-flatpickr";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { checkPermission } from "@/utility/permission";
import Exported from "@/utility/exported";
import ButtonLoading from "@/components/layouts/ButtonLoading";
import SummaryTestCfitTableViews from "./summary-test-table-cfit";
import moment from "moment-timezone";

const SummaryTestCfitViews = ({ base_url = "", akses = "" }) => {
  const router = useRouter();

  const [filterKeyword, setFilterKeyword] = useState("");
  const [filterDate, setFilterDate] = useState("");
  const [loading, setLoading] = useState(false);

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

  const handleFilter = (e: any) => {
    e.preventDefault();
    setFilterKeyword(
      filterData.keyword == "" ? filterKeyword : filterData.keyword
    );
    setFilterDate(filterData.date == "" ? filterDate : filterData.date);
  };

  const fetchData = async (filterdate: string) => {
    setLoading(true);
    const authToken = localStorage.getItem("authToken");
    const req = await fetch(
      process.env.API_BASE_URL + base_url + "/getAll?filterdate=" + filterdate,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      }
    );
    const res = await req.json();
    if (res) {
      if (res.is_valid) {
        setLoading(false);
        return res.data;
      }
    }

    setLoading(false);
    return [];
  };

  const handleExport = async (e: any, type: string) => {
    e.preventDefault();
    const filter = filterData.date;
    switch (type) {
      case "excel":
      case "csv":
        const rows = await fetchData(filter);
        if (type == "excel") {
          Exported.exportExcel("summary-test-cfit", rows);
        }
        if (type == "csv") {
          Exported.exportCsv("summary-test-cfit", ";", rows);
        }
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    if (!router.isReady) return;
  }, [router.isReady]);

  return (
    <>
      <PageTitle titlePage={"Report"} subTitle="Summary Test CFIT" />

      <div className="row">
        <div className="col-lg-12">
          <div className="card" id="tasksList">
            <div className="card-header border-0">
              <div className="d-flex align-items-center">
                <h5 className="card-title mb-0 flex-grow-1">
                  Summary Test CFIT List
                </h5>
                <div className="flex-shrink-0"></div>
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
                          setTimeout(() => {
                            setFilterKeyword(e.target.value);
                          }, 1500);
                        }}
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
                  </div>

                  <div className="col-xxl-1 col-sm-4">
                    <button
                      type="button"
                      className="btn btn-primary w-100"
                      onClick={(e: any) => handleFilter(e)}
                    >
                      {" "}
                      <i className="ri-equalizer-fill me-1 align-bottom"></i>
                      Filters
                    </button>
                  </div>
                  <div className="col-xxl-1 col-sm-4">
                    {loading == true ? (
                      <ButtonLoading message="Loading Proses Export Data..." />
                    ) : (
                      <>
                        <div className="btn-group">
                          <button
                            className="btn btn-light dropdown-toggle"
                            type="button"
                            id="defaultDropdown"
                            data-bs-toggle="dropdown"
                            data-bs-auto-close="true"
                            aria-expanded="false"
                          >
                            Export Data
                          </button>
                          <ul
                            className="dropdown-menu"
                            aria-labelledby="defaultDropdown"
                          >
                            <li>
                              <a
                                className="dropdown-item"
                                href="javascript:void(0);"
                                onClick={(e: any) => handleExport(e, "excel")}
                              >
                                <span>
                                  <i className=" ri-file-excel-2-line me-2 align-bottom"></i>
                                  Excel
                                </span>
                              </a>
                            </li>
                            <li>
                              <a
                                className="dropdown-item"
                                href="javascript:void(0);"
                                onClick={(e: any) => handleExport(e, "csv")}
                              >
                                <span>
                                  <i className=" ri-file-excel-2-line me-2 align-bottom"></i>
                                  Csv
                                </span>
                              </a>
                            </li>
                          </ul>
                        </div>
                      </>
                    )}
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
                    Data
                  </a>
                </li>
              </ul>

              <div className="table-responsive table-card mb-4">
                {router.isReady ? (
                  <SummaryTestCfitTableViews
                    filterDate={filterDate}
                    filterKeyword={filterKeyword}
                    handleCheck={handleCheck}
                    handleCheckAll={handleCheckAll}
                    akses={akses}
                    base_url={base_url}
                    resultAction={(result) => {
                      if (
                        result.statusCode == 200 ||
                        result.statusCode == 201
                      ) {
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
                ) : (
                  <div></div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SummaryTestCfitViews;
