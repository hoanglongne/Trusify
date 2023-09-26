import "regenerator-runtime/runtime";
import React from "react";
import LeftPane from "../components/LeftPane";
import RightPane from "../components/RightPane";
import Layout from "../components/Layout";
import '../index.css'
import AddProductButton from "../components/AddProductButton";

export default function Home({wallet, contract}) {
  return (
    <div>
      <Layout wallet={wallet}>
        <div className="w-[98vw] h-screen flex justify-center items-center pt-[125px] p-28">
          <div className="h-full w-full">
            <LeftPane />
          </div>
          <div className="h-full w-full">
            <RightPane/>
          </div>
          <AddProductButton/>
        </div>
      </Layout>
    </div>
  );
}