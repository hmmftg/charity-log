import { useShow, IResourceComponentsProps, useOne } from "@refinedev/core";
import { Show, TextFieldComponent as TextField } from "@refinedev/mui";
import { Typography, Stack } from "@mui/material";

export const PatientShow: React.FC<IResourceComponentsProps> = () => {
  const { queryResult } = useShow();
  const { data, isLoading } = queryResult;

  const record = data?.data;

  const { data: serverData, isLoading: serverIsLoading } = useOne({
    resource: "servers",
    id: record?.server || "",
    queryOptions: {
      enabled: !!record,
    },
  });

  const { data: scenarioData, isLoading: scenarioIsLoading } = useOne({
    resource: "resp-scenario-groups",
    id: record?.scenario || "",
    queryOptions: {
      enabled: !!record,
    },
  });

  return (
    <Show isLoading={isLoading}>
      <Stack gap={1}>
        <Typography variant="body1" fontWeight="bold">
          Id
        </Typography>
        <TextField value={record?.id} />
        <Typography variant="body1" fontWeight="bold">
          Name
        </Typography>
        <TextField value={record?.name} />
        <Typography variant="body1" fontWeight="bold">
          Server
        </Typography>

        {serverIsLoading ? <>Loading...</> : <>{serverData?.data?.name}</>}
        <Typography variant="body1" fontWeight="bold">
          Scenario
        </Typography>
        {scenarioIsLoading ? <>Loading...</> : <>{scenarioData?.data?.name}</>}
      </Stack>
    </Show>
  );
};
