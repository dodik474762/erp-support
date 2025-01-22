import Link from "next/link";

const FormSalesItem = (props: any) => {
  const { items = [], classNameModal, handleRemove = () => {}, readonOnly = false } = props;  
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
                Sales Price List
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
                          <th>Price Type</th>
                          <th>Price</th>
                          <th style={{ width: "50px" }} className="text-center">
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {items.map((item: any, index: number) => {
                          return (
                            <tr key={index}>
                              <td>{item.type && item.type.label}</td>
                              <td>{item.price && item.price.toLocaleString("id-ID")}</td>
                              <td className="text-center">
                                {
                                  readonOnly == false ? <Link
                                  className="text-danger d-inline-block remove-item-btn"
                                  href="javascript:void(0)"
                                  onClick={handleRemove.bind(this, index)}                                  
                                >
                                  <i className="ri-delete-bin-5-fill fs-16"></i>
                                </Link> : null
                                }
                              </td>
                            </tr>
                          );
                        })}
                        {
                          readonOnly == false ? <tr>
                          <td colSpan={8}>
                            <Link
                              href={"javascript:;"}
                              className="btn btn-success btn-sm"
                              data-bs-toggle="modal"
                              data-bs-target={classNameModal}
                            >
                              Add Item
                            </Link>
                          </td>
                        </tr> : null
                        }
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

export default FormSalesItem;
