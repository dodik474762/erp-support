import Link from "next/link";

const SummaryTableSubListCreplin = (props: any) => {
  const {
    datas = [],
    classNameModal,
    base_url = "",
    summaryCreplins,
    classNameNavigator = "subtest-list",
  } = props;
  return (
    <>
      <div className="row">
        <div className="col-md-12">
          <div className="table-responsive">
            <table className="table table-bordered table-striped">
              <thead className="bg-primary text-white">
                <tr>
                  <th className="text-center" colSpan={2}>
                    ASPEK
                  </th>
                  <th>NILAI</th>
                  <th>KATEGORI</th>
                </tr>
              </thead>
              <tbody>
                {summaryCreplins.length > 0 && (
                  <>
                    <tr key={0}>
                      <td>PANKER</td>
                      <td>KECEPATAN KERJA</td>
                      <td className="fw-semibold">{summaryCreplins[0].panker_total.toFixed(2)}</td>
                      <td className="fw-semibold">{summaryCreplins[0].panker_remarks}</td>
                    </tr>
                    <tr key={1}>
                      <td>TIANKER</td>
                      <td>KETELITIAN KERJA</td>
                      <td className="fw-semibold">{summaryCreplins[0].tianker_total.toFixed(2)}</td>
                      <td className="fw-semibold">{summaryCreplins[0].tianker_remarks}</td>
                    </tr>
                    <tr key={2}>
                      <td>JANKER</td>
                      <td>KEAJEGAN KERJA</td>
                      <td className="fw-semibold">{summaryCreplins[0].janker_total.toFixed(2)}</td>
                      <td className="fw-semibold">{summaryCreplins[0].janker_remarks}</td>
                    </tr>
                    <tr key={3}>
                      <td>HANKER</td>
                      <td>KETAHANAN KERJA</td>
                      <td className="fw-semibold">{summaryCreplins[0].hanker_total.toFixed(2)}</td>
                      <td className="fw-semibold">{summaryCreplins[0].hanker_remarks}</td>
                    </tr>
                  </>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-12">
          <div className="table-responsive">
            <table className="table table-bordered table-striped">
              <thead className="bg-danger text-white">
                <tr>
                  <th className="text-center" colSpan={2}>
                    Kategori Hasil :{" "}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Baik Sekali</td>
                  <td>Memiliki potensi kinerja yang bagus</td>
                </tr>
                <tr>
                  <td>Baik</td>
                  <td>Memiliki potensi kinerja diatas rata-rata</td>
                </tr>
                <tr>
                  <td>Sedang</td>
                  <td>Kemampuan di atas standar kebanyakan orang</td>
                </tr>
                <tr>
                  <td>Kurang</td>
                  <td>Masih dibawah standar kinerja yang baik</td>
                </tr>
                <tr>
                  <td>Kurang Sekali</td>
                  <td>Memiliki kinerja yang buruk</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-2">
          <div
            className="nav flex-column nav-pills text-center"
            id="v-pills-tab"
            role="tablist"
            aria-orientation="vertical"
          >
            {datas.map((item: any, index: number) => {
              const active = index === 0 ? "active" : "";
              return (
                <>
                  <Link
                    className={"nav-link mb-2 " + active}
                    data-bs-toggle="tab"
                    href={`#${classNameNavigator}-` + index}
                    id={`tab-${classNameNavigator}-` + index}
                    aria-controls={`${classNameNavigator}-` + index}
                    role="tab"
                    aria-selected={index === 0 ? "true" : "false"}
                  >
                    {item.subtest.judul}
                  </Link>
                </>
              );
            })}
          </div>
        </div>
        <div className="col-md-10">
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
                        <div className="table-responsive">
                          <table className="table table-bordered table-striped">
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
                                            {items.questions.remarks}
                                          </button>
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
        </div>
      </div>
    </>
  );
};

export default SummaryTableSubListCreplin;
