import Link from "next/link";
import moment from "moment-timezone";

const SummaryTableSubListCfit = (props: any) => {
  const {
    datas = [],
    classNameModal,
    handleRemove = () => {},
    handleCheck = () => {},
    readonOnly = false,
    base_url = "",
    showDataAnswer,
    classNameNavigator = "subtest-list",
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
                      href={`#${classNameNavigator}-` + index}
                      role="tab"
                    >
                      {item.subtest.judul}  [{item.code}]
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
                id={`${classNameNavigator}-` + index}
                role="tabpanel"
              >
                <div className="row">
                  <div className="col-md-12">
                    <p>Start date : {moment(item.start_date_schedule).tz("Asia/Jakarta").format("YYYY-MM-DD HH:mm")}</p>
                    <p>End date : {moment(item.end_date_schedule).tz("Asia/Jakarta").format("YYYY-MM-DD HH:mm")}</p>
                    <div className="table-responsive">
                      <table className="table table-bordered table-striped" >
                        <thead style={{ backgroundColor: "#fef4e4" }}>
                          <tr>
                            <th>Tipe</th>
                            <th>Pertanyaan</th>
                            <th>Jawaban</th>
                            <th>Jawaban Benar</th>
                            <th>Poin</th>
                          </tr>
                        </thead>
                        <tbody>
                          {item.answers.map((items: any, index: number) => {
                            const bgColor =
                              items.poin == "0" ? "bg-danger" : "";
                            return (
                              <tr className={`${bgColor}`} key={index}>
                                <td>{items.questions.type}</td>
                                <td>
                                  {items.questions.type.toLowerCase() ==
                                  "image" ? (
                                    <>
                                      <Link
                                        target="_blank"
                                        href={
                                          process.env.BASE_URL_SERVER +
                                          "/" +
                                          items.questions.path_file +
                                          "/" +
                                          items.questions.file_questions
                                        }
                                      >
                                        {items.questions.file_questions}
                                      </Link>
                                    </>
                                  ) : (
                                    items.questions.questions
                                  )}
                                </td>
                                <td>
                                  <div className="flex-shrink-0">
                                    <div className="d-flex align-items-center gap-1">
                                      <button
                                        type="button"
                                        className="btn btn-success btn-sm"
                                      >
                                        {items.answer}
                                      </button>
                                      <div className="dropdown">
                                        <button
                                          className="btn btn-icon btn-sm fs-16 text-muted dropdown"
                                          type="button"
                                          data-bs-toggle="dropdown"
                                          aria-expanded="false"
                                        >
                                          <i className="ri-more-fill"></i>
                                        </button>
                                        <ul className="dropdown-menu">
                                          <li>
                                            <Link
                                              className="dropdown-item"
                                              href={"javascript:;"}
                                              data-bs-toggle="modal"
                                              data-bs-target={classNameModal}
                                              onClick={showDataAnswer.bind(
                                                this,
                                                items.answer
                                              )}
                                            >
                                              <i className="ri-eye-fill text-muted me-2 align-bottom"></i>
                                              View
                                            </Link>
                                          </li>
                                        </ul>
                                      </div>
                                    </div>
                                  </div>
                                </td>
                                <td>
                                  <div className="flex-shrink-0">
                                    <div className="d-flex align-items-center gap-1">
                                      <button
                                        type="button"
                                        className="btn btn-success btn-sm"
                                      >
                                        {items.answer}
                                      </button>
                                      <div className="dropdown">
                                        <button
                                          className="btn btn-icon btn-sm fs-16 text-muted dropdown"
                                          type="button"
                                          data-bs-toggle="dropdown"
                                          aria-expanded="false"
                                        >
                                          <i className="ri-more-fill"></i>
                                        </button>
                                        <ul className="dropdown-menu">
                                          <li>
                                            <Link
                                              className="dropdown-item"
                                              href={"javascript:;"}
                                              data-bs-toggle="modal"
                                              data-bs-target={classNameModal}
                                              onClick={showDataAnswer.bind(
                                                this,
                                                items.right_answer
                                              )}
                                            >
                                              <i className="ri-eye-fill text-muted me-2 align-bottom"></i>
                                              View
                                            </Link>
                                          </li>
                                        </ul>
                                      </div>
                                    </div>
                                  </div>
                                </td>
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

export default SummaryTableSubListCfit;
