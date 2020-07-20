import React from "react";
import { Route } from "react-router";
import { BrowserRouter } from "react-router-dom";
import MathUI from "./pages/MathUI";
import Test from "./pages/Test";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Route exact path="/" component={MathUI} />
        <Route path="/Test" component={Test} />
      </BrowserRouter>
    </div>
  );
}

export default App;
