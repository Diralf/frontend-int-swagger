interface Params {
    id: number;
}

interface UpdateBookBody {
    name?: string;
    author?: string;
}

interface BookResponse {
    id: number;
    name: string;
    author: string;
}

