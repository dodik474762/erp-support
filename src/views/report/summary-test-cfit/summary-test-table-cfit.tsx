import Dates from "@/utility/dates";
import Message from "@/utility/message";
import { _, Grid } from "gridjs-react";
import { RowSelection } from "gridjs-selection";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import moment from "moment-timezone";

const SummaryTestCfitTableViews = ({
  filterDate = "",
  filterKeyword = "",
  akses = "",
  base_url = "",
  handleCheck = (e: any, data: number) => {},
  handleCheckAll = (e: any) => {},
  resultAction = (result: any) => {},
}) => {
  const router = useRouter();
  const [token, setToken] : any= useState("");
  const session: any = useSession();
  const [loading, setLoading] = useState(false);
  const handleRouting = (e: any, url: string) => {
    e.preventDefault();
    router.push(url);
  };

  useEffect(() => {
    setToken(localStorage.getItem("authToken"));
  }, []);

  return (
    <>
      {loading == false ? (
        <>
          <Grid
            columns={[
              {
                id: "id",
                plugins: {
                  component: RowSelection,
                },
                width: "50px",
                formatter: (cell, row, column) => {
                  return "";
                },
              },
              {
                id: "nik",
                name: "NIK",
                sort: true,
              },
              {
                id: "nama_lengkap",
                name: "NAMA LENGKAP",
                sort: true,
              },
              {
                id: "contact",
                name: "CONTACT",
                sort: true,
              },
              {
                id: "nama_job",
                name: "JOB",
                sort: true,
              },
              {
                id: "date_applied",
                name: "DATE APPLIED",
                sort: true,
              },
              {
                id: "date_applied",
                name: "STATUS",
              },
              {
                name: "Actions",
                formatter(cell, row, column) {
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
                            href={base_url + "/details?id=" + row.cells[0].data}
                            onClick={(e) =>
                              handleRouting(
                                e,
                                base_url + "/details?id=" + row.cells[0].data
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
            fixedHeader={true}
            // height="700px"
            pagination={{
              limit: 30,
              server: {
                url: (prev, page, limit) => {
                  const prevUrl = prev.split("?");
                  return prevUrl.length > 1
                    ? `${prev}&limit=${limit}&page=${page}`
                    : `${prev}?limit=${limit}&page=${page}`;
                },
              },
            }}
            server={{
              url:
                process.env.API_BASE_URL +
                base_url +
                `/getData?filterdate=${filterDate}&search=${filterKeyword}&order=id&status=NONDRAFT`,
              method: "GET",
              headers: {
                Authorization: `Bearer ${token}`,
              },
              then: (result) => {
                return result.data.map((resp: any, index: number) => [
                  resp.id,
                  resp.nik,
                  resp.nama_candidate,
                  resp.contact,
                  "JOBID : " + resp.job + " / " + resp.nama_job,
                  moment(resp.date_applied)
                    .tz("Asia/Jakarta")
                    .format("YYYY-MM-DD HH:mm"),
                  resp.candidate_summary ?? '-',
                  null,
                ]);
              },
              total: (result) => result.total_page,
            }}
            style={{
              th: {
                color: "#878A99",
                "white-space": "nowrap",
                "background-color": "#F3F6F9",
              },
            }}
          />
        </>
      ) : (
        <div
          className="text-center"
          style={{ marginTop: "200px", marginBottom: "200px" }}
        >
          <button className="btn btn-outline-primary btn-load">
            <span className="d-flex align-items-center">
              <span className="flex-grow-1 me-2">
                Sedang Proses Hapus Data...
              </span>
              <span className="spinner-border flex-shrink-0" role="status">
                <span className="visually-hidden">
                  Sedang Proses Hapus Data
                </span>
              </span>
            </span>
          </button>
        </div>
      )}
    </>
  );
};

export default SummaryTestCfitTableViews;
