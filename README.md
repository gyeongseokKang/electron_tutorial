# Electron POC 시스템

이 레포지토리는 Electron의 최소 기능을 증명하는 POC(Proof of Concept)입니다. React와 TypeScript를 사용하여 CPU, RAM, 저장소 사용량을 실시간으로 모니터링하고 시각화하는 데스크톱 애플리케이션을 구현합니다.

![image](https://github.com/user-attachments/assets/4b03419e-204e-4ca3-99d3-82953be8aec0)

![image](https://github.com/user-attachments/assets/7d62e814-3623-4fa6-8886-5465e72fc9d2)

## 주요 검증 내역

- **IPC의 타입 안전한 통신**: Electron과 React 간의 안전한 데이터 교환을 보장
- **일렉트론과 React 앱의 통합**: 두 기술 스택 간의 원활한 상호작용 구현
- **크로스 플랫폼 지원**: Windows, macOS, Linux에서 동일하게 실행 가능
- **트레이 및 Dock 같은 데스크탑 기능 지원**: 사용자 편의성을 위한 다양한 데스크탑 기능 제공
- **리액트 최소 기능 구현**: CPU, RAM, 저장소 사용량을 실시간으로 모니터링하고 시각화

## 기술 스택

- **Electron**: 크로스 플랫폼 데스크톱 애플리케이션 개발
- **React**: 사용자 인터페이스 구현
- **TypeScript**: 타입 안정성 확보
- **Recharts**: 데이터 시각화
- **Tailwind CSS**: UI 스타일링

## 설치 및 실행 방법

### 개발 환경 설정

```bash
# 저장소 클론
git clone https://github.com/gyeongseokKang/electron_tutorial.git
cd electron_tutorial

# 의존성 설치
yarn install

# 개발 모드 실행
yarn dev

# 애플리케이션 빌드
yarn dist:mac    # macOS용 빌드
yarn dist:win    # Windows용 빌드
yarn dist:linux  # Linux용 빌드
```

## 프로젝트 구조

```
electron_tutorial/
├── dist-electron/    # 컴파일된 Electron 메인 프로세스 코드
├── dist/             # 컴파일된 React 애플리케이션
├── src/
│   ├── electron/     # Electron 메인 및 프리로드 스크립트
│   │   ├── main.ts   # 메인 프로세스 코드
│   │   └── preload.cts # 프리로드 스크립트
│   └── ui/           # React 애플리케이션 코드
│       ├── components/ # React 컴포넌트
│       │   └── SystemStats.tsx # 시스템 통계 컴포넌트
│       ├── App.tsx   # 메인 React 컴포넌트
│       └── ...
├── types.d.ts        # 전역 타입 정의
├── package.json
└── ...
```

## 구현된 차트 컴포넌트

### 1. 게이지 차트

- 반원형 UI로 현재 사용량을 직관적으로 표시
- 0%, 50%, 100% 눈금 제공
- 값이 매우 작을 경우에도 시각적으로 인식 가능하도록 최소 표시 보장

### 2. 사용량 추이 차트

- 최근 10개의 데이터 포인트 기록
- 꺾은선 그래프로 시간에 따른 변화 표시
- CPU, RAM, 저장소 사용량을 서로 다른 색상으로 구분

## 라이선스

MIT
