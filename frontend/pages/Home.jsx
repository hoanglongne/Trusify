import React from "react";
import LeftPane from "../components/LeftPane";
import RightPane from "../components/RightPane";
import Layout from "../components/Layout";
import '../index.css'
import AddProductButton from "../components/AddProductButton";

export default function Home({wallet, contract}) {
  return (
      <Layout wallet={wallet}>
        <div className="w-full md:w-[98vw] min-h-screen flex flex-col md:flex-row justify-center items-center pt-[125px] md:pt-0 p-8 md:px-14 lg:px-28">
          <div className="h-full w-full md:w-1/2">
            <LeftPane />
          </div>
          <div className="h-full w-full md:w-1/2">
            <RightPane/>
          </div>
          <AddProductButton/>
        </div>
      </Layout>
  );
}