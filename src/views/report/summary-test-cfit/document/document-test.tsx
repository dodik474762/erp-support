import PageTitle from "@/components/layouts/PageTitle";
import ApiServices from "@/services/api.services";
import {
  dataNormaCfit,
  dataNormaIst,
  dataNormaIstKlasifikasi,
  dataNormaIstS1,
} from "@/utility/datastatic";
import axios from "axios";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const DocumentTest = (props: any) => {
  const { base_url = "", nik = "", iddata = "" } = props;

  const router = useRouter();
  const PDFViewer = dynamic(() => import("./document-test-pdf"), {
    ssr: true,
  });

  const [data, setData]: any = useState({});
  const [summaryCreplin, setSummaryCreplin]: any = useState({});
  const [iqValue, setIqValue]: any = useState(0);
  const [iqValueRemarks, setIqValueRemarks]: any = useState("");
  const [dataValueNormaIst, setDataValueNormaIst]: any = useState([]);
  const [candidateFeedback, setCandidateFeedback] = useState({});

  const [pasFoto, setPhotosCandidate] = useState(null);
  const [grafikDisc, setGrafikDisc] = useState(null);

  const dataRekomendasi = [
    {
      skala: 4,
      up: 79,
      klasifikasi: "Sangat Rendah",
    },
    {
      bottom: 80,
      up: 90,
      klasifikasi: "Rendah",
    },
    {
      bottom: 91,
      up: 104,
      klasifikasi: "Sedang",
    },
    {
      bottom: 105,
      up: 113,
      klasifikasi: "Tinggi",
    },
  ];

  const fetchData = async () => {
    const req: any = await ApiServices.getDataById(String(iddata), base_url);
    if (req.is_valid == true) {
      setData(req.data);
      if (req.origin.candidate_feedback) {
        setCandidateFeedback(req.origin.candidate_feedback);
        await encodeImageFromUrl(
          {
            path_file: req.origin.candidate_feedback.path_file_test_desc,
            pas_foto: req.origin.candidate_feedback.file_test_desc,
          },
          "grafik_disc"
        );
      }
      if (req.origin.test_creplin) {
        if (req.origin.test_creplin.summary.summary.hanker_remarks == "") {
          req.origin.test_creplin.summary.summary.hanker_remarks =
            "Kurang Sekali";
        }
        if (req.origin.test_creplin.summary.summary.janker_remarks == "") {
          req.origin.test_creplin.summary.summary.janker_remarks =
            "Kurang Sekali";
        }
        if (req.origin.test_creplin.summary.summary.panker_remarks == "") {
          req.origin.test_creplin.summary.summary.panker_remarks =
            "Kurang Sekali";
        }
        if (req.origin.test_creplin.summary.summary.tianker_remarks == "") {
          req.origin.test_creplin.summary.summary.tianker_remarks =
            "Kurang Sekali";
        }
        setSummaryCreplin(req.origin.test_creplin.summary.summary);
      }
      let totalPoin = 0;
      if (req.origin.test_cfit) {
        req.origin.test_cfit.subtest.map((elm: any) => {
          let itemPoin = 0;
          const tempQuestions: any = [];
          elm.answers.map((item: any) => {
            const foreignKey = item.questions_item;
            if (!tempQuestions.includes(foreignKey)) {
              itemPoin += Number(item.poin);
              tempQuestions.push(foreignKey);
            }
          });
          totalPoin += itemPoin;
        });
      }

      /*NORMA TEST CFIT */
      const normaTestCfit: any = req.origin.norma_test_cfit.filter(
        (elm: any) => elm.poin == totalPoin
      );

      if (normaTestCfit.length > 0) {
        setIqValue(normaTestCfit[0].iq_value);

        dataNormaCfit.map((elm: any) => {
          if (
            normaTestCfit[0].iq_value >= elm.bottom &&
            normaTestCfit[0].iq_value <= elm.up
          ) {
            setIqValueRemarks(elm.klasifikasi);
          }
        });
      }
      /*NORMA TEST CFIT */

      let totalPoinIst = 0;
      const dataNilaiIst: any = [];
      if (req.origin.test_ist) {
        req.origin.test_ist.subtest.map((elm: any) => {
          let itemPoin = 0;
          const tempQuestions: any = [];
          elm.answers.map((item: any) => {
            const foreignKey = item.questions_item;
            if (!tempQuestions.includes(foreignKey)) {
              itemPoin += isNaN(Number(item.poin)) ? 0 : Number(item.poin);
              tempQuestions.push(foreignKey);
            }
          });
          const totalPoinAnswered = itemPoin;
          const typeStudi =
            req.data.last_study == null
              ? ["S1", "IPA"]
              : req.data.last_study == ""
              ? ["S1", "IPA"]
              : req.data.last_study.split(" ");
          const nilaiNorma =
            typeStudi[0].trim() == "S1"
              ? dataNormaIstS1[totalPoinAnswered]
              : dataNormaIst[totalPoinAnswered];

          let nilaiNormaRemarks = "";
          if (typeof nilaiNorma == "undefined") {
            nilaiNormaRemarks = "Rendah";
          }
          dataNormaIstKlasifikasi.map((elm: any) => {
            if (
              (nilaiNorma >= elm.bottom && nilaiNorma <= elm.up) ||
              (nilaiNorma >= elm.bottom && nilaiNorma > elm.up)
            ) {
              nilaiNormaRemarks = elm.klasifikasi;
            }
          });

          dataNilaiIst.push({
            poin: itemPoin,
            norma: isNaN(Number(nilaiNorma)) ? 0 : Number(nilaiNorma),
            judul: elm.subtest.judul,
            klasifikasi: nilaiNormaRemarks,
          });
          totalPoinIst += itemPoin;
        });
      }

      // console.log("dataNilaiIst", dataNilaiIst);

      setDataValueNormaIst(dataNilaiIst);

      await encodeImageFromUrl(req.data, "pas_foto");
    }
  };

  const encodeImageFromUrl = async (data: any, type: string) => {
    const image = "public/" + data.path_file + "/" + data.pas_foto;
    // const image = "public/img/test/cfit/cat1/example1.png";
    const encoded: any = await ApiServices.submit(
      base_url,
      {
        file: image,
      },
      "/encode-image"
    );
    const typeFile = image.split(".").pop();

    if (encoded.is_valid == true) {
      if (encoded.origin.type != null) {
        if (type == "pas_foto") {
          if (
            typeFile == "jpg" ||
            typeFile == "jpeg" ||
            typeFile == "JPG" ||
            typeFile == "JPEG"
          ) {
            setPhotosCandidate(
              encoded.data.replace(
                "data:image/png;base64",
                "data:image/jpeg;base64"
              )
            );
          } else {
            setPhotosCandidate(encoded.data);
          }
        }
        if (type == "grafik_disc") {
          if (
            typeFile == "jpg" ||
            typeFile == "jpeg" ||
            typeFile == "JPG" ||
            typeFile == "JPEG"
          ) {
            setGrafikDisc(
              encoded.data.replace(
                "data:image/png;base64",
                "data:image/jpeg;base64"
              )
            );
          } else {
            setGrafikDisc(encoded.data);
          }
        }
      }
    }
  };

  useEffect(() => {
    if (!router.isReady) return;
    fetchData();
  }, [router]);

  return (
    <>
      <PageTitle titlePage="Report" subTitle="Document Test Detail" />
      <div className="row">
        <div className="col-md-12">
          {router.isReady &&
          Object.keys(data).length > 0 &&
          Object.keys(summaryCreplin).length > 0 ? (
            <PDFViewer
              data={data}
              summaryCreplin={summaryCreplin}
              remarks={""}
              summaryIq={iqValue}
              iqValueRemarks={iqValueRemarks}
              dataValueNormaIst={dataValueNormaIst}
              feedback={candidateFeedback}
              pasFoto={pasFoto}
              fotoGrafik={grafikDisc}
            />
          ) : null}
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <div className="hstack gap-2 justify-content-end d-print-none mt-4">
            <Link type="button" className="btn btn-primary" href={base_url}>
              <i className="ri-arrow-left-s-line align-bottom me-1"></i> Kembali
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
export default DocumentTest;
