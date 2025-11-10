import FeatureCard from "@/app/featureCard";

export interface Feature {
    title: string;
    description: string;
    href: string;
    buttonText: string;
    fullWidth?: boolean;
    icon?: string;
}

interface FeatureGridProps {
    features: Feature[]; // Feature 배열

}

export default function FeatureGrid() {
    return (
        <div className="grid gap-6 md:grid-cols-4">
            <FeatureCard
                icon="cat"
                title="아군 캐릭터"
                description="아군 캐릭터 도감"
                href="allies"
                buttonText="아군 캐릭터 목록 확인"
                color="blue"
                width={1}
            />
            <FeatureCard
                icon="dog"
                title="적 캐릭터"
                description="적 캐릭터 도감"
                href="enemies"
                buttonText="적 캐릭터 목록 확인"
                color="red"
                width={1}
            />
            <FeatureCard
                icon="map"
                title="스테이지"
                description="스테이지 정보"
                href="stages"
                buttonText="스테이지 정보 확인"
                color="green"
                width={1}
            />
            <FeatureCard
                icon="calendar"
                title="월간미션"
                description="미션도우미"
                href="mission"
                buttonText="미션 수행하기"
                color="cyan"
                width={1}
            />
            <FeatureCard
                icon="file"
                title="API 문서"
                description="API 사용 가이드와 엔드포인트 정보"
                href="docs"
                buttonText="문서 보기"
                color="blue"
                width={2}
            />
            <FeatureCard
                icon="activity"
                title="Health Check"
                description="시스템 상태 및 성능 모니터링"
                href="health"
                buttonText="상태 확인"
                color="blue"
                width={2}
            />
        </div>
    );
}