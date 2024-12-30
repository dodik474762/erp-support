import Head from "next/head";

const HeadTitlePage = ({ titlePage = "NEXT DMS", subTitle = "" }) => {
  return (
    <Head>
      <title>HR PSYCOTEST - {subTitle}</title>
    </Head>
  );
};

export default HeadTitlePage;
