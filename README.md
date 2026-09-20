# 교보문고 고객 대상 신용대출 서비스 — Web Presentation

PowerPoint 19장을 이미지 기반의 반응형 웹 프레젠테이션으로 구성한 GitHub Pages용 정적 사이트입니다.

## 특징
- PPT 디자인을 그대로 유지하는 16:9 슬라이드 이미지 방식
- 세로 스크롤 / 마우스 휠 이동
- 키보드 `← →`, `↑ ↓`, `PageUp/PageDown`, `Home/End` 지원
- 모바일 스와이프 지원
- 현재 슬라이드 번호 및 상단 진행률 표시
- 전체화면 버튼 지원
- URL 해시로 특정 슬라이드 직접 열기 (`#5` 등)

## GitHub Pages 배포
1. GitHub에서 새 repository를 만듭니다. 예: `kyobo-loan`
2. 이 폴더 안의 파일과 `slides` 폴더를 repository 최상단에 업로드합니다.
3. GitHub repository의 **Settings → Pages**로 이동합니다.
4. **Build and deployment → Source**를 `Deploy from a branch`로 선택합니다.
5. Branch를 `main`, Folder를 `/(root)`로 선택하고 Save합니다.
6. 잠시 후 `https://사용자명.github.io/kyobo-loan/` 형태의 주소로 접속할 수 있습니다.

## 로컬에서 확인
터미널에서 이 폴더로 이동한 뒤 아래 명령을 실행합니다.

```bash
python -m http.server 8000
```

브라우저에서 `http://localhost:8000`으로 접속합니다.

## 파일 구조
```text
.
├── index.html
├── style.css
├── script.js
├── .nojekyll
└── slides/
    ├── slide01.webp
    ├── ...
    └── slide19.webp
```

## 공개 범위 주의
Public repository에서 GitHub Pages를 사용하면 슬라이드 이미지와 웹 파일을 누구나 열람할 수 있습니다. 외부 공개가 곤란한 내용이 있다면 업로드 전에 확인하세요.
