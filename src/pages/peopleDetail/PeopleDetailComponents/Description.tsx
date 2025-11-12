import { CiYoutube } from "react-icons/ci";
import { FaInstagram } from "react-icons/fa";

const Description = () => {
        return(
            <>
            <div className="p-8 mb-8 bg-white border border-gray-200 rounded-lg shadow-sm">
            <div className="flex items-start space-x-6">
                {/* 프로필 이미지 */}
                <div className="flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-green-400 to-blue-400">
                <span className="text-2xl font-bold text-white">자</span>
                </div>

                {/* 인플루언서 정보 */}
                <div className="flex-1">
                <h1 className="mb-2 text-2xl font-bold text-gray-900">
                    자연을 향한길: 1헬링크
                </h1>
                <p className="mb-4 text-gray-600">건강/라이프스타일</p>

                {/* 플랫폼 아이콘 */}
                <div className="flex mb-4 space-x-3">
                    <div className="flex items-center justify-center h-10 rounded w-7">
                    <CiYoutube className="text-4xl text-red-500" />
                    </div>
                    <div className="flex items-center justify-center h-10 rounded w-7">
                    <FaInstagram className = "text-2xl text-pink-500"/>
                    </div>
                </div>

                {/* 설명 */}
                <p className="mb-6 text-gray-700">
                    친환경과 지속가능한 라이프스타일을 실천하며, 자연주의 제품과
                    비건 라이프를 소개합니다.
                </p>

                {/* 주요 지표 */}
                <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
                    <div>
                    <p className="text-sm text-gray-600">팔로워/구독자</p>
                    <p className="text-xl font-semibold text-gray-900">368,000</p>
                    </div>
                    <div>
                    <p className="text-sm text-gray-600">평균 조회수</p>
                    <p className="text-xl font-semibold text-gray-900">22,019</p>
                    </div>
                    <div>
                    <p className="text-sm text-gray-600">참여율</p>
                    <p className="text-xl font-semibold text-gray-900">6.8%</p>
                    </div>
                    <div>
                    <p className="text-sm text-gray-600">가격</p>
                    <p className="text-xl font-semibold text-purple-600">
                        ₩2,000,000
                    </p>
                    </div>
                </div>
                </div>
            </div>
            </div>
            </>
        )
}

export default Description;