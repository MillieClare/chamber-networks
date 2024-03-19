import React, { useState } from "react";

import "./App.css";
import Form from "./Components/Form";
import Table from "./Components/Table";

export default function App() {
  const [reloadTable, setReloadTable] = useState<boolean>(false);
  const handleSubmit = (): void => {
    // This function is called when the form is submitted
    setReloadTable(true);
  };
  return (
    <>
      <Form onSubmit={handleSubmit} />
      <Table
        shouldReload={reloadTable}
        onReload={() => setReloadTable(false)}
      />
    </>
  );
}
