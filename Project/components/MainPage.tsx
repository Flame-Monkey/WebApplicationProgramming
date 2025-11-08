import { Card } from './ui/card';
import { Button } from './ui/button';
import { Cat, Dog, Map, Calendar, FileText, Activity, ArrowRight } from 'lucide-react';
import { monthlyMissions } from '../data/mockData';

interface MainPageProps {
  onNavigate: (page: string) => void;
}

export function MainPage({ onNavigate }: MainPageProps) {
  const completedCount = monthlyMissions.missions.filter((m) => m.completed).length;
  const totalCount = monthlyMissions.missions.length;

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-4 py-8">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Cat className="w-16 h-16 text-orange-500" />
        </div>
        <h1 className="text-orange-500">냥코대전쟁 API</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          냥코대전쟁의 모든 데이터를 API로 제공합니다. 아군, 적, 스테이지 정보를 확인하고 월간 미션을 관리하세요.
        </p>
      </div>

      {/* Main Categories - 4 Cards */}
      <div className="grid gap-6 md:grid-cols-4">
        <Card 
          className="p-6 hover:shadow-lg transition-shadow cursor-pointer group"
          onClick={() => onNavigate('allies')}
        >
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center group-hover:bg-blue-200 transition-colors">
              <Cat className="w-8 h-8 text-blue-600" />
            </div>
            <div>
              <h3 className="text-blue-600 mb-2">아군 캐릭터</h3>
              <p className="text-gray-600">냥코대전쟁의 모든 아군 캐릭터 정보</p>
            </div>
            <Button className="w-full gap-2 bg-blue-600 hover:bg-blue-700">
              보러가기
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </Card>

        <Card 
          className="p-6 hover:shadow-lg transition-shadow cursor-pointer group"
          onClick={() => onNavigate('enemies')}
        >
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center group-hover:bg-red-200 transition-colors">
              <Dog className="w-8 h-8 text-red-600" />
            </div>
            <div>
              <h3 className="text-red-600 mb-2">적 캐릭터</h3>
              <p className="text-gray-600">강력한 보스와 적 캐릭터 정보</p>
            </div>
            <Button className="w-full gap-2 bg-red-600 hover:bg-red-700">
              보러가기
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </Card>

        <Card 
          className="p-6 hover:shadow-lg transition-shadow cursor-pointer group"
          onClick={() => onNavigate('stages')}
        >
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center group-hover:bg-green-200 transition-colors">
              <Map className="w-8 h-8 text-green-600" />
            </div>
            <div>
              <h3 className="text-green-600 mb-2">스테이지</h3>
              <p className="text-gray-600">모든 스테이지와 난이도 정보</p>
            </div>
            <Button className="w-full gap-2 bg-green-600 hover:bg-green-700">
              보러가기
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </Card>

        <Card 
          className="p-6 hover:shadow-lg transition-shadow cursor-pointer group"
          onClick={() => onNavigate('missions')}
        >
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center group-hover:bg-indigo-200 transition-colors">
              <Calendar className="w-8 h-8 text-indigo-600" />
            </div>
            <div>
              <h3 className="text-indigo-600 mb-2">월간 미션</h3>
              <p className="text-gray-600">월간 미션 도우미</p>
            </div>
            <Button className="w-full gap-2 bg-indigo-600 hover:bg-indigo-700">
              보러가기
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </Card>
      </div>

      {/* API Docs & Health - 2 Cards */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card 
          className="p-6 hover:shadow-lg transition-shadow cursor-pointer group border-2 border-blue-200"
          onClick={() => onNavigate('docs')}
        >
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center group-hover:bg-blue-200 transition-colors flex-shrink-0">
              <FileText className="w-8 h-8 text-blue-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-blue-600 mb-2">API 문서</h3>
              <p className="text-gray-600 mb-4">
                API 사용 가이드와 엔드포인트 정보
              </p>
              <Button className="gap-2 bg-blue-600 hover:bg-blue-700">
                문서 보기
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </Card>

        <Card 
          className="p-6 hover:shadow-lg transition-shadow cursor-pointer group border-2 border-green-200"
          onClick={() => onNavigate('health')}
        >
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center group-hover:bg-green-200 transition-colors flex-shrink-0">
              <Activity className="w-8 h-8 text-green-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-green-600 mb-2">Health Check</h3>
              <p className="text-gray-600 mb-4">
                시스템 상태 및 성능 모니터링
              </p>
              <Button className="gap-2 bg-green-600 hover:bg-green-700">
                상태 확인
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
