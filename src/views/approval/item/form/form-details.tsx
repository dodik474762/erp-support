import PageTitle from "@/components/layouts/PageTitle";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import ApiServices from "@/services/api.services";
import InfoApproval from "@/views/transaction/request-item/form/info-approval";
import dynamic from "next/dynamic";
import ButtonLoading from "@/components/layouts/ButtonLoading";
import Message from "@/utility/message";
import { useSession } from "next-auth/react";
import FormModalKeteranganReject from "./modal/form-keterangan-reject";
import FormSalesItem from "@/views/transaction/request-item/form/form-sales-item";

const ApprovalItemDetailsViews = ({ base_url = "" }) => {
  const Select = dynamic(() => import("react-select"), { ssr: false });
  const classNameModal = "modal-reject";

  const router = useRouter();
  const id = router.query.id;
  const [data, setData]: any = useState({});
  const [salesItems, setSalesItems]: any = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors]: any = useState({});
  const session: any = useSession();

  const [cogsAccounts, setCogsAccounts]: any = useState([]);
  const [cogsAcount, setCogsAcount]: any = useState(null);
  const [assetAccounts, setAssetAccounts]: any = useState([]);
  const [assetAcount, setAssetAcount]: any = useState(null);
  const [incomeAccounts, setIncomeAccounts]: any = useState([]);
  const [incomeAcount, setIncomeAcount]: any = useState(null);
  const [gainAccounts, setGainAccounts]: any = useState([]);
  const [gainAcount, setGainAcount]: any = useState(null);
  const [priceVarianAccounts, setPriceVarianAccounts]: any = useState([]);
  const [priceVarianAccount, setPriceVarianAccount]: any = useState(null);
  const [qtyVarianAccounts, setQtyVarianAccounts]: any = useState([]);
  const [qtyVarianAcount, setQtyVarianAcount]: any = useState(null);
  const [exchangeAccounts, setExchangeAccounts]: any = useState([]);
  const [exhangeAcount, setExchangeAcount]: any = useState(null);
  const [wipAccounts, setWipAccounts]: any = useState([]);
  const [wipAcount, setWipAcount]: any = useState(null);
  const [scrapAccounts, setScrapAccounts]: any = useState([]);
  const [scrapAcount, setScrapAcount]: any = useState(null);
  const [wpAccounts, setWpAccounts]: any = useState([]);
  const [wpAcount, setWpAcount]: any = useState(null);
  const [unbuildAccounts, setUnbuildAccounts]: any = useState([]);
  const [unbuildAcount, setUnbuildAcount]: any = useState(null);
  const [adjustAccounts, setAdjustAccounts]: any = useState([]);
  const [adjustAcount, setAdjustAcount]: any = useState(null);
  const [status, setStatus]: any = useState(``);

  const postData: any = {
    id: id,
    cogsAcount: cogsAcount,
    assetAcount: assetAcount,
    incomeAccount: incomeAcount,
    gainAcount: gainAcount,
    priceVarianAccount: priceVarianAccount,
    qtyVarianAcount: qtyVarianAcount,
    exhangeAcount: exhangeAcount,
    wipAcount: wipAcount,
    scrapAcount: scrapAcount,
    wpAcount: wpAcount,
    unbuildAcount: unbuildAcount,
    adjustAcount: adjustAcount,
  };

  const fetchData = async () => {
    setLoading(true);
    const req: any = await ApiServices.getDataById(String(id), base_url);
    if (req.is_valid == true) {
      setData(req.data);
      if (req.data.account) {
        setCogsAcount({
          value: req.data.account,
          label: req.data.account_name,
        });
      }
      if (req.data.asset_account) {
        setAssetAcount({
          value: req.data.asset_account,
          label: req.data.asset_account_name,
        });
      }
      if (req.data.income_account) {
        setIncomeAcount({
          value: req.data.income_account,
          label: req.data.income_account_name,
        });
      }
      if (req.data.gain_account) {
        setGainAcount({
          value: req.data.gain_account,
          label: req.data.gain_account_name,
        });
      }
      if (req.data.price_account) {
        setPriceVarianAccount({
          value: req.data.price_account,
          label: req.data.price_account_name,
        });
      }
      if (req.data.qty_account) {
        setQtyVarianAcount({
          value: req.data.qty_account,
          label: req.data.qty_account_name,
        });
      }
      if (req.data.rate_account) {
        setExchangeAcount({
          value: req.data.rate_account,
          label: req.data.rate_account_name,
        });
      }
      if (req.data.wip_account) {
        setWipAcount({
          value: req.data.wip_account,
          label: req.data.wip_account_name,
        });
      }
      if (req.data.scrap_account) {
        setScrapAcount({
          value: req.data.scrap_account,
          label: req.data.scrap_account_name,
        });
      }
      if (req.data.wip_cost_account) {
        setWpAcount({
          value: req.data.wip_cost_account,
          label: req.data.wip_cost_account_name,
        });
      }
      if (req.data.unbuild_account) {
        setUnbuildAcount({
          value: req.data.unbuild_account,
          label: req.data.unbuild_account_name,
        });
      }
      if (req.data.adjust_account) {
        setAdjustAcount({
          value: req.data.adjust_account,
          label: req.data.adjust_account_name,
        });
      }
      setStatus(req.data.status);

      /*sales item */
      const sales_item = req.origin.sales_item;
      const resultSalesItem = [];
      for (let index = 0; index < sales_item.length; index++) {
        const element = sales_item[index];
        resultSalesItem.push({
          id: index + 1,
          price: element.price,
          type: {
            value: element.type_price,
            label: element.type_price_name,
          },
        });
      }
      setSalesItems(resultSalesItem);
    }
    setLoading(false);
  };

  const fetchDataAccount = async () => {
    const authToken = localStorage.getItem("authToken");
    const req = await fetch(process.env.API_BASE_URL + "/data/account/getAll", {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    const res = await req.json();
    if (res) {
      if (res.is_valid) {
        const val: any = [];
        res.data.map((item: any) => {
          val.push({
            value: item.id,
            label: item.account_code + "-" + item.account_name,
          });
        });

        setCogsAccounts(val);
        setAssetAccounts(val);
        setIncomeAccounts(val);
        setGainAccounts(val);
        setPriceVarianAccounts(val);
        setQtyVarianAccounts(val);
        setExchangeAccounts(val);
        setWipAccounts(val);
        setScrapAccounts(val);
        setWpAccounts(val);
        setUnbuildAccounts(val);
        setAdjustAccounts(val);
      }
    }
  };

  const handleSelectionAccountChange = (e: any, type: string) => {
    if (type == "cogs_account") {
      cogsAccounts.forEach((option: any) => {
        if (option.value === e.value) {
          setCogsAcount(option);
        }
      });
    }
    if (type == "asset_account") {
      assetAccounts.forEach((option: any) => {
        if (option.value === e.value) {
          setAssetAcount(option);
        }
      });
    }
    if (type == "income_account") {
      incomeAccounts.forEach((option: any) => {
        if (option.value === e.value) {
          setIncomeAcount(option);
        }
      });
    }
    if (type == "gain_account") {
      gainAccounts.forEach((option: any) => {
        if (option.value === e.value) {
          setGainAcount(option);
        }
      });
    }
    if (type == "price_variant_account") {
      priceVarianAccounts.forEach((option: any) => {
        if (option.value === e.value) {
          setPriceVarianAccount(option);
        }
      });
    }
    if (type == "qty_variant_account") {
      qtyVarianAccounts.forEach((option: any) => {
        if (option.value === e.value) {
          setQtyVarianAcount(option);
        }
      });
    }
    if (type == "exchange_variant_account") {
      exchangeAccounts.forEach((option: any) => {
        if (option.value === e.value) {
          setExchangeAcount(option);
        }
      });
    }
    if (type == "wip_variant_account") {
      wipAccounts.forEach((option: any) => {
        if (option.value === e.value) {
          setWipAcount(option);
        }
      });
    }
    if (type == "scrap_account") {
      scrapAccounts.forEach((option: any) => {
        if (option.value === e.value) {
          setScrapAcount(option);
        }
      });
    }
    if (type == "wp_account") {
      wpAccounts.forEach((option: any) => {
        if (option.value === e.value) {
          setWpAcount(option);
        }
      });
    }
    if (type == "unbuild_account") {
      unbuildAccounts.forEach((option: any) => {
        if (option.value === e.value) {
          setUnbuildAcount(option);
        }
      });
    }
    if (type == "adjust_account") {
      adjustAccounts.forEach((option: any) => {
        if (option.value === e.value) {
          setAdjustAcount(option);
        }
      });
    }
  };

  const handleReject = async (e: any, remarks: any) => {
    setLoading(true);
    const post = {
      id: id,
      remarks: remarks,
    };
    const req: any = await ApiServices.submit(base_url, post, "/reject");
    if (req.is_valid == true) {
      Message.success("Data Berhasil Diproses");
      router.push(base_url);
    } else {
      Message.info(req.message);
      setErrors({ message: req.message });
      setLoading(false);
    }
    setLoading(false);
  };

  const validation = (data: any): boolean => {
    if (data.cogsAcount == null || Object.keys(data.cogsAcount).length == 0) {
      setErrors({ message: "COGS Account Harus Diisi" });
      return false;
    }
    if (data.assetAcount == null || Object.keys(data.assetAcount).length == 0) {
      setErrors({ message: "Assets Account Harus Diisi" });
      return false;
    }
    if (
      data.incomeAccount == null ||
      Object.keys(data.incomeAccount).length == 0
    ) {
      setErrors({ message: "Income Account Harus Diisi" });
      return false;
    }
    if (data.gainAcount == null || Object.keys(data.gainAcount).length == 0) {
      setErrors({ message: "Gain/Loss Account Harus Diisi" });
      return false;
    }
    if (
      data.priceVarianAccount == null ||
      Object.keys(data.priceVarianAccount).length == 0
    ) {
      setErrors({ message: "Price Variant Account Harus Diisi" });
      return false;
    }
    if (
      data.qtyVarianAcount == null ||
      Object.keys(data.qtyVarianAcount).length == 0
    ) {
      setErrors({ message: "Qty Variant Account Harus Diisi" });
      return false;
    }
    if (
      data.exhangeAcount == null ||
      Object.keys(data.exhangeAcount).length == 0
    ) {
      setErrors({ message: "Exchange Rate Account Harus Diisi" });
      return false;
    }
    if (data.wipAcount == null || Object.keys(data.wipAcount).length == 0) {
      setErrors({ message: "WIP COST Account Harus Diisi" });
      return false;
    }
    if (data.scrapAcount == null || Object.keys(data.scrapAcount).length == 0) {
      setErrors({ message: "Scrap Account Harus Diisi" });
      return false;
    }
    if (data.wpAcount == null || Object.keys(data.wpAcount).length == 0) {
      setErrors({ message: "WIP Account Harus Diisi" });
      return false;
    }
    if (
      data.unbuildAcount == null ||
      Object.keys(data.unbuildAcount).length == 0
    ) {
      setErrors({ message: "Unbuild Account Harus Diisi" });
      return false;
    }
    if (
      data.adjustAcount == null ||
      Object.keys(data.adjustAcount).length == 0
    ) {
      setErrors({ message: "Adjust Account Harus Diisi" });
      return false;
    }

    setErrors(null);
    return true;
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    if (validation(postData)) {
      postData.users = session.data.user.id;
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

    fetchDataAccount();
    fetchData();
  }, [router.isReady]);

  return (
    <>
      <PageTitle
        titlePage="Request Item"
        subTitle={"Request Item Detail ID :" + id}
      />
      <InfoApproval data={data} />

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
              <div className="card-header">
                <h5>Detail Form</h5>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label
                        className="form-label"
                        htmlFor="product-title-input"
                      >
                        Subsidiary
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="product-title-input"
                        placeholder="Enter subsidiary"
                        disabled
                        value={data.subsidiary_type}
                      />
                      <div className="invalid-feedback">
                        Please Enter a subsidiary
                      </div>
                    </div>
                    <div className="mb-3">
                      <label
                        className="form-label"
                        htmlFor="product-title-input"
                      >
                        Department
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="product-title-input"
                        placeholder="Enter departemen"
                        disabled
                        value={data.departemen_name}
                      />
                      <div className="invalid-feedback">
                        Please Enter a departemen
                      </div>
                    </div>
                    <div className="mb-3">
                      <label
                        className="form-label"
                        htmlFor="product-title-input"
                      >
                        Nama
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="product-title-input"
                        placeholder="Enter nama"
                        disabled
                        value={data.item_name}
                      />
                      <div className="invalid-feedback">
                        Please Enter a nama
                      </div>
                    </div>
                    <div className="mb-3">
                      <label
                        className="form-label"
                        htmlFor="product-title-input"
                      >
                        Product Type
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="product-title-input"
                        placeholder="Enter Product Type"
                        disabled
                        value={data.product_type_name}
                      />
                      <div className="invalid-feedback">
                        Please Enter a Product Type
                      </div>
                    </div>
                    <div className="mb-3">
                      <label
                        className="form-label"
                        htmlFor="product-title-input"
                      >
                        Primary Unit Type
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="product-title-input"
                        placeholder="Enter Primary Unit Type"
                        disabled
                        value={data.primary_unit_name}
                      />
                      <div className="invalid-feedback">
                        Please Enter a Primary Unit Type
                      </div>
                    </div>
                    <div className="mb-3">
                      <label
                        className="form-label"
                        htmlFor="product-title-input"
                      >
                        Primary Stock Unit Type
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="product-title-input"
                        placeholder="Enter Primary Stock Unit Type"
                        disabled
                        value={data.primary_stock_unit_name}
                      />
                      <div className="invalid-feedback">
                        Please Enter a Primary Stock Unit Type
                      </div>
                    </div>
                    <div className="mb-3">
                      <label
                        className="form-label"
                        htmlFor="product-title-input"
                      >
                        Primary Purchase Unit
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="product-title-input"
                        placeholder="Enter Primary Purchase Unit Type"
                        disabled
                        value={data.primary_purchase_unit_name}
                      />
                      <div className="invalid-feedback">
                        Please Enter a Purchase Unit
                      </div>
                    </div>
                    <div className="mb-3">
                      <label
                        className="form-label"
                        htmlFor="product-title-input"
                      >
                        Primary Sales Unit
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="product-title-input"
                        placeholder="Enter Primary Sales Unit"
                        disabled
                        value={data.primary_sale_unit_name}
                      />
                      <div className="invalid-feedback">
                        Please Enter a Sales Unit
                      </div>
                    </div>
                    <div className="mb-3">
                      <label
                        className="form-label"
                        htmlFor="product-title-input"
                      >
                        Volume Type
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="product-title-input"
                        placeholder="Enter Volume Type"
                        disabled
                        value={data.volume_type_name}
                      />
                      <div className="invalid-feedback">
                        Please Enter a Volume Type
                      </div>
                    </div>
                    <div className="mb-3">
                      <label
                        className="form-label"
                        htmlFor="product-title-input"
                      >
                        Group Type
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="product-title-input"
                        placeholder="Enter Group Type"
                        disabled
                        value={data.group_type_name}
                      />
                      <div className="invalid-feedback">
                        Please Enter a Group Type
                      </div>
                    </div>
                    <div className="mb-3">
                      <label
                        className="form-label"
                        htmlFor="product-title-input"
                      >
                        Incubation Days
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="product-title-input"
                        placeholder="Enter Incubation Days"
                        disabled
                        value={data.incubation_days}
                      />
                      <div className="invalid-feedback">
                        Please Enter a Incubation Days
                      </div>
                    </div>
                    <div className="mb-3">
                      <label
                        className="form-label"
                        htmlFor="product-title-input"
                      >
                        Keterangan
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="product-title-input"
                        placeholder="Enter keterangan"
                        value={data.remarks}
                        disabled
                      />
                      <div className="invalid-feedback">
                        Please Enter a keterangan
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <FormModalKeteranganReject
              className={classNameModal}
              handleReject={handleReject}
              error={errors}
            />
          </div>

          <div className="col-lg-4">
            <div className="card">
              <div className="card-header">
                <h5>Account</h5>
              </div>
              <div className="card-body">
                <div className="mb-3">
                  <label
                    htmlFor="choices-publish-status-input"
                    className="form-label"
                  >
                    COGS Account
                  </label>
                  <Select
                    isDisabled={false}
                    defaultValue={cogsAcount}
                    onChange={(e: any) =>
                      handleSelectionAccountChange(e, "cogs_account")
                    }
                    options={cogsAccounts}
                  />
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="choices-publish-status-input"
                    className="form-label"
                  >
                    Asset Account
                  </label>
                  <Select
                    isDisabled={false}
                    defaultValue={assetAcount}
                    onChange={(e: any) =>
                      handleSelectionAccountChange(e, "asset_account")
                    }
                    options={assetAccounts}
                  />
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="choices-publish-status-input"
                    className="form-label"
                  >
                    Income Account
                  </label>
                  <Select
                    isDisabled={false}
                    defaultValue={incomeAcount}
                    onChange={(e: any) =>
                      handleSelectionAccountChange(e, "income_account")
                    }
                    options={incomeAccounts}
                  />
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="choices-publish-status-input"
                    className="form-label"
                  >
                    Gain/Loss Account
                  </label>
                  <Select
                    isDisabled={false}
                    defaultValue={gainAcount}
                    onChange={(e: any) =>
                      handleSelectionAccountChange(e, "gain_account")
                    }
                    options={gainAccounts}
                  />
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="choices-publish-status-input"
                    className="form-label"
                  >
                    Price Variance Account
                  </label>
                  <Select
                    isDisabled={false}
                    defaultValue={priceVarianAccount}
                    onChange={(e: any) =>
                      handleSelectionAccountChange(e, "price_variant_account")
                    }
                    options={priceVarianAccounts}
                  />
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="choices-publish-status-input"
                    className="form-label"
                  >
                    Quantity Variance Account
                  </label>
                  <Select
                    isDisabled={false}
                    defaultValue={qtyVarianAcount}
                    onChange={(e: any) =>
                      handleSelectionAccountChange(e, "qty_variant_account")
                    }
                    options={qtyVarianAccounts}
                  />
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="choices-publish-status-input"
                    className="form-label"
                  >
                    Exchange Rate Variance Account
                  </label>
                  <Select
                    isDisabled={false}
                    defaultValue={exhangeAcount}
                    onChange={(e: any) =>
                      handleSelectionAccountChange(
                        e,
                        "exchange_variant_account"
                      )
                    }
                    options={exchangeAccounts}
                  />
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="choices-publish-status-input"
                    className="form-label"
                  >
                    WIP Cost Variance Account
                  </label>
                  <Select
                    isDisabled={false}
                    defaultValue={wipAcount}
                    onChange={(e: any) =>
                      handleSelectionAccountChange(e, "wip_variant_account")
                    }
                    options={wipAccounts}
                  />
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="choices-publish-status-input"
                    className="form-label"
                  >
                    Scrap Account
                  </label>
                  <Select
                    isDisabled={false}
                    defaultValue={scrapAcount}
                    onChange={(e: any) =>
                      handleSelectionAccountChange(e, "scrap_account")
                    }
                    options={scrapAccounts}
                  />
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="choices-publish-status-input"
                    className="form-label"
                  >
                    WIP Account
                  </label>
                  <Select
                    isDisabled={false}
                    defaultValue={wpAcount}
                    onChange={(e: any) =>
                      handleSelectionAccountChange(e, "wp_account")
                    }
                    options={wpAccounts}
                  />
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="choices-publish-status-input"
                    className="form-label"
                  >
                    Unbuild Variance Account
                  </label>
                  <Select
                    isDisabled={false}
                    defaultValue={unbuildAcount}
                    onChange={(e: any) =>
                      handleSelectionAccountChange(e, "unbuild_account")
                    }
                    options={unbuildAccounts}
                  />
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="choices-publish-status-input"
                    className="form-label"
                  >
                    Adjustment Account CO Product
                  </label>
                  <Select
                    isDisabled={false}
                    defaultValue={adjustAcount}
                    onChange={(e: any) =>
                      handleSelectionAccountChange(e, "adjust_account")
                    }
                    options={adjustAccounts}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-8">
            <div className="card">
              <div className="card-header">
                <h5 className="card-title mb-0">Pricing Item</h5>
              </div>
              <div className="card-body"></div>
              <FormSalesItem items={salesItems} readonOnly={true} />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-8">
            <div className="text-end mb-3">
              {loading ? (
                <ButtonLoading message="Loading Proses Saving ...." />
              ) : (
                <>
                  {status == "COMPLETED" ? null : (
                    <button
                      type="submit"
                      className="btn btn-success w-sm"
                      onClick={(e: any) => handleSubmit(e)}
                      onSubmit={(e: any) => handleSubmit(e)}
                    >
                      Approve
                    </button>
                  )}
                </>
              )}
              &nbsp;
              {loading ? (
                <ButtonLoading message="Loading Proses Saving ...." />
              ) : (
                <>
                  {status == "COMPLETED" ? null : (
                    <Link
                      href={"javascript:;"}
                      className="btn btn-danger"
                      data-bs-toggle="modal"
                      data-bs-target={"." + classNameModal}
                    >
                      Reject
                    </Link>
                  )}
                </>
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

export default ApprovalItemDetailsViews;
