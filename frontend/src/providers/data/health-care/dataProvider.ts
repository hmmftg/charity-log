import { DataProvider } from "@refinedev/core";
import { apiClient } from "../../../lib/apiClient";

const API_URL = import.meta.env.VITE_API_URL;

export const healthcareDataProvider = (): DataProvider => ({
  getApiUrl: () => API_URL,

  getList: async ({ resource, pagination, filters, sorters }) => {
    const params: string[] = [];
    const filterParams: string[] = [];

    filters?.forEach((filter) => {
      if ("field" in filter) {
        switch (filter.operator) {
          case "eq":
          case "ne":
          case "gt":
          case "gte":
          case "lt":
          case "lte":
          case "in":
          case "nin":
            filterParams.push(`${filter.field} ${filter.operator} ${filter.value}`);
            break;
          default:
            break;
        }
      }
    });

    sorters?.forEach((sorter) => {
      if ("field" in sorter) {
        params.push(`_sort=${sorter.field}`);
        params.push(`_order=${sorter.order}`);
      }
    });

    const current = pagination?.currentPage ?? 1;
    const pageSize = pagination?.pageSize ?? 10;
    params.push(`_start=${(current - 1) * pageSize}`);
    params.push(`_end=${current * pageSize}`);
    params.push(`_filters=${filterParams.join(" and ")}`);

    const url = `${API_URL}/${resource}/all?${params.join("&")}`;
    const { headers, data } = await apiClient.get(url);

    let total = Number(headers["x-total-count"]);
    if (Number.isNaN(total)) {
      total = Array.isArray(data.result) ? data.result.length : 0;
    }

    return { data: data.result ?? [], total };
  },

  getOne: async ({ resource, id }) => {
    const { data } = await apiClient.get(`${API_URL}/${resource}/${id}`);
    const result = data.result ?? [];
    return { data: Array.isArray(result) ? result[0] : result };
  },

  create: async ({ resource, variables }) => {
    const { data } = await apiClient.post(`${API_URL}/${resource}`, variables);
    return { data: data.result ?? data };
  },

  update: async ({ resource, id, variables }) => {
    const { data } = await apiClient.put(`${API_URL}/${resource}/${id}`, variables);
    return { data: data.result ?? data };
  },

  deleteOne: async ({ resource, id }) => {
    const { data } = await apiClient.delete(`${API_URL}/${resource}/${id}`, {
      data: { id },
    });
    return { data: data.result ?? data };
  },

  custom: async ({ url, method, payload }) => {
    const axiosResponse =
      method === "put" || method === "post" || method === "patch"
        ? await apiClient[method](url, payload)
        : await apiClient.get(url);
    return { data: axiosResponse.data };
  },
});
