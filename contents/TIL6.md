---
date: '2021-07-31'
title: 'TIL06 | Netlify를 이용해 간단하게 배포하기'
categories: ['TIL', 'Netflify']
summary: '오늘은 과제 제출 하는 날이다. 이번 과제는 배포까지 해서 제출해야 한다. '
thumbnail: './images/TIL.png'
---

## 배포

오늘은 과제 제출 하는 날이다. 이번 과제는 배포까지 해서 제출해야 한다. 뭐로 배포할지 이야기를 나누었는데 세 가지 방법이 나왔다.

1. Netflify를 통해 배포
2. Github Page를 통해 배포
3. AWS s3를 통해 배포

결론적으로 Netflify를 통해 배포하기로 했다. GithubPage도 간단하게 배포 할 수 있지만 사용해봤고 s3로 배포하기에는 조금 헤비한 느낌이여서 한번도 사용해보지 않았고 간단하고 빠르게 배포 할 수 있는 Netflify를 사용하기로 했다.

배포한 방법을 공유해 보려 한다.
사이트는 여기로 들어오면 된다. [click this!](https://www.netlify.com/)
오른쪽 상단에 로그인과 회원가입 버튼이 있다 `sign up` 버튼을 클릭해서 들어가면 이런화면이 나온다. 나는 git으로 회원가입을 진행하였다.
<img width="1445" alt="1" src="https://user-images.githubusercontent.com/60437099/127744570-8dfb2d9c-7f93-44e6-807c-792460111c9d.png">
회원가입 후 간단하게 정보를 적는다. 작성하는 것은 크게 어렵지 않다.
<img width="954" alt="2" src="https://user-images.githubusercontent.com/60437099/127744619-5f263d59-b819-4ef7-8291-0369f133f12c.png">
회원가입 후 로긍인 하면 이런 화면이 나온다.
<img width="1335" alt="3" src="https://user-images.githubusercontent.com/60437099/127744681-78afe4fc-e9ff-4e1c-8e37-eaa3854e8c0a.png">
나는 이번 프로젝트 레파지토리가 내 레파지토리가 아니고 팀원 분 레파지도리여서 접근 할 수 없기에 로컬에서 진행했다. 먼저 많이 사용하는 git을 통해 파일을 배포하는 법을 보려고 한다. 여기서 `New Site From Git`을 누른다 그럼 이런 화면이 보인다.
<img width="1325" alt="4" src="https://user-images.githubusercontent.com/60437099/127744768-e916b0d6-e219-49f1-b819-39486597b58c.png">
여기서 `github`을 누르면 개인 레파지토리 정보들이 나오고 본인이 배포하려는 레파지토리를 선택하면 알아서 `build`해서 `deploy`해준다. 조금만 기다리면 사이트 생성되고 주소로 클릭하면 배포된걸 확인 할 수 있다.
나는 이번에 다르게 배포하였다 위에 말한 바와 같이 내가 접근 할 수 없기때문에 그리고 큰 프로젝트가 아니라 부분 기능 구현하는 작은 프로젝트이고 한번만 배포하면 되기때문에 이 방법을 선택했다.
로컬로 배포하려면 자기가 작업중이 에디터로 들어가서 `yarn build` 명령어를 입력하고 빌드한다. 아 빌드 하기전에 public(CRA로 작업 기준) 폴더안에 `_redirects`파일을 만들고 `/* /index.html 200` 이렇게 작성해준다. 모든 라우트 index파일 상태 200을 보내는? 역할을 한다. 이 파일을 안만들고 배포한다면 새로고침이나 다른 페이지로 이동시 404에러가 난다 꼭 같이 넣자. 이렇게 빌드하고 빌드한 폴더를 압축한다 압축파일을 위에 사진 나온 페이지에서 드래그 해서 넣으면 배포가 자동으로 되고 주소가 만들어진다. 해당 주소로 들어가면 잘 들어간걸 볼 수 있다.
<img width="1297" alt="스크린샷 2021-08-01 오전 12 42 42" src="https://user-images.githubusercontent.com/60437099/127745157-9d0d0048-29a4-4bde-921b-2f6b31a6f7d2.png">
