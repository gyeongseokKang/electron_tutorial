import { useEffect, useState } from "react";
import "./App.css";
import { SystemStats } from "./components/SystemStats";

function App() {
  const [stats, setStats] = useState<{
    cpuUsage: number;
    ramUsage: number;
    storageUsage: number;
  }>({
    cpuUsage: 0,
    ramUsage: 0,
    storageUsage: 0,
  });

  useEffect(() => {
    const unsub = window.electron.subscribeStatistics((stats) => {
      setStats(stats);
    });
    return () => unsub();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">시스템 모니터링</h1>

      <SystemStats
        cpuUsage={stats.cpuUsage}
        ramUsage={stats.ramUsage}
        storageUsage={stats.storageUsage}
      />

      <div className="mt-8 p-4 border rounded-lg">
        <h2 className="text-lg font-semibold mb-2">상세 정보</h2>
        <div className="grid grid-cols-3 gap-4">
          <div className="p-3 bg-blue-50 rounded-md">
            <p className="font-medium">CPU 사용량</p>
            <p className="text-xl">{stats.cpuUsage.toFixed(1)}%</p>
          </div>
          <div className="p-3 bg-green-50 rounded-md">
            <p className="font-medium">RAM 사용량</p>
            <p className="text-xl">{stats.ramUsage.toFixed(1)}%</p>
          </div>
          <div className="p-3 bg-yellow-50 rounded-md">
            <p className="font-medium">저장소 사용량</p>
            <p className="text-xl">{stats.storageUsage.toFixed(1)}%</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
