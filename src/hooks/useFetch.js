import useSWR from "swr"
import axios from "axios"

const fetcher = async url => {
  const res = await axios.get(url)
  return res.data.msg
}

export default function useFetch(searchValue = "") {
  const { data, error, mutate } = useSWR(`/api/v1/${searchValue}`, fetcher)

  return {
    data,
    isLoading: !data && !error,
    isError: error,
    mutate,
  }
}
