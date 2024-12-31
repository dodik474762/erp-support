import {
  actionTypes,
  gridReducer,
  initialState,
} from "@/reducers/grid.reducers";
import Message from "@/utility/message";
import { _, Grid } from "gridjs-react";
import { RowSelection } from "gridjs-selection";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useReducer, useState } from "react";

const GridList = (props: any) => {
  const {
    filterDate = "",
    filterKeyword = "",
    base_url = "",
    value = [],
    columns = [],
    handleCheckAll = (e: any) => {},
    children,
    refresh = false,
    limit = 25,
  } = props;
  const router = useRouter();
  const [state, dispatch] = useReducer(gridReducer, initialState);
  const { data, loading, currentPage, totalPages, totalRecords, totalData} = state;

  // Fetch data from server with pagination
  const fetchData = async (page: number) => {
    const authTokens: any = localStorage.getItem("authToken");
    try {
      dispatch({
        type: actionTypes.SET_LOADING,
      }); // Set loading state
      const response = await fetch(
        process.env.API_BASE_URL +
          base_url +
          `/getData?filterdate=${filterDate}&search=${filterKeyword}&order=id&page=${page}&limit=${limit}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authTokens}`,
          },
        }
      ); // API URL with page and limit
      const result = await response.json();

      // Assuming the API returns data and the total number of pages
      const totalPage = Math.ceil(result.total_page / limit);
      dispatch({ type: actionTypes.SET_DATA, payload: { data: result.data } });
      dispatch({ type: actionTypes.SET_TOTAL_PAGES, payload: totalPage });
      dispatch({type: actionTypes.SET_TOTAL_DATA, payload: result.total_page});
      dispatch({type: actionTypes.SET_TOTAL_RECORDS, payload: result.data.length });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Handle pagination change (page number click)
  const handlePageChange = (page: number) => {
    if (page < 0 || page > totalPages) return; // Prevent out-of-range page numbers
    dispatch({ type: actionTypes.SET_PAGE, payload: page });
  };

  // Generate page numbers for the pagination control
  const renderPageNumbers = () => {
    const pageNumbers = [];
    const range = 2; // Number of pages to show on either side of the current page

    let startPage = Math.max(1, currentPage + 1 - range);
    let endPage = Math.min(totalPages, currentPage + 1 + range);

    // Handle ellipsis at the start
    if (startPage > 1) {
      pageNumbers.push(
        <button
          key="first"
          onClick={() => handlePageChange(0)}
          style={{
            margin: "0 5px",
            padding: "5px 10px",
            cursor: "pointer",
          }}
          className="btn btn-primary btn-sm"
        >
          First
        </button>
      );
      if (startPage > 2) {
        pageNumbers.push(<span key="ellipsis-start">...</span>);
      }
    }

    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => handlePageChange(i - 1)}
          style={{
            margin: "0 5px",
            padding: "5px 10px",
            cursor: "pointer",
          }}
          className={
            currentPage + 1 === i
              ? "btn btn-primary btn-sm"
              : "btn btn-default btn-sm"
          }
        >
          {i}
        </button>
      );
    }

    // Handle ellipsis at the end
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pageNumbers.push(<span key="ellipsis-end">...</span>);
      }
      pageNumbers.push(
        <button
          key="last"
          onClick={() => handlePageChange(totalPages - 1)}
          style={{
            margin: "0 5px",
            padding: "5px 10px",
          }}
          className="btn btn-primary btn-sm"
        >
          Last
        </button>
      );
    }

    return pageNumbers;
  };

  // Initial data fetch on component mount
  useEffect(() => {
    fetchData(currentPage); // Fetch data when the current page changes
  }, [currentPage, filterDate, filterKeyword, refresh]); // Trigger effect when currentPage changes

  return (
    <>
      {loading == false ? (
        <>
          <Grid
            columns={columns}
            fixedHeader={true}
            data={data.map((item: any) => value.map((val: any) => item[val]))}
            style={{
              th: {
                color: "#878A99",
                "white-space": "nowrap",
                "background-color": "#F3F6F9",
              },
            }}
          />
          <div className="row">
            <div className="col-md-4">
              <div className="dataTables_info" id="DataTables_Table_0_info">
                Showing {totalRecords < totalData ? totalRecords : totalData} of {totalData} entries
              </div>
            </div>
            <div className="col-md-8 text-end">
              <div
                style={{
                  marginTop: "20px",
                  padding: "10px",
                  textAlign: "right",
                }}
              >
                {/* Pagination controls with page numbers */}
                <button
                  disabled={currentPage === 0}
                  onClick={() => handlePageChange(currentPage - 1)}
                  style={{ padding: "5px 10px", marginRight: "10px" }}
                  className="btn btn-primary btn-sm"
                >
                  Previous
                </button>
                {renderPageNumbers()}{" "}
                {/* Render the numbered pagination buttons */}
                <button
                  disabled={currentPage + 1 === totalPages}
                  onClick={() => handlePageChange(currentPage + 1)}
                  style={{ padding: "5px 10px", marginLeft: "10px" }}
                  className="btn btn-primary btn-sm"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div
          className="text-center"
          style={{ marginTop: "200px", marginBottom: "200px" }}
        >
          <button className="btn btn-outline-primary btn-load">
            <span className="d-flex align-items-center">
              <span className="flex-grow-1 me-2">
                Sedang Proses Mengambil Data...
              </span>
              <span className="spinner-border flex-shrink-0" role="status">
                <span className="visually-hidden">
                  Sedang Proses Mengambil Data
                </span>
              </span>
            </span>
          </button>
        </div>
      )}
    </>
  );
};

export default GridList;
