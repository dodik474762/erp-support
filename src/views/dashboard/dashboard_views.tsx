import PageTitle from "@/components/layouts/PageTitle";
import dynamic from "next/dynamic";

const DashboardViews = () => {
  const DashboardChart = dynamic(() => import("./chart/dashboard_basic_chart_views"), {
    ssr: false
  })

  return (
    <>
      <PageTitle titlePage="Dashboard" subTitle="Overview" />

      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title mb-0">Basic Column Charts</h4>
            </div>

            <div className="card-body">
              <div className="apex-charts">
                <DashboardChart />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardViews;
