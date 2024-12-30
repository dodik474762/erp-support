import PageTitle from "@/components/layouts/PageTitle";
import { useEffect, useRef, useState } from "react";
import Flatpickr from "react-flatpickr";
import dynamic from "next/dynamic";
import Message from "@/utility/message";
import ButtonLoading from "@/components/layouts/ButtonLoading";
import { useRouter } from "next/router";
import { redirect } from "next/navigation";
import Link from "next/link";
import ApiServices from "@/services/api.services";

const FormTestViews = ({ base_url = "" }) => {
  const router = useRouter();
  const id = router.query.id;

  const Select = dynamic(() => import("react-select"), { ssr: false });

  const [judul, setJudul] = useState(``);
  const [remarks, setRemarks] = useState(``);
  const [category, setCategory] : any = useState({});
  const [categorys, setCategorys] = useState([]);
  const [errors, setErrors]: any = useState({});
  const [loading, setLoading] = useState(false);

  const postData: any = {
    id: id,
    judul: judul,
    category: category,
    remarks: remarks,
  };

  const fetchData = async () => {
    setLoading(true);
    const req: any = await ApiServices.getDataById(String(id), base_url);
    if (req.is_valid == true) {
      setJudul(req.data.judul);
      setRemarks(req.data.remarks);
      setCategory({
        value: req.data.category,
        label: req.data.category_name,
      });
    }
    setLoading(false);
  };

  const fetchDataCategory = async () => {
    const req = await fetch(
      process.env.API_BASE_URL +
        "/master/dictionary/getAll?context=TEST_CATEGORY"
    );
    const res = await req.json();
    if (res) {
      if (res.is_valid) {
        const result: any = [];
        res.data.map((item: any) => {
          result.push({ value: item.term_id, label: item.keterangan });
        });

        setCategorys(result);
      }
    }
  };

  const handleSelectionChange = (e: any) => {
    categorys.forEach((option: any) => {
      if (option.value === e.value) {
        setCategory(option);
      }
    });
  };

  const validation = (data: any): boolean => {
    if (data.judul == "") {
      setErrors({ message: "Judul Harus Diisi" });
      return false;
    }

    if (data.remarks == "") {
      setErrors({ message: "Remarks Harus Diisi" });
      return false;
    }

    if (data.category == null || data.category == "" || Object.keys(data.category).length === 0) {
      setErrors({ message: "Category Harus Diisi" });
      return false;
    }

    setErrors(null);
    return true;
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    if (validation(postData)) {
      const req: any = await ApiServices.submit(base_url, postData, "");
      if (req.is_valid == true) {
        Message.success("Data Berhasil Diproses");
        router.push(base_url);
      } else {
        Message.info(req.message);
        setErrors({ message: req.message });
      }
      setLoading(false);
    } else {
      Message.info("Silahkan Lengkapi Data");
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!router.isReady) return;
    if (id) {
      fetchData();
    }
  }, [router.isReady]);

  useEffect(() => {
    if (!router.isReady) return;
    fetchDataCategory();
  }, [router.isReady]);

  return (
    <>
      <PageTitle titlePage="Data" subTitle="Test Add" />

      {errors == null ? null : (
        <>
          <div className="alert alert-danger mb-xl-0" role="alert">
            {errors.message} <strong> Harus Diisi! </strong>
          </div>
          <br />
        </>
      )}

      <form
        id="createproduct-form"
        autoComplete="off"
        className="needs-validation"
        noValidate
      >
        <div className="row">
          <div className="col-lg-8">
            <div className="card">
              <div className="card-body">
                <div className="mb-3">
                  <label className="form-label" htmlFor="product-title-input">
                    Judul Test
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="product-title-input"
                    placeholder="Enter judul"
                    value={judul}
                    onInput={(e: any) => setJudul(e.target.value)}
                  />
                  <div className="invalid-feedback">Please Enter a judul</div>
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="choices-publish-status-input"
                    className="form-label"
                  >
                    Kategori
                  </label>
                  <Select
                    defaultValue={category}
                    onChange={(e: any) => handleSelectionChange(e)}
                    options={categorys}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label" htmlFor="product-title-input">
                    Keterangan
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="product-title-input"
                    placeholder="Enter keterangan"
                    value={remarks}
                    onInput={(e: any) => setRemarks(e.target.value)}
                  />
                  <div className="invalid-feedback">
                    Please Enter a keterangan
                  </div>
                </div>
              </div>
            </div>

            <div className="text-end mb-3">
              {loading ? (
                <ButtonLoading message="Loading Proses Saving ...." />
              ) : (
                <button
                  type="submit"
                  className="btn btn-success w-sm"
                  onClick={(e: any) => handleSubmit(e)}
                  onSubmit={(e: any) => handleSubmit(e)}
                >
                  Submit
                </button>
              )}
              &nbsp;
              <Link
                href={base_url}
                className="btn btn-soft-info waves-effect waves-light"
              >
                Kembali
              </Link>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default FormTestViews;
