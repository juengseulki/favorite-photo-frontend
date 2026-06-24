# 💫 최애의 포토 (Favorite Photo) - Frontend

> 사용자가 직접 디지털 포토카드를 생성하고  
> 구매·판매·교환을 통해 컬렉션을 관리할 수 있는 포토카드 거래 플랫폼

<br />

## 📌 프로젝트 소개

**최애의 포토**는 팬 문화 속 포토카드 수집과 거래 경험을 디지털 환경으로 확장한 서비스입니다.

사용자는 자신만의 포토카드를 생성하고,
마켓플레이스를 통해 다른 사용자와 포토카드를 구매·판매·교환할 수 있습니다.

본 프로젝트는 단순 CRUD 구현이 아닌,

- 사용자 인증 상태 관리
- 카드 소유권 기반 거래 흐름
- 검색 / 필터 / 정렬
- 반응형 UI
- 서버 상태 관리
- 실제 배포 환경 대응

을 고려하여 실제 서비스 구조에 가깝게 구현하는 것을 목표로 진행했습니다.

<br />

---

# 👥 Team

**Codeit FullStack 1팀**

| 이름   | 담당                                                           |
| ------ | -------------------------------------------------------------- |
| 정슬기 | PM, 초기 구조 설계, 공통 컴포넌트, 랜딩, 마켓 상세, 알림, 배포 |
| 전강민 | 인증, 로그인, 회원가입, OAuth, 인증 상태 관리                  |
| 박소정 | 마이갤러리, 포토카드 생성, 랜덤 포인트, 알림 UI                |
| 김종찬 | 교환 UI, 교환 플로우                                           |
| 이준영 | 마켓플레이스                                                   |
| 김나린 | 나의 판매 포토카드, 판매 연동                                  |

<br />

---

# 🛠 Tech Stack

## Core

![Next.js](https://img.shields.io/badge/Next.js-black)
![React](https://img.shields.io/badge/React-61DAFB)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E)

## Styling

- Tailwind CSS
- Responsive Web Design

## State Management

- TanStack Query (React Query)
- Context API

## Network

- Axios
- Axios Interceptor

## Deploy

- Vercel

<br />

---

# 📂 Folder Structure

```bash
src
├── app                 # Next.js App Router
│
├── components
│   └── common          # 공통 UI 컴포넌트
│
├── features            # 기능 단위 모듈
│   ├── auth
│   ├── market
│   ├── exchange
│   └── ...
│
├── hooks               # 공통 hooks
│
├── lib
│   ├── api             # API 요청 관리
│   ├── constants       # 상수 관리
│   └── utils
│
└── providers           # 전역 Provider
```

<br />

---

# ✨ 주요 기능

## 🔐 인증 시스템

- 이메일 로그인 / 회원가입
- Google / Kakao / Naver OAuth 로그인
- JWT 기반 인증

구조

```
Access Token
→ Memory 관리

Refresh Token
→ HttpOnly Cookie 저장
```

Axios Interceptor 적용

- 요청 시 AccessToken 자동 첨부
- 401 발생 시 refresh 요청
- refresh queue 처리로 중복 요청 방지

<br />

---

## 🃏 포토카드 생성

- 이미지 업로드
- 등급 / 장르 / 가격 / 수량 설정
- 생성 가능 횟수 제한
- 생성 후 마이갤러리 반영

<br />

---

## 🏪 마켓플레이스

지원 기능

- 검색
- 등급 필터
- 장르 필터
- 판매 상태 필터
- 가격 정렬
- 최신순 정렬

React Query 기반 데이터 관리

```js
MARKET.LIST(filters);
```

조건별 Query Key 관리로 캐싱 최적화

<br />

---

## 📱 페이지네이션 전략

환경별 UX 적용

Desktop / Tablet

```
Pagination
```

Mobile

```
Infinite Scroll
```

Intersection Observer 기반 무한 스크롤 구현

<br />

---

## 💳 구매 시스템

구매 흐름

```
구매 요청
 ↓
성공 응답
 ↓
React Query invalidate
 ↓
화면 데이터 갱신
```

구매 결과 Modal UI 제공

<br />

---

## 🔄 교환 시스템

교환 Flow

```
카드 선택
 ↓
교환 메시지 작성
 ↓
교환 요청
 ↓
승인 / 거절
 ↓
상태 반영
```

Modal 단계 분리

- 카드 선택 모달
- 교환 작성 모달
- 결과 모달

<br />

---

## 🔔 알림

지원 이벤트

- 구매 완료
- 교환 요청
- 교환 승인
- 교환 거절

읽음 상태 관리

<br />

---

## 🎁 랜덤 포인트

- 로그인 사용자 대상 랜덤 지급
- 쿨타임 표시
- 포인트 결과 모달 제공

<br />

---

# 🧩 공통 컴포넌트 설계

재사용 가능한 UI 관리

```
Button
Modal
Input
Dropdown
Pagination
PhotoCard
GradeBadge
```

장점

- 디자인 일관성 유지
- 중복 코드 제거
- 유지보수 개선

<br />

---

# 🚨 Troubleshooting

## 1. 인증 복구 중 API 무한 호출 문제

### 문제

새로고침 시

```
POST /auth/refresh
GET /auth/me
```

요청 반복 발생

### 원인

AuthProvider 세션 복구 전  
하위 컴포넌트 API 요청 실행

### 해결

```js
if (isLoading || !user) return;
```

인증 완료 이후 요청하도록 수정

### 결과

- refresh 중복 제거
- 불필요한 API 호출 감소

---

## 2. 대용량 데이터 조회 성능 개선

### 문제

대량 데이터 테스트 시

```
/market/cards
10초 이상 지연
```

### 원인

페이지 요청마다 count 계산

### 해결

- cursor 요청 count 제거
- 필요한 시점에만 API 호출

### 결과

마켓 조회 속도 개선

---

# 🚀 Deploy

Frontend

```
Vercel
```

<br />

# 💬 회고

이번 프로젝트에서는 단순 화면 구현을 넘어  
인증 흐름, 서버 상태 관리, 성능 개선, 사용자 경험까지 고려하며  
실제 서비스 개발 과정에 가까운 경험을 할 수 있었습니다.
