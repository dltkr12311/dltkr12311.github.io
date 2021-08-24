---
date: '2021-08-24'
title: 'TIL20 | 타입스크립트 CRA'
categories: ['TIL']
summary: '새롭게 과제가 진행되었고 이번에는 타입스크립트를 사용해야 한다. 과제를 시작하기전 나름 기본 개념들을 공부하고 다른 코드를 까보면서 어떻게 사용했는지 보았지만, 프로젝트를 설치 하고 오류가 나기 시작하면서 삽질을 시작하게 되었다. '
thumbnail: './images/TIL5.png'
---

## 들어가기 전

새롭게 과제가 진행되었고 이번에는 타입스크립트를 사용해야 한다. 과제를 시작하기전 나름 기본 개념들을 공부하고 다른 코드를 까보면서 어떻게 사용했는지 보았지만, 프로젝트를 설치 하고 오류가 나기 시작하면서 삽질을 시작하게 되었다.역시 실제로 구현해보는게 뼈가 되고 살이 되는것 같다. 어떻게 설치했고 세팅 했는지 복습해보려고 한다.

## 설치

터미널에서 `npx create-react-app [프로젝트 이름] --template typescrip` 명령어를 입력하면 타입스크립트 CRA가 생성된다.

설치가 완료 되었으면 해당 디렉토리로 이동 후 코드를 실행하고 `src` 폴더를 펼치면 아래와 같이 되어있다 여기서 필요없는 것들을 지워주고 `npm start` 실행 하면 이제 모든 준비가 끝난다.

<img width="282" alt="스크린샷 2021-08-25 오전 11112 45 27" src="https://user-images.githubusercontent.com/60437099/130655422-99a6b2fe-ca42-4ab6-84df-7e02337b3b3a.png">

### ESLint & Prettier

ESLint & Prettier를 따로 설치하였는데 [여기서!!](https://velog.io/@_jouz_ryul/CRA%EB%A1%9C-typescript-%EA%B0%9C%EB%B0%9C%ED%99%98%EA%B2%BD-%EC%84%A4%EC%A0%95%ED%95%98%EA%B8%B0) 참고하였다.

타입스크립트에서 해당 라이브러리를 설치 하고 실행하려면 `npm i 라이브러리` 와 `@typescript-라이브러리...` 를 설치 해야한다.

eslint는 블로그를 똑같이 참고 하였고 `.prettierrc.js` 설정은 조금 수정하였다.

```tsx
module.exports = {
  semi: true,
  trailingComma: 'all',
  singleQuote: true,
  printWidth: 80,
  tabWidth: 2, //국룰
};
```

## 실행

컴포넌트 구성을 하고 파일을 만들고 평소처럼 react 코드 작성하듯이 하였는데 빨간 밑줄이 생기면서 오류가 발생하였다. 그 순간부터 타입스크립트 세계에 왔다는 걸 체감할 수 있었다.(`Hello TypeScript Word`) 처음에는 잘못한 게 없는데 "왜 오류가 날까?" 생각했지만 vs code는 친절하게 해당 오류에 커서를 갖다 대면 어떤 오류인지 친절하게 알려준다. 타입을 지정하지 않아서 생기는 오류였다.

부모 컴포넌트로 TodoList가 있고 자식 컴포넌트 TodoList Item있다. json형식에 더미 데이터를 만들고 부모 컴포넌트 TodoLIst에서 map함수를 통해 자식 컴포넌트를 출력하고 데이터는 props로 넘겨주었다. 여기서 첫번째 오류가 났는데 타입 지정을 하지 않아서 생기는 오류였고 타입 지정을 하였다(여기서 작은 해프닝이 있었는데 타입을 어디에 넣어야 하는지 몰라서 매개변수 안에 넣어 보기도 하고, 매개 변수 바로 밖에서 넣어보기도 하였다^^;;)작성 후 props로 데이터를 넘겨서 자식 컴포넌트에서 출력하기 위한 데이터를 작성하였는데 오류가 난다. 넘겨진 props에 타입을 지정하였는데도 오류가 났다 알고보니 넘겨진 타입이 `TodoItemProps` 에 넘겨야 했다.이렇게 하고나니 정상적으로 실행이 되었다.

```tsx
export interface Todo {
  id: number;
  taskName: string;
  status: string;
  creator: string;
  createdAt: string;
  updatedAt: string;
}

interface TodoItemProps {
  item: Todo;
}

const TodoItem: React.FC<TodoItemProps> = ({ item }) => {
  const { taskName, creator } = item;
  return (
    <Wrapper>
      <p>{taskName}</p>
      <p>{creator}</p>
    </Wrapper>
  );
};
```

## 마무리하면서

다른 사람들이 보기에는 너무나 쉬어 보이지만 타입스크립트를 처음 접해본 나에게는 어려운 일이었다 설치하고, 실행하고, 타입을 생성하고 어디에 적용해야 하는지 아직도 헷갈린다….^^ 타입스크립트와 깊이 친해질 필요가 있는 것 같다. 이제 프로젝트가 시작이지만 이번 기회에 많은 삽질을 하면서 많이 배우자! 더욱 찐 프론트엔드 개발자의 길로 가는 느낌 아닌 느낌이다. 열심히 하자
