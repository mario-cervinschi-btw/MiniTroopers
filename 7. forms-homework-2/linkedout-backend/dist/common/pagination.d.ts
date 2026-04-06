export interface PaginationMeta {
    totalItems: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
}
export interface PaginatedResponse<T> {
    data: T[];
    pagination: PaginationMeta;
}
export declare function paginate<T>(items: T[], total: number, page: number, limit: number): PaginatedResponse<T>;
