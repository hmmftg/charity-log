import React, { Component, type ErrorInfo, type ReactNode } from "react";
import { Box, Button, Typography, Paper } from "@mui/material";

type Props = {
  children: ReactNode;
  title?: string;
  requestId?: string;
};

type State = {
  hasError: boolean;
  error: Error | null;
  requestId?: string;
};

export class AppErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("AppErrorBoundary caught:", error, info);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      const lastRequestId =
        this.props.requestId ?? sessionStorage.getItem("last-request-id") ?? undefined;
      return (
        <Box sx={{ p: 3 }}>
          <Paper sx={{ p: 3, maxWidth: 560 }}>
            <Typography variant="h6" gutterBottom>
              {this.props.title ?? "Something went wrong"}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              {this.state.error?.message ?? "An unexpected error occurred."}
            </Typography>
            {lastRequestId && (
              <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 2 }}>
                Request ID: {lastRequestId}
              </Typography>
            )}
            <Button variant="contained" onClick={this.handleRetry}>
              Try again
            </Button>
          </Paper>
        </Box>
      );
    }

    return this.props.children;
  }
}
