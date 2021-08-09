---
date: '2021-08-09'
title: 'TIL11 | 클린 코드'
categories: ['TIL']
summary: '오늘 세션에서 리액트에서 좋은 코드란? 주제로 진행이 되었다. 세션에서 나온 개념들과 자바스크립트 클린코드를 참고하여서 정리해 보았다.'
thumbnail: './images/TIL3.png'
---

## **들어가기전**

오늘 세션에서 **리액트에서 좋은 코드란?** 주제로 진행이 되었다. 세션에서 나온 개념들과 [자바스크립트 클린코드](https://github.com/qkraudghgh/clean-code-javascript-ko)를 참고하여서 정리해 보았다.

## 변수(Variables)

### **의미있는 변수명 사용하기**

**bad:**

```jsx
const info = {
	name: "John Mayer",
	age: "44",
	job: "singer songwriter"

```

**good:**

```jsx
const user = {
  name: 'John Mayer',
  age: '44',
  job: 'singer songwriter',
};
```

위와 같이 info라는 변수명을 사용해도 의미가 조금은 들어갔지만 가독성이 좋지 않다. user라는 변수명을 사용하면 가독성이 더 좋아 보인다.

### **자신만 알아보 수 있는 작명을 피하자**

**bad:**

```jsx
const brands = ['나이키', '아디다스', '루이비통', '꼼데가르송'];
brands.forEach(a => {
  console.log(a);
});
```

**good:**

```jsx
const brands = ['나이키', '아디다스', '루이비통', '꼼데가르송'];
brands.forEach(brand => {
  console.log(brand);
});
```

위와 같이 a라고 자기가 알아보는 변수명을 사용하지 말고 누구나 알 수 있는 변수명으로 사용하자

## 함수(Function)

### **함수 인자는 2개이 이하가 이상적이다.**

- 2개 이상의 인자를 가진 함수를 사용한다면 그 함수에게 너무 많은 역할을 만든 것이다. 그렇지 않다면 대부분 상위 객체는 1개만으로 충분하다.
- 많아지더라도 객체로 처리한 다음 구조 분해 할당으로 가져오면 좋다.

### **함수는 하나의 기능만 해야한다.**

- 함수가 1개 이상의 행동을 한다면 작성, 테스트 및 이해하는게 어려워 진다.

### **함수는 단일 행동을 추상화 해야한다.**

**bad:**

```jsx
function parseBetterJSAlternative(code) {
  const REGEXES = [
    // ...
  ];

  const statements = code.split(' ');
  const tokens = [];
  REGEXES.forEach(REGEX => {
    statements.forEach(statement => {
      // ...
    });
  });

  const ast = [];
  tokens.forEach(token => {
    // lex...
  });

  ast.forEach(node => {
    // parse...
  });
}
```

**good:**

```jsx
function tokenize(code) {
  const REGEXES = [
    // ...
  ];

  const statements = code.split(' ');
  const tokens = [];
  REGEXES.forEach(REGEX => {
    statements.forEach(statement => {
      tokens.push(/* ... */);
    });
  });

  return tokens;
}

function lexer(tokens) {
  const ast = [];
  tokens.forEach(token => {
    ast.push(/* ... */);
  });

  return ast;
}

function parseBetterJSAlternative(code) {
  const tokens = tokenize(code);
  const ast = lexer(tokens);
  ast.forEach(node => {
    // parse...
  });
}
```

위와 같이 하나의 함수에 다양한 기능들을 하는 것보다 함수들을 나누고 의미있는 이름으로 짓는다면 재사용이 가능하고 가독성이 좋다.

### **중복된 코드를 작성하지 말자**

- 중복된 코드가 있을 경우 수정해야 할 일이 있다면 다 바꿔주어야 한다. 하지만 하나의 기능이 있다면 일일이 찾아다니 않고 한번만 변경해주면 된다.
- 중복 코드를 제거한다는 것은 하나의 함수, 모듈, 클래스를 사용하여 여러가지 사소한 차이점을 처리 할 수 있는 추상화를 만드는 것을 의미한다.

### **매개변수로 플래그를 사용하지 말자.**

플래란? 프로그래밍 언어 용어로서, 특정 동작을 수행할지 말지 결정하는 변수를 플래그라고 부른다. - 나무위키 -

- 플래그를 사용하는 것 자체가 해당 함수가 한가지 이상의 역할을 하고 있다는 뜻이다.

**bad:**

```jsx
function createFile(name, temp) {
  if (temp) {
		fs.create(`./temp/${name}`);'
  } else {
		fs.create(name);
  }
}
```

**good:**

```jsx
function createFile(name) {
  fs.create(name);
}

function createTempFile(name) {
  createFile(`./temp/${name}`);
}
```

위와 같이 함수를 나누어서 사용하자!!

### 전역 함수를 사용하지 말자.

---

## 클린 코드 적용해보기

1. 담대하게 기존 코드 수정하기
   1. 두려워하지 말고 기존 코드를 씹고 뜯고 맛보고 즐기자
2. 큰 그림 보는 연습하기
   1. 그 때는 맞고 지금은 틀리다 기능 추가 자체는 클린해도, 전체적으로는 어지러울 수 있다.
3. 팀과 함께 공감대 형성하기
   1. 코드에 정답은 없다 명시적으로 이야기를 하는 시간이 필요하다
4. 문서로 적어 보기
   1. 글로 적어야 명확해 진다.
      1. 향후 어떤 점에서 위험할 수 있는지
      2. 어떻게 개선할 수 있는지

## 클린 코드의 오해

1. 클린 코드는 ≠ 짧은 코드가 아니다 == 원하는 로직을 빠르게 찾을 수 있는 코드이다.
2. 클린코드를 위해 지금 코드를 다 뒤짚을 수 없다.
3. 지저분한 코드가 있어야 깨끗한 코드도 있는 법. 방망이 깎는 노인처럼 지속적으로 다음어야 한다.
4. 리팩토링은 추가로 시간을 들이는 task가 아니다. 매일 보일 때마다 해야 한다.

### Source

- [자바스크립트 - 클린코드](https://github.com/qkraudghgh/clean-code-javascript-ko#%EC%86%8C%EA%B0%9Cintroduction)
- [토스 - 클린코드](https://youtu.be/edWbHp_k_9Y)
