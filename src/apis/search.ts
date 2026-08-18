export interface Searchparams {
    keyword: string;
    top_n?: number;
    region?: string;
    lang?: string;
}

export interface SearchResult {
    channel_id: string;
    title: string;
    subscriber_count: number;
    view_count: number;
    video_count: number;
    thumbnail_url: string;
    category: string;
    engagement_rate: number;
    estimated_price: string;
}

export const search = async (params: Searchparams): Promise<SearchResult[]> => {
    const { keyword, top_n = 30, region = "KR", lang = "ko" } = params;

    const response = await fetch(`/api/home/search`, {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify({
        keyword,
        top_n,
        region,
        lang,
        }),
    });

    if (!response.ok) {
        const errorText = await response.text();
        let errorMessage = `검색에 실패했습니다 (${response.status})`;

        if (response.status === 422) {
        try {
            const errorData = JSON.parse(errorText);
            if (errorData.detail && Array.isArray(errorData.detail)) {
            const validationErrors = errorData.detail
                .map(
                (err: { loc?: unknown[]; msg?: string }) =>
                    `${Array.isArray(err.loc) ? err.loc.join(".") : "unknown"}: ${
                    err.msg || "validation error"
                    }`
                )
                .join(", ");
            errorMessage = `입력값 검증 오류: ${validationErrors}`;
            } else {
            errorMessage = `입력값 검증 오류: ${errorText}`;
            }
        } catch {
            errorMessage = `입력값 검증 오류: ${errorText}`;
        }
        } else {
        errorMessage = `${errorMessage}: ${errorText}`;
        }

        throw new Error(errorMessage);
    }

    const data: SearchResult[] = await response.json();
    return data;
};

export default search;
