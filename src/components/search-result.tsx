import {DropdownMenuItem} from "@/components/ui";

export default function SearchResult(props: { item: any }) {
    return (

        <DropdownMenuItem
            className="rounded-md p-2 transition-colors duration-700 hover:bg-gray-500 cursor-pointer"
        >

            <img src={props.item?.snippet?.thumbnails.default.url}
                 alt={props.item?.snippet?.title}
                 className="w-16 h-12 mr-2"/>
            <span className={"dark:text-stone-100"}>{props.item.snippet.title}</span>

        </DropdownMenuItem>
    )
}
