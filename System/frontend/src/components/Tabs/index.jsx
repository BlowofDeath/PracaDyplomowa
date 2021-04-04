import React from "react";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import css from "./Tabs.module.css";

export const CustomTab = (props) => {
  return (
    <Tab {...props} className={css.tab}>
      {props.children}
    </Tab>
  );
};

export const CustomTabs = (props) => {
  return (
    <Tabs {...props} className={css.tabs}>
      {props.children}
    </Tabs>
  );
};

CustomTabs.Tab = CustomTab;

export default CustomTabs;
