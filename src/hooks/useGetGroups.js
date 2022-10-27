import useSWR from 'swr'
import axios from 'axios'

const fetcher = async(url) => {
    const res = await axios.get(url);
    return res.data.msg;
}

export default function useGetGroups () {

    const {data, error, mutate} = useSWR(`/api/v1/groups`,fetcher)

    return {
        groups: data,
        isLoadingGroups: (!data && !error),
        isErrorGroups: error,
        mutateGroups: mutate,
    }
}