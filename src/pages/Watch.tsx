import {useSearchParams} from "react-router-dom";

export default function WatchPage() {
    const [searchParams, setParams] = useSearchParams();
    // console.log(searchParams)
    return <div>watch {searchParams.toString()}</div>
}