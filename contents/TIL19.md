---
date: '2021-08-23'
title: 'TIL19 | 타입스크립트(타입 추론, 인터페이스, 제네릭)'
categories: ['TIL']
summary: '오늘은 타입스크립트 주제를 가지고 세션을 들었다. 배웠던 개념들을 학습하고자 정리한다. '
thumbnail: './images/TIL5.png'
---

## 들어가기 전

- 오늘은 타입스크립트 주제를 가지고 세션을 들었다. 배웠던 개념들을 학습하고자 정리한다.

## Inferene(타입 추론)

- 타입스크립트에서는 타입을 명시적으로 표기하지 않아도 컴파일러가 변수에 할당된 값을 보고 추론해 제공한다.

```tsx
let num = 123;
num = 'hello world'; // Type 'string' is not assignable to type 'number'.
```

변수 `num` 초기화 하면서 123 숫자를 할당해 `number` 타입이 추론되었고, `hello world` 이라는 `string` 타입의 값은 할당할 수없다고 에러가 난다.

타입스크립트가 타입을 추론하는 경우는 다음과 같다.

- 초기화된 변수
- 기본값이 설정된 매개변수
- 반환 값이 있는 함수

```tsx
// 초기화된 변수
let num = 99;
// 기본값이 설정된 매개변수
function sum(a: number, b: number = 3) {
  // 반환 값이 있는 함수
  return a + b;
}
```

## Interface(인터페이스)

- 자바스크립트에서는 인터페이스가 존재 하지 않지만, 자바와 같은 언어에서는 자주 사용되는 개념이라고 한다. 타입스크립트에서의 인터페이스는 여러 객체를 정의하는 일종의 규칙이며 구조이다.
- `React` 에서는 `state` 와 `props` 타입을 정의하는데 주로 사용한다.

> `:` 나 `,` 혹은 기호를 사용하지 않고 작성할 수 있다.

```tsx
interface IUser {
  name: string;
  age: number;
  email: string;
}

interface IUser {
  name: string;
  age: number;
  email: string;
}

interface IUser {
  name: string;
  age: number;
  email: string;
}
```

> 아래 user2 와 같이 interface에 정의되었지만 작성하지 않으면 에러가 난다.

```tsx
interface IUser {
  name: string;
  age: number;
}

let user1: IUser = {
  name: 'Lee',
  age: 99,
};

/*
  Type '{ name: string; age: number; email: string; }' 
	is not assignable to type 'IUser'.
	Object literal may only specify known properties, 
	and 'email' does not exist in type 'IUser'.
*/

let user2: IUser = {
  name: 'Lee',
  age: 99,
  email: 'lee@example.com',
};
```

> 아래 코드처럼 객체 리터럴이 아닌 변수에 할당하면 에러는 사라진다. 이유는 타입 추론에 따라 자기만의 타입을 갖게 된다.

```tsx
interface User {
  name: string;
  age: number;
}

let user: User;

let user2: User = {
  name: 'Lee',
  age: 99,
  email: 'lee@example.com',
};

user = user2;
```

**Interface 확장**

`extends` 를 사용하여 기존애 정의된 인터페이스를 확장해서 사용할 수 있다.

```tsx
interface UserInfo {
  name: string;
  age: number;
}

interface UserDetailInfo extends UserInfo {
  email: string;
  address: string;
}

const user: UserInfo = {
  name: 'Lee',
  age: '99',
};

const userDetail: UserDetailInfo = {
  name: 'Lee',
  age: 99,
  email: 'Lee@example.com',
  address: '서울시 마포구',
};
```

## Generic(제네릭)

- Generic 재사용 목적으로 함수나 클래스 선언 시점이 아닌 사용 시점에 타입을 선언할 수 있다.
- 내가 원하는 타입을 자유롭게 지정해서 사용할 수 있다.(타입을 인수로 받아서 사용한다고 생각하면 쉽다)

```tsx
// T는 Type variable
function makeFunc<T>(el: T): T[] {
  return [el];
}

makeFunc<number>(1);
makeFunc<string>('Hello world');
makeFunc<boolean>(true);
```

타입 추론을 통해 함수 호출할때 타입을 명시적으로 지정하지 않아도 된다.

```tsx
function makeFunc<T>(el: T): T[] {
  return [el];
}

makeFunc(1);
makeFunc('Hello world');
makeFunc(true);
```

타입추론을 통해 작성하면 가독성 면에서는 좋지만, 나중에 유지 보수나 좀 더 복잡한 상황이라면 예상치 못한 오류가 나올수 있으니 제네릭 타입을 정확히 작성하도록 하자!!
