import React from "react";
import { create } from "react-test-renderer";
import Home from "./Home";
import { BrowserRouter as Router } from 'react-router-dom';

describe("Home component", () => {
  it("shows a list of characters", async () => {
    const component = create(
        <Router>
            <Home />
        </Router>);
    const instance = component.getInstance();
    await instance.componentDidMount();
  });
});
