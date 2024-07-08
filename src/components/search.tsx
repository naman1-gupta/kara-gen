import {DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, Input, Skeleton} from "@/components/ui";
import {useRef} from "react";

export default function Search(props: {
    value: string,
    onChange: (e) => void,
    open: boolean,
    onFocusOutside: () => void,
    data: any[] | {} | undefined,
    element: (item) => JSX.Element
}) {
    const inputRef = useRef(null);
    return <div className="input flex flex-row">
        <div className="flex-1 w-1 flex flex-col mr-4">
            <Input ref={inputRef} placeholder={"Enter URL"} type={"url"} value={props.value}
                   onChange={props.onChange}/>
            {
                <DropdownMenu open={props.open}>
                    <DropdownMenuTrigger className={"hidden opacity-0"}>Open</DropdownMenuTrigger>
                    <DropdownMenuContent
                        align="start"
                        side="bottom"
                        sideOffset={5}
                        style={{
                            width: inputRef.current ? `${inputRef.current.offsetWidth}px` : 'auto',
                            position: 'absolute',
                            left: inputRef.current?.getBoundingClientRect().left  + 'px',
                            top: (inputRef.current?.getBoundingClientRect().bottom + window.scrollY + 5) + 'px'
                        }}
                        onEscapeKeyDown={props.onFocusOutside}>
                        {
                            (props.data && props.data.length > 0) ? props.data.map(props.element) :
                                <div className={"flex flex-row p-4"}>
                                    <Skeleton className="h-12 w-12 rounded-full mr-2"/>
                                    <div className="w-full space-y-2">
                                        <Skeleton className="h-4"/>
                                        <Skeleton className="h-4 w-4/5"/>
                                    </div>
                                </div>
                        }
                    </DropdownMenuContent>
                </DropdownMenu>
            }
        </div>

    </div>;
}