import PageTitle from "@/components/layouts/PageTitle";
import Message from "@/utility/message";
import { _, Grid } from "gridjs-react";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Flatpickr from "react-flatpickr";
import { useRouter } from "next/router";
import GridSearch from "@/components/List/Grid/grid-search";
import { RowSelection } from "gridjs-selection";
import { handleRouting } from "@/utility/routing-helper";
import { handleDeleteData } from "@/services/services";

const ApprovalItemViews = ({ base_url = "", akses = "" }) => {
  const router = useRouter();
  const [filterKeyword, setFilterKeyword] = useState("");
  const [filterDate, setFilterDate] = useState("");
  const [refresh, setRefresh] = useState(false);
  const filterData = {
    keyword: "",
    date: "",
  };
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
    if (dataChecked.length > 0) {
      Message.question("Apa anda yakin menghapus data ini?", () => {
        const authToken = localStorage.getItem("authToken");
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
          router.push(base_url);
        });
      });
    } else {
      Message.error("Please select data to delete");
    }
  };

  const handleFilter = (e: any) => {
    e.preventDefault();
    setFilterKeyword(
      filterData.keyword == "" ? filterKeyword : filterData.keyword
    );
    setFilterDate(filterData.date == "" ? filterDate : filterData.date);
  };

  useEffect(() => {
    if (!router.isReady) return;
  }, [router.isReady]);

  return (
    <>
      <PageTitle titlePage={"Approval"} subTitle="Request Item" />

      <div className="row">
        <div className="col-lg-12">
          <div className="card" id="tasksList">
            <div className="card-header border-0">
              <div className="d-flex align-items-center">
                <h5 className="card-title mb-0 flex-grow-1">Request Item List</h5>
                <div className="flex-shrink-0">
                </div>
              </div>
            </div>
            
            <GridSearch
              base_url={base_url}
              akses={akses}
              refresh={refresh}
              columns={[
                {
                  id: "id",
                  plugins: {
                    component: RowSelection,
                  },
                  name: _(
                    <>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          name="checkAll"
                          value="option1"
                          onInput={(e: any) => handleCheckAll(e)}
                        />
                      </div>
                    </>
                  ),
                  width: "50px",
                  formatter: (cell: any, row: any, column: any) => {
                    return _(
                      <>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            name="checkItem"
                            value={String(row.cells[0].data)}
                            onInput={(e: any) =>
                              handleCheck(e, Number(row.cells[0].data))
                            }
                          />
                        </div>
                      </>
                    );
                  },
                },
                {
                  id: "item_name",
                  name: "NAME",
                },
                {
                  id: "code",
                  name: "CODE",
                },
                {
                  id: "status",
                  name: "STATUS",
                },
                {
                  name: "Actions",
                  formatter(cell: any, row: any, column: any) {
                    return _(
                      <>
                        <ul className="list-inline hstack gap-2 mb-0">
                          <li
                            className="list-inline-item"
                            data-bs-toggle="tooltip"
                            data-bs-trigger="hover"
                            data-bs-placement="top"
                            title=""
                            data-bs-original-title="View"
                          >
                            <Link
                              href={
                                base_url + "/details?id=" + row.cells[0].data
                              }
                              onClick={(e) =>
                                handleRouting(
                                  e,
                                  base_url + "/details?id=" + row.cells[0].data,
                                  router
                                )
                              }
                              className="text-primary d-inline-block"
                            >
                              <i className="ri-eye-fill fs-16"></i>
                            </Link>
                          </li>
                        </ul>
                      </>
                    );
                  },
                },
              ]}
              value={["id", "item_name", "code", "status"]}
              limit={25}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ApprovalItemViews;