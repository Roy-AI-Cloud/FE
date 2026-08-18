// 공통 타입 정의

export interface EstimateData {
  score: number;
  estimated_views: number;
  estimated_engagement: number;
  estimated_cost: string | number;
}

export interface BrandMatchDetails {
  brand_category?: string;
  analysis_method: string;
  image_similarity: number;
  text_compatibility: number;
}

export interface BrandMatchData {
  score: number;
  details: BrandMatchDetails;
}

export interface WeightsUsed {
  [key: string]: number;
}

export interface TotalScoreData {
  total_score: number;
  recommendation: string;
  weights_used: WeightsUsed;
}

export interface TooltipPayload {
  name: string;
  value: number;
}
