export interface CompareChannelsPayload {
  project_id: string;
  channel_ids: string[];
}

export const compareChannels = async (
  payload: CompareChannelsPayload
): Promise<string> => {
  if (!payload.project_id || payload.channel_ids.length === 0) {
    throw new Error("프로젝트 ID와 채널 ID 리스트가 필요합니다.");
  }

  const response = await fetch("/api/compare/channels", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `채널 비교 분석에 실패했습니다 (${response.status}): ${errorText}`
    );
  }

  return response.text();
};

export default compareChannels;


