export type PaginatedResponse<T> = {
    page: number;
    results: T[];
    total_pages: number;
    total_results: number;
};

export type MovieType = {
    adult: boolean;
    backdrop_path?: string;
    director_name: string;
    genres: [
        genre_ids: number,
        genre_name: string
    ];
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    runtime: number;
    status: string;
    tagline: string;
    title: string;
    video: false;
    vote_average: number;
    vote_count: number;
};

export type CastType = {
    adult: boolean;
    gender: number;
    id: number;
    known_for_department: string;
    name: string;
    original_name: string;
    popularity: number;
    profile_path: string;
    cast_id: number;
    character: string;
    credit_id: string;
    order: number;
};

export type GenreType = {
    id: number;
    name: string;
}
