// API 응답이 "string"으로 되어 있지만, 실제로는 객체일 가능성이 높습니다
// 실제 API 응답을 확인 후 타입을 수정하세요
export type YoutuberProfile = string | Record<string, unknown>;

export const getYoutuberProfile = async (
    channelId: string
    ): Promise<YoutuberProfile> => {
    const apiUrl = `/api/youtuber/${channelId}/profile`;

    try {
        const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        });

        if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
            `유튜버 프로필을 불러올 수 없습니다 (${response.status}): ${errorText}`
        );
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("유튜버 프로필 API 호출 실패:", error);
        if (error instanceof Error) {
        if (
            error.message.includes("Failed to fetch") ||
            error.message.includes("ERR_CONNECTION")
        ) {
            throw new Error(
            "백엔드 서버에 연결할 수 없습니다. 서버가 실행 중인지 확인하세요. (http://localhost:8000)"
            );
        }
        throw error;
        }
        throw new Error("유튜버 프로필을 불러오는 중 오류가 발생했습니다");
    }
};
