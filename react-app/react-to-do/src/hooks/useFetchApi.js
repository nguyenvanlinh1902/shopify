import React, {useEffect, useState} from "react";
import '../component/App.css'

function useFetchApi({
                         url
                     }) {
    const [data, setData] = useState([]),
        [loading, setLoading] = useState(false),
        [fetched, setFetched] = useState(false);

    async function fetchData() {
        try {
            setLoading(true);
            const resp = await fetch(url);
            const respData = await resp .json();
            setData(respData);
            setLoading(false);
            setFetched(true)
        } catch (e) {
            console.log(e)
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);
    return {
        data,
        setData,
        loading,
        fetched
    }
}
export default useFetchApi;