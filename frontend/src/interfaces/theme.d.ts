import "@refinedev/mui";

export interface CustomTheme {
  appBar: {
    color: string;
    gradient: string;
  };
  timeLine: {
    color: {
      pending: string;
      request: string;
      timeout: string;
      failed: string;
      successfull: string;
    };
    dotColor: {
      pending: string;
      request: string;
      timeout: string;
      failed: string;
      successfull: string;
    };
  };
}

declare module "@mui/material/styles" {
  interface Theme extends import("@mui/material/styles").Theme, CustomTheme {}
  interface ThemeOptions
    extends import("@mui/material/styles").ThemeOptions,
      CustomTheme {}
}
