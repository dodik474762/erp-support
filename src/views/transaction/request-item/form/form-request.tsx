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
import moment from "moment-timezone";
import { useSession } from "next-auth/react";
import FormSalesItem from "./form-sales-item";
import FormModalSalesItems from "./modal/form-modal-sales-item";

const FormRequestItemViews = ({ base_url = "" }) => {
  const router = useRouter();
  const id = router.query.id ?? "";
  const session: any = useSession();

  const Select = dynamic(() => import("react-select"), { ssr: false });
  const classNameModal = "modal-sales-items";

  const [name, setName] = useState(``);
  const [incubationDay, setIncubationDay] = useState(`0`);
  const [remarks, setRemarks] = useState(``);
  const [errors, setErrors]: any = useState({});
  const [loading, setLoading] = useState(false);
  const [department, setDepartment]: any = useState(null);
  const [dataDepartment, setDataDepartment]: any = useState([]);
  const [typeProduct, setTypeProduct]: any = useState(null);
  const [typeProducts, setTypeProducts]: any = useState([]);
  const [primaryUnitType, setPrimaryUnitType]: any = useState([]);
  const [unitType, setUnitType]: any = useState(null);
  const [primaryStockUnitType, setPrimaryStockUnitType]: any = useState([]);
  const [unitStockType, setStockUnitType]: any = useState(null);
  const [primaryPurchaseUnit, setPrimaryPurchaseUnit]: any = useState([]);
  const [unitPurchase, setPurchaseUnit]: any = useState(null);
  const [primarySalesUnit, setPrimarySalesUnit]: any = useState([]);
  const [unitSales, setSalesUnit]: any = useState(null);
  const [subsidiarys, setSubsidiarys]: any = useState([]);
  const [subsidiary, setSubsidiary]: any = useState(null);
  const [volumeTypes, setVolumeTypes]: any = useState([]);
  const [volumeType, setVolumeType]: any = useState(null);
  const [groupTypes, setGroupTypes]: any = useState([]);
  const [groupType, setGroupType]: any = useState(null);
  const [replenismentMethods, setReplenismentMethods]: any = useState([]);
  const [replanishmentMethod, setReplanishmentMethod]: any = useState(null);
  const [costCategorys, setCostCategorys]: any = useState([]);
  const [costCategory, setCostCategory]: any = useState(null);
  const [autoCalculate, setAutoCalculate] = useState(false);
  const [purchasePrice, setPurchasePrice] = useState(0);
  const [planningItemCategorys, setPlanningItemCategorys]: any = useState([]);
  const [planningItemCategory, setPlanningItemCategory]: any = useState(null);
  const [account, setAccount]: any = useState(null);
  const [accounts, setAccounts]: any = useState([]);
  const [salesItems, setSalesItems]: any = useState([]);
  const [typePrices, setTypePrices]: any = useState([]);
  const [taxSchedules, setTaxSchedules]: any = useState([]);
  const [taxSchedule, setTaxSchedule]: any = useState();
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
  const dataSalesItemLines = useRef([]) as any;

  const postData: any = {
    id: id,
    subsidiary: subsidiary,
    typeProduct: typeProduct,
    item_name: name,
    incubationDay: incubationDay,
    departement: department,
    unitType: unitType,
    unitStock: unitStockType,
    unitPurchase: unitPurchase,
    unitSales: unitSales,
    volumeType: volumeType,
    groupType: groupType,
    costCategory: costCategory,
    replanishmentMethod: replanishmentMethod,
    autoCalculate: autoCalculate,
    purchasePrice: purchasePrice,
    planningItemCategory: planningItemCategory,
    remarks: remarks,
    taxSchedule: taxSchedule,
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
    sales_items: dataSalesItemLines.current,
  };

  const fetchData = async () => {
    setLoading(true);
    const req: any = await ApiServices.getDataById(String(id), base_url);
    if (req.is_valid == true) {
      setRemarks(req.data.remarks);
      setName(req.data.item_name);
      setDepartment({
        value: req.data.departemen,
        label: req.data.departemen_name,
      });
      setAccount({ value: req.data.account, label: req.data.account_name });
    }
    setLoading(false);
  };

  const fetchDataDepartment = async () => {
    const authToken = localStorage.getItem("authToken");
    const req = await fetch(
      process.env.API_BASE_URL + "/master/department/getAll",
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );
    const res = await req.json();
    if (res) {
      if (res.is_valid) {
        const val: any = [];
        res.data.map((item: any) => {
          val.push({ value: item.id, label: item.department_name });
        });

        setDataDepartment(val);
      }
    }
  };
  
  const fetchDataProductType = async () => {
    const authToken = localStorage.getItem("authToken");
    const req = await fetch(
      process.env.API_BASE_URL + "/master/product-type/getAll",
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );
    const res = await req.json();
    if (res) {
      if (res.is_valid) {
        const val: any = [];
        res.data.map((item: any) => {
          val.push({ value: item.id, label: item.type });
        });

        setTypeProducts(val);
      }
    }
  };
  
  const fetchDataSubsidiarys = async () => {
    const authToken = localStorage.getItem("authToken");
    const req = await fetch(
      process.env.API_BASE_URL + "/master/subsidiary/getAll",
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );
    const res = await req.json();
    if (res) {
      if (res.is_valid) {
        const val: any = [];
        res.data.map((item: any) => {
          val.push({ value: item.id, label: item.type });
        });

        setSubsidiarys(val);
      }
    }
  };
  
  const fetchDataTaxSchedule = async () => {
    const authToken = localStorage.getItem("authToken");
    const req = await fetch(
      process.env.API_BASE_URL + "/master/tax-schedule/getAll",
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );
    const res = await req.json();
    if (res) {
      if (res.is_valid) {
        const val: any = [];
        res.data.map((item: any) => {
          val.push({ value: item.id, label: item.type });
        });

        setTaxSchedules(val);
      }
    }
  };
  
  const fetchDataPlanningItem = async () => {
    const authToken = localStorage.getItem("authToken");
    const req = await fetch(
      process.env.API_BASE_URL + "/master/planning-item/getAll",
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );
    const res = await req.json();
    if (res) {
      if (res.is_valid) {
        const val: any = [];
        res.data.map((item: any) => {
          val.push({ value: item.id, label: item.type });
        });

        setPlanningItemCategorys(val);
      }
    }
  };
 
  const fetchDataGroupType = async () => {
    const authToken = localStorage.getItem("authToken");
    const req = await fetch(
      process.env.API_BASE_URL + "/master/group-type/getAll",
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );
    const res = await req.json();
    if (res) {
      if (res.is_valid) {
        const val: any = [];
        res.data.map((item: any) => {
          val.push({ value: item.id, label: item.type });
        });

        setGroupTypes(val);
      }
    }
  };
  
  const fetchDataVolumeType = async () => {
    const authToken = localStorage.getItem("authToken");
    const req = await fetch(
      process.env.API_BASE_URL + "/master/volume-type/getAll",
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );
    const res = await req.json();
    if (res) {
      if (res.is_valid) {
        const val: any = [];
        res.data.map((item: any) => {
          val.push({ value: item.id, label: item.type });
        });

        setVolumeTypes(val);
      }
    }
  };
  
  const fetchDataReplanishmentMethod = async () => {
    const authToken = localStorage.getItem("authToken");
    const req = await fetch(
      process.env.API_BASE_URL + "/master/replanishment-method/getAll",
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );
    const res = await req.json();
    if (res) {
      if (res.is_valid) {
        const val: any = [];
        res.data.map((item: any) => {
          val.push({ value: item.id, label: item.type });
        });

        setReplenismentMethods(val);
      }
    }
  };
  
  const fetchDataCostCategory = async () => {
    const authToken = localStorage.getItem("authToken");
    const req = await fetch(
      process.env.API_BASE_URL + "/master/cost-category/getAll",
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );
    const res = await req.json();
    if (res) {
      if (res.is_valid) {
        const val: any = [];
        res.data.map((item: any) => {
          val.push({ value: item.id, label: item.type });
        });

        setCostCategorys(val);
      }
    }
  };
  
  const fetchDataUnit = async () => {
    const authToken = localStorage.getItem("authToken");
    const req = await fetch(
      process.env.API_BASE_URL + "/master/unit/getAll",
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );
    const res = await req.json();
    if (res) {
      if (res.is_valid) {
        const val: any = [];
        res.data.map((item: any) => {
          val.push({ value: item.id, label: item.name });
        });
        setPrimaryUnitType(val);
        setPrimaryStockUnitType(val);
        setPrimaryPurchaseUnit(val);
        setPrimarySalesUnit(val);
      }
    }
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

  const handleRemove = async (id: number) => {
    id = id + 1;
    await setSalesItems(salesItems.filter((item: any) => item.id !== id));
    dataSalesItemLines.current = dataSalesItemLines.current.filter(
      (item: any) => item.id !== id
    );
  };

  const handleSelectionChange = (e: any, type: string) => {
    if (type == "deprtement") {
      dataDepartment.forEach((option: any) => {
        if (option.value === e.value) {
          setDepartment(option);
        }
      });
    }
    if (type == "primary_unit") {
      primaryUnitType.forEach((option: any) => {
        if (option.value === e.value) {
          setUnitType(option);
        }
      });
    }
    if (type == "primary_stock_unit") {
      primaryStockUnitType.forEach((option: any) => {
        if (option.value === e.value) {
          setStockUnitType(option);
        }
      });
    }
    if (type == "primary_purchase_unit") {
      primaryPurchaseUnit.forEach((option: any) => {
        if (option.value === e.value) {
          setPurchaseUnit(option);
        }
      });
    }
    if (type == "primary_sales_unit") {
      primarySalesUnit.forEach((option: any) => {
        if (option.value === e.value) {
          setSalesUnit(option);
        }
      });
    }
    if (type == "subsidiary") {
      subsidiarys.forEach((option: any) => {
        if (option.value === e.value) {
          setSubsidiary(option);
        }
      });
    }
    if (type == "product_type") {
      typeProducts.forEach((option: any) => {
        if (option.value === e.value) {
          setTypeProduct(option);
        }
      });
    }
    if (type == "volume_type") {
      volumeTypes.forEach((option: any) => {
        if (option.value === e.value) {
          setVolumeType(option);
        }
      });
    }
    if (type == "group_type") {
      groupTypes.forEach((option: any) => {
        if (option.value === e.value) {
          setGroupType(option);
        }
      });
    }
    if (type == "replacement") {
      replenismentMethods.forEach((option: any) => {
        if (option.value === e.value) {
          setReplanishmentMethod(option);
        }
      });
    }
    if (type == "cost_category") {
      costCategorys.forEach((option: any) => {
        if (option.value === e.value) {
          setCostCategory(option);
        }
      });
    }
    if (type == "planning_item_category") {
      planningItemCategorys.forEach((option: any) => {
        if (option.value === e.value) {
          setPlanningItemCategory(option);
        }
      });
    }
    if (type == "tax_schedule") {
      taxSchedules.forEach((option: any) => {
        if (option.value === e.value) {
          setTaxSchedule(option);
        }
      });
    }
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

  const handleAddItems = async (e: any, price: any, type: any) => {
    const typePrice = type;
    const result = {
      id: dataSalesItemLines.current.length + 1,
      price: price,
      type: typePrice,
    };

    if (result.price == null || Object.keys(result.price).length == 0) {
      setErrors({ message: "Price Harus Diisi" });
      return;
    }

    await setSalesItems([...salesItems, result]);
    dataSalesItemLines.current.push(result);
  };

  const validation = (data: any): boolean => {
    if (data.name == "") {
      setErrors({ message: "Nama Harus Diisi" });
      return false;
    }

    if (data.remarks == "") {
      setErrors({ message: "Remarks Harus Diisi" });
      return false;
    }

    if (data.departement == null || Object.keys(data.departement).length == 0) {
      setErrors({ message: "Department Harus Diisi" });
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
    fetchDataDepartment();
    fetchDataUnit();
    fetchDataProductType();
    fetchDataGroupType();
    fetchDataVolumeType();
    fetchDataReplanishmentMethod();
    fetchDataCostCategory();
    fetchDataPlanningItem();
    fetchDataSubsidiarys();
    fetchDataTaxSchedule();
    fetchDataAccount();
    if (id) {
      fetchData();
    }
  }, [router.isReady]);

  return (
    <>
      <PageTitle titlePage="Form Request" subTitle="Request Item Add" />

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
                <h5 className="card-title mb-0">Items</h5>
              </div>
              <div className="card-body">
                <div className="mb-3">
                  <label
                    htmlFor="choices-publish-status-input"
                    className="form-label"
                  >
                    Subsidiary
                  </label>
                  <Select
                    defaultValue={subsidiary}
                    onChange={(e: any) =>
                      handleSelectionChange(e, "subsidiary")
                    }
                    options={subsidiarys}
                  />
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="choices-publish-status-input"
                    className="form-label"
                  >
                    Department
                  </label>
                  <Select
                    defaultValue={department}
                    onChange={(e: any) =>
                      handleSelectionChange(e, "deprtement")
                    }
                    options={dataDepartment}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label" htmlFor="product-title-input">
                    Nama
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="product-title-input"
                    placeholder="Enter nama"
                    value={name}
                    onInput={(e: any) => setName(e.target.value)}
                  />
                  <div className="invalid-feedback">Please Enter a nama</div>
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="choices-publish-status-input"
                    className="form-label"
                  >
                    Product Type
                  </label>
                  <Select
                    defaultValue={typeProduct}
                    onChange={(e: any) =>
                      handleSelectionChange(e, "product_type")
                    }
                    options={typeProducts}
                  />
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="choices-publish-status-input"
                    className="form-label"
                  >
                    Primary Unit Type
                  </label>
                  <Select
                    defaultValue={unitType}
                    onChange={(e: any) =>
                      handleSelectionChange(e, "primary_unit")
                    }
                    options={primaryUnitType}
                  />
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="choices-publish-status-input"
                    className="form-label"
                  >
                    Primary Stock Unit
                  </label>
                  <Select
                    defaultValue={unitStockType}
                    onChange={(e: any) =>
                      handleSelectionChange(e, "primary_stock_unit")
                    }
                    options={primaryStockUnitType}
                  />
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="choices-publish-status-input"
                    className="form-label"
                  >
                    Primary Purchase Unit
                  </label>
                  <Select
                    defaultValue={unitPurchase}
                    onChange={(e: any) =>
                      handleSelectionChange(e, "primary_purchase_unit")
                    }
                    options={primaryPurchaseUnit}
                  />
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="choices-publish-status-input"
                    className="form-label"
                  >
                    Primary Sales Unit
                  </label>
                  <Select
                    defaultValue={unitSales}
                    onChange={(e: any) =>
                      handleSelectionChange(e, "primary_sales_unit")
                    }
                    options={primarySalesUnit}
                  />
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="choices-publish-status-input"
                    className="form-label"
                  >
                    Volume Type
                  </label>
                  <Select
                    defaultValue={volumeType}
                    onChange={(e: any) =>
                      handleSelectionChange(e, "volume_type")
                    }
                    options={volumeTypes}
                  />
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="choices-publish-status-input"
                    className="form-label"
                  >
                    Group Type
                  </label>
                  <Select
                    defaultValue={groupType}
                    onChange={(e: any) =>
                      handleSelectionChange(e, "group_type")
                    }
                    options={groupTypes}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label" htmlFor="product-title-input">
                    Incubation Days
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="product-title-input"
                    placeholder="Enter incubation days"
                    value={incubationDay}
                    onInput={(e: any) => setIncubationDay(e.target.value)}
                  />
                  <div className="invalid-feedback">
                    Please Enter a incubation days
                  </div>
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

            <div className="card">
              <div className="card-header">
                <h5 className="card-title mb-0">Inventory Management</h5>
              </div>
              <div className="card-body">
                <div className="mb-3">
                  <label
                    htmlFor="choices-publish-status-input"
                    className="form-label"
                  >
                    Cost Category
                  </label>
                  <Select
                    defaultValue={costCategory}
                    onChange={(e: any) =>
                      handleSelectionChange(e, "cost_category")
                    }
                    options={costCategorys}
                  />
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="choices-publish-status-input"
                    className="form-label"
                  >
                    Replanisment Method
                  </label>
                  <Select
                    defaultValue={replanishmentMethod}
                    onChange={(e: any) =>
                      handleSelectionChange(e, "replacement")
                    }
                    options={replenismentMethods}
                  />
                </div>
                <div className="mb-3">
                  {autoCalculate == true ? (
                    <input
                      type="checkbox"
                      className=""
                      id="product-title-input"
                      checked
                      onChange={(e: any) => setAutoCalculate(e.target.checked)}
                    />
                  ) : (
                    <input
                      type="checkbox"
                      className=""
                      id="product-title-input"
                      onChange={(e: any) => setAutoCalculate(e.target.checked)}
                    />
                  )}{" "}
                  <label className="form-label" htmlFor="product-title-input">
                    Auto Calculate
                  </label>
                </div>
                <div className="mb-3">
                  <label className="form-label" htmlFor="product-title-input">
                    Purchase Price
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="product-title-input"
                    placeholder="Enter purchase price"
                    value={purchasePrice}
                    onInput={(e: any) => setPurchasePrice(e.target.value)}
                  />
                  <div className="invalid-feedback">
                    Please Enter a purchase price
                  </div>
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="choices-publish-status-input"
                    className="form-label"
                  >
                    Planning Item Category
                  </label>
                  <Select
                    defaultValue={planningItemCategory}
                    onChange={(e: any) =>
                      handleSelectionChange(e, "planning_item_category")
                    }
                    options={planningItemCategorys}
                  />
                </div>
              </div>
            </div>

            <div className="card">
              <div className="card-header">
                <h5 className="card-title mb-0">Pricing Item</h5>
              </div>
              <div className="card-body">
                <div className="mb-3">
                  <label
                    htmlFor="choices-publish-status-input"
                    className="form-label"
                  >
                    Tax Schedule
                  </label>
                  <Select
                    defaultValue={taxSchedule}
                    onChange={(e: any) =>
                      handleSelectionChange(e, "tax_schedule")
                    }
                    options={taxSchedules}
                  />
                </div>
              </div>
              <FormSalesItem
                items={salesItems}
                classNameModal={"." + classNameModal}
                handleRemove={handleRemove}
              />
              <FormModalSalesItems
                className={classNameModal}
                handleAddItems={handleAddItems}
                error={errors}
                typePrice={typePrices}
              />
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

          <div className="col-lg-4">
            <div className="card">
              <div className="card-header">
                <h5 className="card-title mb-0">Account</h5>
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
                    defaultValue={cogsAcount}
                    onChange={(e: any) =>
                      handleSelectionChange(e, "cogs_account")
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
                    defaultValue={assetAcount}
                    onChange={(e: any) =>
                      handleSelectionChange(e, "asset_account")
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
                    defaultValue={incomeAcount}
                    onChange={(e: any) =>
                      handleSelectionChange(e, "income_account")
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
                    defaultValue={gainAcount}
                    onChange={(e: any) =>
                      handleSelectionChange(e, "gain_account")
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
                    defaultValue={priceVarianAccount}
                    onChange={(e: any) =>
                      handleSelectionChange(e, "price_variant_account")
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
                    defaultValue={qtyVarianAcount}
                    onChange={(e: any) =>
                      handleSelectionChange(e, "qty_variant_account")
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
                    defaultValue={exhangeAcount}
                    onChange={(e: any) =>
                      handleSelectionChange(e, "exchange_variant_account")
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
                    defaultValue={wipAcount}
                    onChange={(e: any) =>
                      handleSelectionChange(e, "wip_variant_account")
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
                    defaultValue={scrapAcount}
                    onChange={(e: any) =>
                      handleSelectionChange(e, "scrap_account")
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
                    defaultValue={wpAcount}
                    onChange={(e: any) =>
                      handleSelectionChange(e, "wp_account")
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
                    defaultValue={unbuildAcount}
                    onChange={(e: any) =>
                      handleSelectionChange(e, "unbuild_account")
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
                    defaultValue={adjustAcount}
                    onChange={(e: any) =>
                      handleSelectionChange(e, "adjust_account")
                    }
                    options={adjustAccounts}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default FormRequestItemViews;
