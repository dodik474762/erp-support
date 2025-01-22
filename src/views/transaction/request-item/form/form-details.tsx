import PageTitle from "@/components/layouts/PageTitle";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import ApiServices from "@/services/api.services";
import InfoApproval from "./info-approval";
import FormSalesItem from "./form-sales-item";

const RequestItemDetailsViews = ({ base_url = "" }) => {
  const router = useRouter();
  const id = router.query.id;
  const [data, setData]: any = useState({});
  const [salesItems, setSalesItems]: any = useState([]);

  const fetchData = async () => {
    const req: any = await ApiServices.getDataById(String(id), base_url);
    if (req.is_valid == true) {
      setData(req.data);

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
  };
  useEffect(() => {
    if (!router.isReady) return;

    fetchData();
  }, [router.isReady]);

  return (
    <>
      <PageTitle
        titlePage="Request Item"
        subTitle={"Request Item Detail ID :" + id}
      />
      <InfoApproval data={data} />

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
          </div>

          <div className="col-lg-4">
            <div className="card">
              <div className="card-header">
                <h5>Account</h5>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-12">
                    <div className="mb-3">
                      <label
                        className="form-label"
                        htmlFor="product-title-input"
                      >
                        COGS Account
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="product-title-input"
                        placeholder="Enter account"
                        value={data.account_name}
                        disabled
                      />
                      <div className="invalid-feedback">
                        Please Enter a COGS Account
                      </div>
                    </div>
                    <div className="mb-3">
                      <label
                        className="form-label"
                        htmlFor="product-title-input"
                      >
                        Asset Account
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="product-title-input"
                        placeholder="Enter account"
                        value={data.asset_account_name}
                        disabled
                      />
                      <div className="invalid-feedback">
                        Please Enter a Asset account
                      </div>
                    </div>
                    <div className="mb-3">
                      <label
                        className="form-label"
                        htmlFor="product-title-input"
                      >
                        Income Account
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="product-title-input"
                        placeholder="Enter account"
                        value={data.income_account_name}
                        disabled
                      />
                      <div className="invalid-feedback">
                        Please Enter a Income Account
                      </div>
                    </div>
                    <div className="mb-3">
                      <label
                        className="form-label"
                        htmlFor="product-title-input"
                      >
                        Gain/Loss Account
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="product-title-input"
                        placeholder="Enter account"
                        value={data.gain_account_name}
                        disabled
                      />
                      <div className="invalid-feedback">
                        Please Enter a Gain/Loss Account
                      </div>
                    </div>
                    <div className="mb-3">
                      <label
                        className="form-label"
                        htmlFor="product-title-input"
                      >
                        Price Variance Account
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="product-title-input"
                        placeholder="Enter account"
                        value={data.price_account_name}
                        disabled
                      />
                      <div className="invalid-feedback">
                        Please Enter a Price Variance Account
                      </div>
                    </div>
                    <div className="mb-3">
                      <label
                        className="form-label"
                        htmlFor="product-title-input"
                      >
                        Quantity Variance Account
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="product-title-input"
                        placeholder="Enter account"
                        value={data.qty_account_name}
                        disabled
                      />
                      <div className="invalid-feedback">
                        Please Enter a Quantity Variance Account
                      </div>
                    </div>
                    <div className="mb-3">
                      <label
                        className="form-label"
                        htmlFor="product-title-input"
                      >
                        Exchange Rate Variance Account
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="product-title-input"
                        placeholder="Enter account"
                        value={data.rate_account_name}
                        disabled
                      />
                      <div className="invalid-feedback">
                        Please Enter a Exchange Rate Variance Account
                      </div>
                    </div>
                    <div className="mb-3">
                      <label
                        className="form-label"
                        htmlFor="product-title-input"
                      >
                        WIP Cost Variance Account
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="product-title-input"
                        placeholder="Enter account"
                        value={data.wip_account_name}
                        disabled
                      />
                      <div className="invalid-feedback">
                        Please Enter a WIP Cost Variance Account
                      </div>
                    </div>
                    <div className="mb-3">
                      <label
                        className="form-label"
                        htmlFor="product-title-input"
                      >
                        Scrap Account
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="product-title-input"
                        placeholder="Enter account"
                        value={data.scrap_account_name}
                        disabled
                      />
                      <div className="invalid-feedback">
                        Please Enter a Scrap Account
                      </div>
                    </div>
                    <div className="mb-3">
                      <label
                        className="form-label"
                        htmlFor="product-title-input"
                      >
                        WIP Account
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="product-title-input"
                        placeholder="Enter account"
                        value={data.wip_cost_account_name}
                        disabled
                      />
                      <div className="invalid-feedback">
                        Please Enter a WIP Account
                      </div>
                    </div>
                    <div className="mb-3">
                      <label
                        className="form-label"
                        htmlFor="product-title-input"
                      >
                        Unbuild Variance Account
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="product-title-input"
                        placeholder="Enter account"
                        value={data.unbuild_account_name}
                        disabled
                      />
                      <div className="invalid-feedback">
                        Please Enter a Unbuild Variance Account
                      </div>
                    </div>
                    <div className="mb-3">
                      <label
                        className="form-label"
                        htmlFor="product-title-input"
                      >
                        Adjustment Account CO Product
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="product-title-input"
                        placeholder="Enter account"
                        value={data.adjust_account_name}
                        disabled
                      />
                      <div className="invalid-feedback">
                        Please Enter a Adjustment Account CO Product
                      </div>
                    </div>
                  </div>
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

export default RequestItemDetailsViews;
