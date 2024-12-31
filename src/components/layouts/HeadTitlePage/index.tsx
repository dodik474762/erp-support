import Head from "next/head";

const HeadTitlePage = ({ titlePage = "NEXT DMS", subTitle = "" }) => {
  return (
    <Head>
      <title>ERP SUPPORT - {subTitle}</title>
    </Head>
  );
};

export default HeadTitlePage;
