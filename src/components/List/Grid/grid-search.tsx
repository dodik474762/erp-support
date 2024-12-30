import moment from "moment";
import { useRouter } from "next/router";
import { useState } from "react";
import Flatpickr from "react-flatpickr";
import GridList from ".";
import { RowSelection } from "gridjs-selection";
import { _ } from "gridjs-react";
import { handleRouting } from "@/utility/routing-helper";
import Link from "next/link";
import { handleDeleteData } from "@/services/services";
import Message from "@/utility/message";

const GridSearch = (props: any) => {
  const { base_url = "", dataChecked = [], akses = "", value=[], columns = [], limit = 25 } = props;
  const router = useRouter();
  const [filterKeyword, setFilterKeyword] = useState("");
  const [filterDate, setFilterDate] = useState("");
  const [refresh, setRefresh] = useState(false);

  const filterData = {
    keyword: "",
    date: "",
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

  const handleFilter = (e: any) => {
    e.preventDefault();
    setFilterKeyword(
      filterData.keyword == "" ? filterKeyword : filterData.keyword
    );
    setFilterDate(filterData.date == "" ? filterDate : filterData.date);
  };

  const handleInputChange = (event: any, name: string) => {
    if (name === "filterKeyword") {
      filterData.keyword = event;
      filterData.date = filterDate;
    }
    if (name === "filterDate") {
      if (event.length == 2) {
        filterData.date =
          moment(event[0]).format("YYYY-MM-DD") +
          " - " +
          moment(event[1]).format("YYYY-MM-DD");
      } else {
        filterData.date = moment(event[0]).format("YYYY-MM-DD");
      }
      filterData.keyword = filterKeyword;
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

  return (
    <>
      <div className="card-body border border-dashed border-end-0 border-start-0">
        <form>
          <div className="row g-3">
            <div className="col-xxl-5 col-sm-12">
              <div className="search-box">
                <input
                  type="text"
                  className="form-control search bg-light border-light"
                  placeholder="Search for tasks or something..."
                  onChange={(e: any) => {
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
                onChange={(e: any) => handleInputChange(e, "filterDate")}
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
              <i className=" ri-inbox-line me-1 align-bottom"></i> All Data
            </a>
          </li>
        </ul>

        <div className="table-responsive table-card mb-4">
          {router.isReady ? (
            <GridList
              filterDate={filterDate}
              filterKeyword={filterKeyword}
              base_url={base_url}
              refresh={refresh}
              columns={columns}
              value={value}
              akses={akses}
              handleCheck={handleCheck}
              handleCheckAll={handleCheckAll}
              limit={limit}
            ></GridList>
          ) : (
            <>
              <div></div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default GridSearch;
