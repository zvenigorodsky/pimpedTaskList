import useSWR from 'swr'
import axios from 'axios'

const fetcher = async(url) => {
    const res = await axios.get(url);
    return res.data.msg;
}

export default function useGetTasks (searchValue = '') {

    const {data, error, mutate} = useSWR(`/api/v1/tasks/${searchValue}`,fetcher)

    return {
        tasks: data,
        isLoading: (!data && !error),
        isError: error,
        mutate,
    }
}