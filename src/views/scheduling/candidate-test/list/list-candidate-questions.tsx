import Link from "next/link";

const ListCandidateQuestionSubTestViews = (props: any) => {
  const {
    data = [],
    classNameModal,
    handleRemove = () => {},
    handleCheck = () => {},
    readonOnly = false,
  } = props;

  return (
    <>
      <div className="card">
        <div className="card-header">
          <ul
            className="nav nav-tabs-custom card-header-tabs border-bottom-0"
            role="tablist"
          >
            <li className="nav-item">
              <Link
                className="nav-link active"
                data-bs-toggle="tab"
                href="#answer-list"
                role="tab"
              >
                Sub Test Questions List
              </Link>
            </li>
          </ul>
        </div>
        <div className="card-body">
          <div className="tab-content">
            <div className="tab-pane active" id="answer-list" role="tabpanel">
              <div className="row">
                <div className="col-md-12">
                  <div className="table-responsive">
                    <table className="table table-bordered table-striped">
                      <thead>
                        <tr>
                          <th>Questions</th>
                          <th>File Questions</th>
                          <th>Type Questions</th>
                          <th>Remarks</th>
                          <th>Type Answer</th>
                          <th style={{ width: "50px" }} className="text-center">
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {data.map((item: any, index: number) => {
                          return (
                            <tr key={index}>
                              <td>{item.questions}</td>
                              <td>{item.type}</td>
                              <td>
                                <Link
                                  href={
                                    item.type.toLowerCase() == "image"
                                      ? process.env.BASE_URL_SERVER +
                                        "/" +
                                        item.path_file +
                                        "/" +
                                        item.file_questions
                                      : "javascript:;"
                                  }
                                >
                                  {item.file_questions}
                                </Link>
                              </td>
                              <td>{item.remarks}</td>
                              <td>{item.multi_answer == '1' ? 'Multi Answer' : 'Single Answer'}</td>
                              <td className="text-center">
                                <Link
                                  href={"javascript:;"}
                                  className="text-primary d-inline-block"
                                >
                                  <i className="ri-eye-fill fs-16"></i>
                                </Link>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ListCandidateQuestionSubTestViews;
