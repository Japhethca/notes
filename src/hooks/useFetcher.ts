import useSWR from "swr";

import { fetcher } from "../api-client/client";

type CallBack = () => any;

export default (url: string | CallBack) => useSWR(url, fetcher);
