export interface EstimateParams {
    project_id: string;
    channel_id: string;
}

export interface EstimateResponse {
    score: number;
    estimated_views: number;
    estimated_engagement: number;
    estimated_cost: string;
    cpm: number;
}

export const estimate = async (params: EstimateParams): Promise<EstimateResponse> => {
    const {project_id, channel_id} = params;

    const response = await fetch(
        `/api/analysis/roi-estimate/${project_id}/${channel_id}`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        }
    );

    if(!response.ok){
        const errorText = await response.text();
        let errorMessage = `추정 결과를 불러올 수 없습니다 (${response.status})`;
        
        try {
            const errorData = JSON.parse(errorText);
            errorMessage = errorData.detail || errorText;
        } catch {
            errorMessage = errorText;
        }

        throw new Error(`추정 오류: ${errorMessage}`);
    }

    const data: EstimateResponse = await response.json();
    return data;
};

export default estimate;