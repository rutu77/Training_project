export interface CourseCatalogQuery {
  page: number;
  limit: number;
  search: string;
}

function parsePositiveInteger(value: unknown, field: string, fallback: number): number {
  if (value === undefined) return fallback;
  if (
    typeof value !== "string" ||
    !/^[1-9]\d*$/.test(value) ||
    !Number.isSafeInteger(Number(value))
  ) {
    throw new Error(`${field} must be a positive integer`);
  }
  return Number(value);
}

export function parseCourseCatalogQuery(query: {
  page?: unknown;
  limit?: unknown;
  search?: unknown;
}): CourseCatalogQuery {
  const page = parsePositiveInteger(query.page, "page", 1);
  const limit = parsePositiveInteger(query.limit, "limit", 20);
  if (limit > 50) {
    throw new Error("limit must be 50 or less");
  }
  if (!Number.isSafeInteger((page - 1) * limit)) {
    throw new Error("page and limit produce an unsupported offset");
  }
  if (
    query.search !== undefined &&
    (typeof query.search !== "string" || query.search.length > 100)
  ) {
    throw new Error("search must be text of 100 characters or fewer");
  }

  return {
    page,
    limit,
    search: typeof query.search === "string" ? query.search.trim() : "",
  };
}
