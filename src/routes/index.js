import React from "react";
import CoreLayout from "../common/layouts/CoreLayout";
import Discover from "./Discover";
import Login from "./Login";

const code = new URLSearchParams(window.location.search).get("code");

export default function Routes() {
  // Here you'd return an array of routes
  return code ? (
    <CoreLayout>
      <Discover code={code} />
    </CoreLayout>
  ) : (
    <Login />
  );
}
