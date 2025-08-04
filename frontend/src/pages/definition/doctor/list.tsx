import React from "react";
import {
  useDataGrid,
  EditButton,
  ShowButton,
  DeleteButton,
  CloneButton,
  List,
} from "@refinedev/mui";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { IResourceComponentsProps, useList } from "@refinedev/core";

export const DoctorList: React.FC<IResourceComponentsProps> = () => {
  const { dataGridProps } = useDataGrid();

  const { data: serverData, isLoading: serverIsLoading } = useList({
    resource: "doctors",
    queryOptions: {
      enabled: !!dataGridProps?.rows,
    },
  });

  const columns = React.useMemo<GridColDef[]>(
    () => [
      {
        field: "id",
        headerName: "Id",
        minWidth: 100,
      },
      {
        field: "name",
        flex: 1,
        headerName: "Name",
        minWidth: 150,
      },
      {
        field: "server",
        flex: 1,
        headerName: "Server",
        minWidth: 150,
        renderCell: function render({ value }) {
          return serverIsLoading ? (
            <>Loading...</>
          ) : (
            serverData?.data?.find((item) => item.id === value)?.name
          );
        },
      },
      {
        field: "scenario",
        flex: 1,
        headerName: "Scenario",
        minWidth: 80,
      },
      {
        field: "actions",
        headerName: "Actions",
        sortable: false,
        renderCell: function render({ row }) {
          return (
            <>
              <EditButton hideText recordItemId={row.id} />
              <ShowButton hideText recordItemId={row.id} />
              <DeleteButton hideText recordItemId={row.id} />
              <CloneButton hideText recordItemId={row.id} />
            </>
          );
        },
        align: "center",
        headerAlign: "center",
        minWidth: 150,
      },
    ],
    [serverData?.data]
  );

  return (
    <List 
    wrapperProps={{
      sx:{}
      }}>
      <DataGrid {...dataGridProps} columns={columns} autoHeight />
    </List>
  );
};
