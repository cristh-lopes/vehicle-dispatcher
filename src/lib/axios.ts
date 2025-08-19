import axios, { AxiosError } from 'axios';

const api = axios.create();

export async function makeRequest({
  url,
  method,
  data,
  headers,
  params,
}: {
  url: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  data?: object;
  headers?: object;
  params?: object;
}) {
  try {
    const response = await api.request({
      url,
      method,
      params,
      headers,
      data,
    });

    return response;
  } catch (err) {
    const error = err as AxiosError;

    if (error.response) {
      return { status: error.response.status, data: error.response.data };
    }

    return { status: 500, data: { message: error.message } };
  }
}
