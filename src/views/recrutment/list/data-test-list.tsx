import Image from "next/image";

const DataTestList = (props: any) => {
  const { key, item, index, handleChangeAnswer = () => {} } = props;

  return (
    <>
      <div className="border border-dashed card-body">
        <div id="content-test" style={{ marginTop: "10px" }}>
          <button type="button" className="btn btn-primary">
            Soal <span className="badge bg-success ms-1">{index + 1}</span>
          </button>
          <br />
          <br />
          <p className="text-muted">
            <div className="col-md-12">
              {item.type === "IMAGE" ? (
                <Image
                  src={
                    process.env.BASE_URL_SERVER +
                    "/" +
                    item.path_file +
                    "/" +
                    item.file_questions
                  }
                  alt="Example"
                  className="img-fluid"
                  width={300}
                  height={300}
                />
              ) : (
                <p>{item.questions}</p>
              )}
            </div>

            <div className="col-md-12" style={{ padding: "10px" }}>
              <div className="row">
                {item.answers.map((data: any, index: any) => {
                  return data.type == "IMAGE" ? (
                    <>
                      <div className="col-md-2">
                        <div className="col-md-10 text-center">
                          <Image
                            src={
                              process.env.BASE_URL_SERVER +
                              "/" +
                              data.file_path +
                              "/" +
                              data.file
                            }
                            alt="Example"
                            className="img-fluid"
                            width={65}
                            height={65}
                          />
                          &nbsp;
                          <span className="font-bold">
                            {item.multi_answer == "1" ? (
                              <input
                                type="checkbox"
                                id={item.right_answer}
                                name={item.id}
                                value={data.id}
                                onInput={handleChangeAnswer}
                              />
                            ) : (
                              <input
                                type="radio"
                                id=""
                                name={item.id}
                                value={data.id}
                                onInput={handleChangeAnswer}
                              />
                            )}
                          </span>
                        </div>
                        <div className="col-md-2 text-center"></div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="col-md-2">
                        <div className="col-md-10 text-center">
                          <p>
                            {data.answer} &nbsp;
                            <span className="font-bold">
                              {item.multi_answer == "1" ? (
                                <input
                                  type="checkbox"
                                  id={item.right_answer}
                                  name={item.id}
                                  value={data.id}
                                  onInput={handleChangeAnswer}
                                />
                              ) : (
                                <input
                                  type="radio"
                                  id=""
                                  name={item.id}
                                  value={data.id}
                                  onInput={handleChangeAnswer}
                                />
                              )}
                            </span>
                          </p>
                        </div>
                        <div className="col-md-2 text-center"></div>
                      </div>
                    </>
                  );
                })}
              </div>
            </div>
          </p>
        </div>
      </div>
    </>
  );
};

export default DataTestList;
