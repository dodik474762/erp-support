import ApiServices from "@/services/api.services";
import Message from "@/utility/message";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useState } from "react";

const FormSettingRetest = (props: any) => {
  const { className, baseUrl = "", id = 0 } = props;

  const [data, setData] = useState<any[]>([]);

  const fetchDataAllCategoryTest = async () => {
    const req: any = await ApiServices.get(
      baseUrl,
      "/get-all-category-test?id=" + id
    );
    if (req.is_valid == true) {
      setData(req.data);

      console.log(req.data);
    }
  };

  const handleConfirmRetest = async (event: any, item : any) => {
    event.preventDefault();

    item.candidate_applied = id;
    const req:any= await ApiServices.submit(baseUrl, item, "/submit-retest");
    
    if(req.is_valid == true){
      Message.success("Data Berhasil Diproses");
      fetchDataAllCategoryTest();
    }else{
      Message.info(req.message);
    }
  };

  useEffect(() => {
    fetchDataAllCategoryTest();
  }, []);

  return (
    <>
      <div
        className={"modal fade  bs-example-modal-xl " + className}
        tabIndex={-1}
        role="dialog"
        aria-labelledby="mySmallModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-xl">
          <div className="modal-content">
            <div className="alert border-dashed alert-danger" role="alert">
              <div className="d-flex align-items-center">
                <div className="ms-2">
                  <h5 className="fs-14 text-danger fw-semibold">
                    Setting Retest Candidate
                  </h5>
                  <p className="text-black mb-1">Pastikan data dengan benar </p>
                </div>
              </div>
            </div>
            <form action="#">
              <div className="modal-body">
                <div className="table-responsive">
                  <table className="table table-bordered table-striped" >
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Code Test</th>
                        <th>Kategori</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data &&
                        data.map((item: any, index: number) => {
                          return (
                            <tr key={index}>
                              <td>{index + 1}</td>
                              <td>{item.code}</td>
                              <td>
                                {item.test_category.judul} <hr /> <br />{" "}
                                {item.test_category.remarks}
                              </td>
                              <td>{item.status}</td>
                              <td>
                                {item.status == "COMPLETE" ? (
                                  <>
                                    <button className="btn btn-sm btn-success" onClick={(e) => handleConfirmRetest(e, item)}>
                                      Confirm Re-test
                                    </button>
                                  </>
                                ) : (
                                  <></>
                                )}
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="modal-footer" style={{ display: "block" }}>
                <div className="hstack gap-2 justify-content-end">
                  <button
                    type="button"
                    className="btn btn-light"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default FormSettingRetest;
