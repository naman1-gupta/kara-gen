import '../styles/App.css'
import {useQuery} from '@tanstack/react-query';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import axios, {AxiosError} from 'axios';
import debounce from 'debounce';
import {useState, useCallback} from "react";
import Search from '@/components/search';
import SearchResult from "@/components/search-result.tsx";

import mockData from '../data/list.json';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
    Button,
    DialogClose
} from "@/components/ui";
import {useNavigate} from "react-router-dom";


function App() {
    const [searchTerm, setSearchTerm] = useState('');
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [videoDetails, setVideoDetails] = useState({});
    const navigate = useNavigate()

    // Create a memoized debounced function
    const debouncedSearch = useCallback(
        debounce((value: string) => {
            setDebouncedSearchTerm(value);
            setIsDropdownOpen(!!value);
        }, 300),
        []
    );

    const handleInputChange = (e) => {
        setSearchTerm(e.target.value);
        debouncedSearch(e.target.value);
    };

    const {videoData, isVideoDataLoading, err} = useQuery({
        queryKey: ['youtubeSearch', videoDetails],
        queryFn: async () => {
            if (!debouncedSearchTerm) return [];
            // const response = await axios.get(`https://www.googleapis.com/youtube/v3/search`, {
            //     params: {
            //         part: 'snippet',
            //         q: debouncedSearchTerm,
            //         type: 'video',
            //         maxResults: 5,
            //         key: 'AIzaSyCh5DO0NIolnTwNch6enoZC772ILZOfDeg',
            //     },
            // });
            // return response.data.items;
            return mockData.items;

        },
        enabled: !!debouncedSearchTerm,
        retry: (_, error: AxiosError) => {
            if (error?.response?.statusCode !== 403)
                return false
            return true
        }
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const {data, isLoading, error} = useQuery({
        queryKey: ['youtubeSearch', debouncedSearchTerm],
        queryFn: async () => {
            // if (!debouncedSearchTerm) return [];
            // const response = await axios.get(`https://www.googleapis.com/youtube/v3/search`, {
            //     params: {
            //         part: 'snippet',
            //         q: debouncedSearchTerm,
            //         type: 'video',
            //         maxResults: 5,
            //         key: '',
            //     },
            // });
            // return response.data.items;
            return mockData.items;

        },
        enabled: !!debouncedSearchTerm,
        retry: (_, error: AxiosError) => {
            if (error?.response?.statusCode !== 403)
                return false
            return true
        }
    });


    return (
        <>
            <h1>Karagen</h1>
            <Search value={searchTerm}
                    onChange={handleInputChange}
                    open={isDropdownOpen}
                    onFocusOutside={() => {
                        setIsDropdownOpen(false)
                    }}
                    data={data}
                    element={(item) => (
                        <Dialog>
                            <DialogTrigger className={'w-full bg-inherit p-0'}>
                                <SearchResult key={item.id.videoId} item={item}/>
                            </DialogTrigger>
                            <DialogContent style={{width: '50rem', maxWidth: '80rem'}}>
                                <DialogHeader>
                                    <DialogTitle>Are you sure you want to process this video?</DialogTitle>
                                </DialogHeader>
                                <div className={"flex flex-1"}>
                                    <div className={"max-w-fit"}>
                                        <img src={item.snippet.thumbnails.medium.url}
                                             alt={item.snippet.title}
                                        />
                                    </div>

                                    <div className={"flex-1 flex flex-col ml-4"}>
                                        <DialogTitle className={"text-2xl"}>{item.snippet.title}</DialogTitle>
                                        <h3 className={"mb-4"}>{item.snippet.channelTitle}</h3>
                                        <DialogDescription>
                                            {item.snippet.description}
                                        </DialogDescription>
                                    </div>
                                </div>

                                <DialogFooter>
                                    <DialogClose asChild>
                                        <Button type="submit"
                                                onClick={() => navigate(`watch?v=${item.id.videoId}`)}>Proceed</Button>
                                    </DialogClose>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>

                    )}
            />
        </>
    )
}

export default App
