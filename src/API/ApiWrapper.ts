import axios from "axios";
import MockAdapter from "axios-mock-adapter";

export const apiProvider = axios.create({});
export const apiMockInstance = new MockAdapter(apiProvider, { delayResponse: 5000 });
