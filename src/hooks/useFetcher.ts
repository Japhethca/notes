import useSWR from "swr";

import { fetcher } from "../api-client/client";

type CallBack = () => any;

const useFetcher = (url: string | CallBack) => useSWR(url, fetcher);
export default useFetcher;
