import moment from "moment-timezone";
import Link from "next/link";

const SummaryTableDescribeTestList = (props: any) => {
  const {
    datas = [],
    catDescribeTest = {},
    classNameModal,
    handleRemove = () => {},
    handleCheck = () => {},
    readonOnly = false,
    base_url = "",
    showDataAnswer,
  } = props;
  return (
    <>
      <div className="row">
        <div className="col-md-12">
          <ul
            className="nav nav-tabs-custom card-header-tabs border-bottom-0"
            role="tablist"
          >
            {datas.map((item: any, index: number) => {
              const active = index === 0 ? "active" : "";
              return (
                <>
                  <li className="nav-item">
                    <Link
                      className={"nav-link " + active}
                      data-bs-toggle="tab"
                      href={"#subtest-describe-list-" + index}
                      role="tab"
                    >
                      {item.subtest.judul} [{item.code}]
                    </Link>
                  </li>
                </>
              );
            })}
          </ul>
        </div>
      </div>
      <br />
      <br />
      <div className="tab-content">
        {datas.map((item: any, index: number) => {
          const active = index === 0 ? "active" : "";
          return (
            <>
              <div
                className={"tab-pane " + active}
                id={"subtest-describe-list-" + index}
                role="tabpanel"
              >
                <div className="row">
                  <div className="col-md-12">
                    <p>
                      Start date :{" "}
                      {moment(item.start_date_schedule)
                        .tz("Asia/Jakarta")
                        .format("YYYY-MM-DD HH:mm")}
                    </p>
                    <p>
                      End date :{" "}
                      {moment(item.end_date_schedule)
                        .tz("Asia/Jakarta")
                        .format("YYYY-MM-DD HH:mm")}
                    </p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="table-responsive">
                      <table
                        style={{
                          width: "300px",
                          border: "0.5px solid black",
                          borderSpacing: "0px",
                          borderCollapse: "collapse",
                        }}
                      >
                        <thead className="bg-warning text-black">
                          <tr
                            style={{
                              border: "0.5px solid black",
                              borderSpacing: "0px",
                              borderCollapse: "collapse",
                            }}
                          >
                            <th>&nbsp;</th>
                            <th>MOST</th>
                            <th>LEAST</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr
                            style={{
                              border: "0.5px solid black",
                              borderSpacing: "0px",
                              borderCollapse: "collapse",
                            }}
                          >
                            <td>Huruf Z</td>
                            <td>{catDescribeTest["huruf-z"].most}</td>
                            <td>{catDescribeTest["huruf-z"].least}</td>
                          </tr>
                          <tr style={{border: "0.5px solid black", borderSpacing: "0px", borderCollapse: "collapse"}}>
                            <td>Persegi</td>
                            <td>{catDescribeTest["persegi"].most}</td>
                            <td>{catDescribeTest["persegi"].least}</td>
                          </tr>
                          <tr style={{border: "0.5px solid black", borderSpacing: "0px", borderCollapse: "collapse"}}>
                            <td>Segitiga</td>
                            <td>{catDescribeTest["segitiga"].most}</td>
                            <td>{catDescribeTest["segitiga"].least}</td>
                          </tr>
                          <tr style={{border: "0.5px solid black", borderSpacing: "0px", borderCollapse: "collapse"}}>
                            <td>Bintang</td>
                            <td>{catDescribeTest["bintang"].most}</td>
                            <td>{catDescribeTest["bintang"].least}</td>
                          </tr>
                          <tr style={{border: "0.5px solid black", borderSpacing: "0px", borderCollapse: "collapse"}}>
                            <td>Huruf N</td>
                            <td>{catDescribeTest["huruf-n"].most}</td>
                            <td>{catDescribeTest["huruf-n"].least}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                <br />
                <div className="row">
                  <div className="col-md-12">
                    <div className="table-responsive">
                      <table className="table table-bordered table-striped">
                        <thead style={{ backgroundColor: "#fef4e4" }}>
                          <tr>
                            <th>Pernyataan</th>
                            <th>Most</th>
                            <th>Least</th>
                            <th>Poin</th>
                          </tr>
                        </thead>
                        <tbody>
                          {item.answers.map((items: any, index: number) => {
                            const bgColor =
                              items.poin == "0" ? "bg-danger" : "";
                            return (
                              <tr className={`${bgColor}`} key={index}>
                                <td>{items.remarks}</td>
                                <td>{items.most}</td>
                                <td>{items.least}</td>
                                <td>{items.poin}</td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
};

export default SummaryTableDescribeTestList;
