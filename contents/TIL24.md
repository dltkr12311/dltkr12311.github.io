---
date: '2021-12-03'
title: 'storyBook 설치 및 실행'
categories: ['TIL']
summary: '비즈니스 로직과 컨텍스트로부터 UI 컴포넌트를 독립적으로 분리하여 만들 수 있도록` 도와준다고 나와 있다'
thumbnail: './images/TIL6.png'
---

## What is storyBook?

- 다양한 방식으로 사용되고 있는 UI 컴포넌트 도구이다. 공식 홈페이지에서는 `비즈니스 로직과 컨텍스트로부터 UI 컴포넌트를 독립적으로 분리하여 만들 수 있도록` 도와준다고 나와 있다.

## Why is storyBook?

- 개발하다 보면 특정 UI 컴포넌트에 여러 상태 의존성과 환경변수가 걸려있고 그 상황 가운데서 온전히 뷰에 집중하지 못하고 컴포넌트에 의존성을 파악하기가 쉽지 않다. `storyBook`은 이러한 문제를 해결할 수 있도록 도와준다. 여러 상태의 의존성과 환경을 분리시켜 독립적으로 상태를 표현하는 게 가능하고 온전히 뷰에만 집중할 수 있게 되고 테스트도 가능하며 즉 외부 환경들을 신경 쓰지 않고 UI 컴포넌트에 집중해서 개발을 진행할 수 있다.

## Start

CRA(Create React App)를 통해 프로젝트 생성 _//[공식 홈페이지](https://storybook.js.org/tutorials/intro-to-storybook/react/ko/get-started/) 참고해서 예제 작성함_

```jsx
// cra 프로젝트 생성
npx create-react-app (프로젝트 이름)
// 해당 프로젝트 디렉토리 이동
cd (프로젝트 이름)
// storybook cli 설치
npx -p @stroybook/cli sb init

```

테스트 명령어를 입력해서 확인할 수 있다.

```jsx
yarn test --watchAll
// 테스트 성공 실패 여부를 확인할 수 있다.
```

### _오류_

나 같은 경우 테스트 명령어를 입력하면 이러한 오류가 나왔다.

```jsx
There might be a problem with the project dependency tree.
It is likely not a bug in Create React App, but something you need to fix locally.

The react-scripts package provided by Create React App requires a dependency:

  "babel-loader": "8.1.0"

Don't try to install it manually: your package manager does it automatically.
However, a different version of babel-loader was detected higher up in the tree:

  /Users/leesak/Desktop/test-app/node_modules/babel-loader (version: 8.2.3)

```

- `babel-loader` 버전이 달라서 생기는 오류인데 `yarn.lock` 및 `package.json` 파일을 지우고 다시 실행해봐도 실행되지 않는다. 내가 해결한 방법은 두 가지가 있는데
  - 첫 번째로 `yarn add babel-loader@8.1.0` 해 버전을 맞춰서 설치 하니깐 정상적으로 실행 된다.
  - 두 번째로 프로젝트 디렉토리에 `.env` 파일을 만들어서 `SKIP_PREFLIGHT_CHECK=true` 를 넣어주면 정상적으로 실행 된다.
- 이렇게 된다면 테스트가 잘 작동 하는것이다.

!<img width="401" alt="1" src="https://user-images.githubusercontent.com/60437099/144621285-804970cd-ec41-4856-a402-6c90d976df82.png">

storyBook을 실행시키면 아래와 같이 실행된다.

```jsx
yarn storybook
// $ start-storybook -p 6006 -s public
// storybook 화면이 실행된다.
```

<img width="978" alt="2" src="https://user-images.githubusercontent.com/60437099/144621377-812acf86-8b8c-4116-8d69-950bda1d1cc7.png">
>

### TaskBox 만들기

**공식 홈페이지에 나와있는걸 참고해서 만든다.**

- [여기서 css 코드](https://github.com/chromaui/learnstorybook-code/blob/master/src/index.css)를 복사해서 `src/index.css` 파일에 붙여넣기 한다.

**Asset 추가하기**

- 예제의 의도된 디자인에 맞춰 설치한다. (폰트, 아이콘)
- 아래와 같이 실행하면 자동으로 `src/asstes/(폴더)` 가 생성된다.

```jsx
npx degit chromaui/learnstorybook-code/src/assets/font src/assets/font
npx degit chromaui/learnstorybook-code/src/assets/icon src/assets/icon
```
