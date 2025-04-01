import React from "react";
import Content from "../../ui/Content";
import Main from "../../ui/Main";
import { Outlet } from "react-router-dom";

export default function Categories() {
  return (
    <Main>
      <Content>
        <div className="overflow-x-auto">

        </div>
        <Outlet/>
      </Content>
    </Main>
  );
}
