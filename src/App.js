import React from "react";
import { Route } from "react-router";
import { BrowserRouter } from "react-router-dom";
import MathUI from "./pages/MathUI";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Route exact path="/" component={MathUI} />
      </BrowserRouter>
    </div>
  );
}

export default App;
