import Link from "next/link";

const ListCandidateSubTestViews = (props: any) => {
  const {
    data = [],
    classNameModal,
    fetchQuestionsList = () => {},
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
                Sub Test List
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
                          <th>Code Test</th>
                          <th>Judul</th>
                          <th>Status</th>
                          <th>Poin</th>
                          <th style={{ width: "50px" }} className="text-center">
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {data.map((item: any, index: number) => {
                          return (
                            <tr key={index}>
                              <td>{item.code}</td>
                              <td>{item.judul}</td>
                              <td>{item.status}</td>
                              <td>{item.poin}</td>
                              <td className="text-center">
                                <Link
                                  href={'javascript:;'}
                                  onClick={fetchQuestionsList.bind(
                                    this,
                                    item.test_sub
                                  )}
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

export default ListCandidateSubTestViews;
