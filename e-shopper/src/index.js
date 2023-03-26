import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { StateProvider } from "./components/Context/StateProvider";
import { FilterContextProvider } from "./components/ProductList/filter_context";
import { AppProvider } from "./components/ProductList/productcontext";

import reducer, { initialState } from "./reducers/reducer";

ReactDOM.render(
  <React.StrictMode>
    <StateProvider initialState={initialState} reducer={reducer}>
      <AppProvider>
        <FilterContextProvider>
          <App />
        </FilterContextProvider>
      </AppProvider>
    </StateProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
