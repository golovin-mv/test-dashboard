import React from "react";
import runSocket from "./socket";
import SimpleReactRouter from "simple-react-router";
import EntitiesContainer from "./containers/EntitiesContainer.jsx";
import EntityContainer from './containers/EntityContainer';
runSocket();

const NotFound = () => <h1>404! Not found</h1>;

export default class Router extends SimpleReactRouter {
  routes(map) {
    map("/", EntitiesContainer);
    map("/entity", EntityContainer);
    map("/:path*", NotFound);
  }
};