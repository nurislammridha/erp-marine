import React from "react";
import { CircularProgress } from "@material-ui/core";

import { withInfo } from "@storybook/addon-info";

// export default { title: "More/Spinner" };

const CircularSpinner = () => (
  <CircularProgress className="splash-screen-spinner" />
);

const TableComponent = () => {
  <>Welcome</>;
};

export default {
  title: "More/Spinner",
  decorators: [withInfo],
  component: CircularSpinner,
  parameters: {
    info: TableComponent,
  },
};

export const defaultView = () => (
  <CircularSpinner className="splash-screen-spinner" />
);
