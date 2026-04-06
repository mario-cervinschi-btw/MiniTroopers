"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paginate = paginate;
function paginate(items, total, page, limit) {
    return {
        data: items,
        pagination: {
            totalItems: total,
            itemsPerPage: limit,
            totalPages: Math.ceil(total / limit),
            currentPage: page,
        },
    };
}
//# sourceMappingURL=pagination.js.map