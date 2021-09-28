---
date: '2021-09-28'
title: 'IL21 | RN (Xcode build failure)'
categories: ['TIL']
summary: '이번에 리액트 네이티브  빌드 하면서 오류가 발생하였다.  몇 시간동안 삽질을 하면서 오류를 해결하였고 나중에 똑같은 원인으로 에러가 났을때 잊지 않기 위해서 기록한다.'
thumbnail: './images/TIL6.png'
---

### 오류

- 리액트 네이티브를 빌드하고 실행하려고 하는데 이러한 오류가 났다. 분명 어제까지만 해도 잘되었는데 아이러니 했다. 에러가 나면 터미널창 맨 마지막 부분에 실패한 빌드를 보여준다. project에 똑같은 이름의 project가 있어서 오류가 난 것인지 의심을 하고 해당 경로로 들어가서 지웠지만 여전히 동일한 오류가 났다.
  **(나는 이 부분에만 확인하고 해결하려고 하여서 몇 시간을 삽질했던것 같다 )**

<img width="1029" alt="스크린샷 2021-09-27 오후 5 36 07" src="https://user-images.githubusercontent.com/60437099/135091459-6c286d25-20dd-4683-bd51-aacdcc5ce02b.png">

- 터미널창에서 다시 한번 확인 하였다 그런데 `Undefined symbols for architecture x86_64` 이라는 의심스러운 부분을 발견하였다. 그래서 바로 구글링을 하였고 [스택오버플로우](https://stackoverflow.com/questions/18408531/xcode-build-failure-undefined-symbols-for-architecture-x86-64)에서 답을 찾을수 있었다.
  <img width="1173" alt="스크린샷 2021-09-27 오후 9 29 33" src="https://user-images.githubusercontent.com/60437099/135091535-6aaf1de0-22d0-452a-b9a3-68b172c0816d.png">

### 해결방법

- xCode를 실행하면 왼쪽 상단에 자신의 프로젝트가 있다 프로젝트를 클릭하면
- 중간 화면에 해당 프로젝트 정보들이 보이고 `Build Phases` 탭을 클릭한다.
- `Link Binary With Libraries` 를 클린한 후 플러스 버튼을 누른 후 나의 오류 같은 경우 `swiftDataDetetion` 이 원이 있었고 목록에서 `swiftDataDetetion` 을 검색해서 추가 하였다 다시 빌드 하여 실행하였더니 정상적으로 잘 되었다.
