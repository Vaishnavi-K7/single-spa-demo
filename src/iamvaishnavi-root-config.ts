import { registerApplication, start } from "single-spa";
import {
  constructApplications,
  constructRoutes,
  constructLayoutEngine,
} from "single-spa-layout";
import microfrontendLayout from "./microfrontend-layout.html";

function constructSPA() {
  const data = {
    loaders: {
      appLoader: "<div/>",
    },
    props: {}
  };
  const routes = constructRoutes(microfrontendLayout, data);
  const applications = constructApplications({
    routes,
    loadApp({ name }) {
      return System.import(name);
    },
  });
  const layoutEngine = constructLayoutEngine({ routes, applications });
  applications.forEach(registerApplication);
  layoutEngine.activate();
}

constructSPA();
start();