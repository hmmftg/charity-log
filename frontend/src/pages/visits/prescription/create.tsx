import { Create, useAutocomplete } from "@refinedev/mui";
import { Box, TextField, Autocomplete } from "@mui/material";
import { useForm } from "@refinedev/react-hook-form";
import { IResourceComponentsProps } from "@refinedev/core";
import { Controller } from "react-hook-form";

export const PrescriptionCreate: React.FC<IResourceComponentsProps> = () => {
  const {
    saveButtonProps,
    refineCore: { formLoading },
    register,
    control,
    formState: { errors },
  } = useForm();

  const { autocompleteProps: serverAutocompleteProps } = useAutocomplete({
    resource: "servers",
  });

  const { autocompleteProps: scenarioAutocompleteProps } = useAutocomplete({
    resource: "resp-scenario-groups",
  });

  return (
    <Create isLoading={formLoading} saveButtonProps={saveButtonProps}>
      <Box
        component="form"
        sx={{ display: "flex", flexDirection: "column" }}
        autoComplete="off"
      >
        <TextField
          {...register("id", {
            required: "This field is required",
          })}
          error={!!(errors as any)?.id}
          helperText={(errors as any)?.id?.message}
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
          type="text"
          label="ID"
          name="id"
        />
        <TextField
          {...register("name", {
            required: "This field is required",
          })}
          error={!!(errors as any)?.name}
          helperText={(errors as any)?.name?.message}
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
          type="text"
          label="Name"
          name="name"
        />
        <Controller
          control={control}
          name="server"
          rules={{ required: "This field is required" }}
          // eslint-disable-next-line
          defaultValue={null as any}
          render={({ field }) => (
            <Autocomplete
              {...serverAutocompleteProps}
              {...field}
              onChange={(_, value) => {
                field.onChange(value?.id ?? value);
              }}
              getOptionLabel={(item) => {
                return (
                  serverAutocompleteProps?.options?.find(
                    (p) => p?.id?.toString() === (item?.id ?? item)?.toString()
                  )?.name ?? ""
                );
              }}
              isOptionEqualToValue={(option, value) =>
                value === undefined ||
                option?.id?.toString() === (value?.id ?? value)?.toString()
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Server"
                  margin="normal"
                  variant="outlined"
                  error={!!(errors as any)?.server}
                  helperText={(errors as any)?.server?.message}
                  required
                />
              )}
            />
          )}
        />
        <Controller
          control={control}
          name="scenario"
          rules={{ required: "This field is required" }}
          // eslint-disable-next-line
          defaultValue={null as any}
          render={({ field }) => (
            <Autocomplete
              {...scenarioAutocompleteProps}
              {...field}
              onChange={(_, value) => {
                field.onChange(value?.id ?? value);
              }}
              getOptionLabel={(item) => {
                return (
                  scenarioAutocompleteProps?.options?.find(
                    (p) => p?.id?.toString() === (item?.id ?? item)?.toString()
                  )?.name ?? ""
                );
              }}
              isOptionEqualToValue={(option, value) =>
                value === undefined ||
                option?.id?.toString() === (value?.id ?? value)?.toString()
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Scenario"
                  margin="normal"
                  variant="outlined"
                  error={!!(errors as any)?.scenario}
                  helperText={(errors as any)?.scenario?.message}
                  required
                />
              )}
            />
          )}
        />
      </Box>
    </Create>
  );
};
