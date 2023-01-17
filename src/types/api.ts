interface Params {
  id: number;
}

interface UpdateBookBodyDto {
  name?: string;
  author?: string;
}

interface BookResponse {
  id: number;
  name: string;
  author: string;
}

