import axios from "axios";
import { DataProvider, HttpError } from "@refinedev/core";

// Error handling with axios interceptors
export const axiosInstance = axios.create();

// Add a request interceptor
axiosInstance.interceptors.request.use(
  function (config) {
    config.headers.set("Authorization", `Bearer ${localStorage.getItem("token")}`);
    config.headers.set("Request-Id", `simulator-${new Date().getTime()}`);
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const customError: HttpError = {
      ...error,
      message: error.response?.data?.errors[0].description,
      statusCode: error.response?.data?.errors[0].code,
    };

    return Promise.reject(customError);
  }
);

const API_URL = import.meta.env.VITE_API_URL;

export const dataProvider = (): DataProvider => ({
  // ...
  getApiUrl: () => API_URL,
  // ...
  getList: async ({ resource, pagination, filters, sorters }) => {
    const params: string[] = [];
    const filterParams: string[] = [];
    if (filters) {
      filters.map((filter) => {
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
              filterParams.push(
                `${filter.field} ${filter.operator} ${filter.value}`
              );
              break;

            default:
              break;
          }
        }
      });
    }
    if (sorters) {
      sorters.map((sorter) => {
        if ("field" in sorter) {
          params.push(`_sort=${sorter.field}`);
          params.push(`_order=${sorter.order}`);
        } else {
          // Handle your conditional filters here
          // console.log(typeof filter); // ConditionalFilter
        }
      });
    }
    // pagination is optional, so we need give default values if it is undefined.
    const { current = 1, pageSize = 10 } = pagination ?? {};
    params.push(`_start=${(current - 1) * pageSize}`);
    params.push(`_end=${current * pageSize}`);
    params.push(`_filters=${filterParams.join(" and ")}`);

    // combine all params with "&" character to create query string.
    const query = params.join("&");

    const url = `${API_URL}/${resource}/all?${query}`;

    const { headers, data } = await axiosInstance.get(url);

    //console.log("headers", headers, "total", headers["x-total-count"]);

    let total = Number(headers["x-total-count"]);
    if (isNaN(total)) {
      total = data.result.length;
    }

    return {
      data: data.result,
      total,
    };
  },
  // ...
  getOne: async ({ resource, id }) => {
    const url = `${API_URL}/${resource}/${id}`;

    const { data } = await axiosInstance.get(url);

    return {
      data: data.result[0],
    };
  },
  // ...
  create: async ({ resource, variables }) => {
    const url = `${API_URL}/${resource}`;

    const { data } = await axiosInstance.post(url, variables);

    return {
      data,
    };
  },
  // ...
  update: async ({ resource, id, variables }) => {
    const url = `${API_URL}/${resource}/${id}`;

    const { data } = await axiosInstance.put(url, variables);

    return {
      data,
    };
  },
  // ...
  deleteOne: async ({ resource, id }) => {
    const url = `${API_URL}/${resource}/${id}`;

    const { data } = await axiosInstance.delete(url, {
      data: { id },
    });

    return {
      data,
    };
  },
  // ...
  custom: async ({ url, method, payload }) => {
    let axiosResponse;
    switch (method) {
      case "put":
      case "post":
      case "patch":
        axiosResponse = await axiosInstance[method](url, payload);
        break;
      default:
        axiosResponse = await axiosInstance.get(url);
        break;
    }

    const { data } = axiosResponse;

    return { data };
  },
});
