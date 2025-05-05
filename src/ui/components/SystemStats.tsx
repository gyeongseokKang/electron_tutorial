import { useEffect, useState } from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type StatisticsProps = {
  cpuUsage: number;
  ramUsage: number;
  storageUsage: number;
};

export function SystemStats({
  cpuUsage,
  ramUsage,
  storageUsage,
}: StatisticsProps) {
  const [history, setHistory] = useState<StatisticsProps[]>([]);

  useEffect(() => {
    // 최대 10개의 데이터 포인트만 유지
    setHistory((prev) => {
      const newHistory = [...prev, { cpuUsage, ramUsage, storageUsage }];
      return newHistory.slice(-10);
    });
  }, [cpuUsage, ramUsage, storageUsage]);

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-3 gap-4">
        {/* CPU 게이지 */}
        <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
          <h2 className="text-lg font-semibold mb-2 text-center">CPU 사용량</h2>
          <div className="flex flex-col items-center justify-center h-48">
            <GaugeChart value={cpuUsage} color="#0088FE" />
            <p className="text-2xl font-bold mt-2">{cpuUsage.toFixed(1)}%</p>
          </div>
        </div>

        {/* RAM 게이지 */}
        <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
          <h2 className="text-lg font-semibold mb-2 text-center">RAM 사용량</h2>
          <div className="flex flex-col items-center justify-center h-48">
            <GaugeChart value={ramUsage} color="#00C49F" />
            <p className="text-2xl font-bold mt-2">{ramUsage.toFixed(1)}%</p>
          </div>
        </div>

        {/* 저장소 게이지 */}
        <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
          <h2 className="text-lg font-semibold mb-2 text-center">
            저장소 사용량
          </h2>
          <div className="flex flex-col items-center justify-center h-48">
            <GaugeChart value={storageUsage} color="#FFBB28" />
            <p className="text-2xl font-bold mt-2">
              {storageUsage.toFixed(1)}%
            </p>
          </div>
        </div>
      </div>

      <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
        <h2 className="text-lg font-semibold mb-4">사용량 추이</h2>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={history.map((item, index) => ({ ...item, name: index }))}
              margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="name"
                label={{ value: "시간", position: "insideBottom", offset: -5 }}
              />
              <YAxis
                label={{
                  value: "사용량 (%)",
                  angle: -90,
                  position: "insideLeft",
                }}
                domain={[0, 1]}
              />
              <Tooltip formatter={(value) => `${value}%`} />
              <Legend />
              <Line
                type="monotone"
                dataKey="cpuUsage"
                name="CPU"
                stroke="#0088FE"
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
              <Line
                type="monotone"
                dataKey="ramUsage"
                name="RAM"
                stroke="#00C49F"
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
              <Line
                type="monotone"
                dataKey="storageUsage"
                name="Storage"
                stroke="#FFBB28"
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

type GaugeChartProps = {
  value: number;
  color: string;
};

function GaugeChart({ value, color }: GaugeChartProps) {
  // 값이 너무 작을 경우 최소 크기를 보장
  const displayValue = Math.max(value, 0.5);
  const angle = 180 * (displayValue / 100);

  return (
    <div className="relative w-32 h-16">
      {/* 배경 반원 */}
      <div className="absolute w-full h-full rounded-t-full bg-gray-200 border border-gray-300"></div>

      {/* 값을 나타내는 반원 */}
      <div
        className="absolute bottom-0 left-0 overflow-hidden w-full"
        style={{
          height: "100%",
          clipPath: `polygon(50% 100%, 0 100%, 0 ${100 - angle}%, 50% ${
            100 - angle
          }%, 100% ${100 - angle}%, 100% 100%)`,
        }}
      >
        <div
          className="w-full h-full rounded-t-full"
          style={{ backgroundColor: color }}
        ></div>
      </div>

      {/* 게이지 중앙 표시선 */}
      <div className="absolute top-0 left-1/2 w-0.5 h-1.5 bg-white transform -translate-x-1/2"></div>

      {/* 눈금 표시 */}
      <div className="absolute bottom-0 w-full flex justify-between px-2">
        <span className="text-xs">0%</span>
        <span className="text-xs">50%</span>
        <span className="text-xs">100%</span>
      </div>
    </div>
  );
}
