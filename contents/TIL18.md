---
date: '2021-08-21'
title: 'TIL18 | 타입스크립트(타입 기본)'
categories: ['TIL']
summary: 'C#과 JAVA 같은 언어들은 강한 타입 시스템이 적용되어 높은 가독성과 코드 품질 등을 제공할 수 있고 런타임이 아닌 컴파일 환경에서 에러가 발생해 치명적인 오류를 쉽게 잡아낼수 있다. '
thumbnail: './images/TIL4.png'
---

# 타입스크립트란?

- C#과 JAVA 같은 언어들은 강한 타입 시스템이 적용되어 높은 가독성과 코드 품질 등을 제공할 수 있고 런타임이 아닌 컴파일 환경에서 에러가 발생해 치명적인 오류를 쉽게 잡아낼수 있다.
- 자바스크립트는 동적 프로그래밍 언어로서 유연하게 타입을 가진다 이 때문에 런타임 환경에서 뜻하지 않는 에러가 발생한다.
- 타입스크립트는 이러한 자바스크립트에 강한 타입 시스템을 적용해서 컴파일 단계에서 에러를 잡을수 있게 한다.

# 타입스크립트 적용하기

## 컴파일러 설치

**전역 설치**

```jsx
npm install -g typescript
tsc --version
tsc ./src/index.ts
```

**프로젝트 설치**

```jsx
npm install -D typescript
npx tsc --version
npx tsc ./src/index.ts
```

**컴파일을 위한 다양한 옵션을 지정할 수 있다.**

공식문서: [https://www.typescriptlang.org/docs/handbook/compiler-options.html](https://www.typescriptlang.org/docs/handbook/compiler-options.html)

> 프로젝트 루트 경로에서 `tsconfig.json` 생성하면 해당 옵션이 분석된다.

```jsx
{
	"compilerOptions": {
		"strict": true,
		"target": "ES6",
		"lib": ["ES2015", "DOM"],
		"module": "CommonJS"
	},
	"include": [
		"src/**/*.ts"
	],
	"exclude": [
		"node_modules"
	]
}
```

## 타입 기본

### 타입 지정

`add` 함수의 매개 변수 `a` 와 `b` 는 `number` 타입이라고 지정했다. 그렇게 실행된 함수의 반환 값은 숫자로 추론? 되기 때문에 변수 `sum` 도 `number` 타입이어야 한다고 지정했다.

```jsx
function add(a: number, b: number) {
  return a + b;
}

const sum: number = add(3, 5);
console.log(sum); // 8
```

**자바스크립트 결과**

```jsx
function add(a, b) {
  return a + b;
}

const sum = add(3, 5);
console.log(sum);
```

### 타입 에러

변수 `sum` 에서 타입을 `string` 으로 지정하면 컴파일 하지 않고 코드 작성 시점에서 에러가 발생한다.

```jsx
function add(a: number, b: number) {
  return a + b;
}

const sum: string = add(3, 5);
console.log(sum); // Type 'number' is not assignable to type 'string'.
```

## 기본 타입

### Boolean

타입이 참 / 거짓 값을 나타낸다.

```jsx
let isDone: boolean = false;
```

### Number

타입이 숫자이면 아래와 같이 선언한다.
모든 부동 소수점 값을 사용할 수 있다.

```jsx
let num: number = 6;
let float: number = 3.14;
```

### String

타입이 문자열을 나타낸다.

```jsx
let hello: string = 'Hello';
let world: string = `${hello} World`;
```

### Array

타입이 순차적으로 값을 가지는 일반 배열을 나타낸다.
다음과 같이 두 가지 방법으로 타입을 선언할 수 있다.

```jsx
let brand: string[] = ['nike', 'adidas', 'under armour'];
let brand: Array<string> = ['nike', 'adidas', 'under armour'];
```

유니언 타입 중 **문자열과 숫자**를 동시에 가지는 배열도 선언할 수 있다.

```jsx
let sum: (string | number)[] = ['nike', 1, 2, 'adidas', 3, 'under armour'];
let sum: Array<string | number> = ['nike', 1, 2, 'adidas', 3, 'under armour'];
```

배열이 가지는 항목의 값을 단언할 수 없다면 `any` 를 사용할 수 있다.

```jsx
let someArr: any[] = [1, 'ss', {}, []];
```

### Tuple

Tuple타입은 배열과 유사하다.
차이점은 정해진 타입의 고정된 길이 배열을 표현한다.

```jsx
let tuple: [string, number];
tuple = ['a', 1];
tuple = [1, 'a']; // Error
```

Tuple 타입의 2차원 배열을 사용할 수 있다.

```jsx
let users: [number, string, boolean][];
// Or
// let users: Array<[number, string, boolean]>;

users = [
  [1, 'Neo', true],
  [2, 'Evan', false],
  [3, 'Lewis', true],
];
```

### Enum

Enum은 특정한 값(상수)들의 집합을 의미하고, 값의 종류가 일정한 범위로 정해져 있는 경우 유용하다.

```jsx
enum Week {
  Sun,
  Mon,
  Tue,
  Wed,
  Thu,
  Fri,
  Sat
}

//javaScript
var Week;
(function (Week) {
    Week[Week["Sun"] = 0] = "Sun";
    Week[Week["Mon"] = 1] = "Mon";
    Week[Week["Tue"] = 2] = "Tue";
    Week[Week["Wed"] = 3] = "Wed";
    Week[Week["Thu"] = 4] = "Thu";
    Week[Week["Fri"] = 5] = "Fri";
    Week[Week["Sat"] = 6] = "Sat";
})(Week || (Week = {}));
```

기본적으로 0부터 시작해서 1씩 증가한다.

### Any

Any는 모든 타입을 의미한다.
이 타입을 사용하면 자바스크립트와 동일하게 어떤 타입이든 할당할 수 있다.
이 타입을 자주 사용한다면 타입스크립트를 사용하는 의미가 없다 최대한 `any` 타입을 지양하자!

```jsx
let any: any = 123;
any = 'Hello world';
any = {};
any = null;
```

### Object

기본적으로 `typeof` 연산자가 `object` 로 반환하는 모든 타입을 나타낸다.

```jsx
let obj: object = {};
let arr: object = [];
let func: object = function () {};
let date: object = new Date();
```

여러 타입의 상위 타입이기 때문데 유용하지 않다. 보다 정확하게 타입 지정하기 위해 객체 속성들에 대한 타입을 개별적으로 지정할 수 있다.

```jsx
let User: { name: string, age: number, isLogged: boolean } = {
  name: 'lee',
  age: 155,
  isLogged: false,
};
```

### Void

Void는 일반적으로 값을 반환하지 않는 함수에서 사용한다.
`: void` 위치는 함수가 반환 타입을 명시하는 곳이다.

```jsx
function hello(msg: string): void {
  console.log(`Hello ${msg}`);
}

const hi: void = hello('world'); //Hello world
console.log(hi); //undefined
```

### Union

2개 이상의 타입을 허용하는 겨우, 이를 유니언이라고 한다.

`|` (vertical bar)를 통해 타입 구분하며, `()` 는 선택 사항이다.

```jsx
let union: string | number;
union = 'Hello world';
union = 123;
union = false; // Error
```

### Function

화살표 함수를 이용해 타입을 지정할 수 있다.

```jsx
let func:(arg1:number, arg:number) => number;
func = function(x, y) {
	return x + y;
}

// 인수가 없고, 반환도 없는 경우
let func1:() => void;
fun1 = function() {
  console.log(`Hello world');
}
```

### Source

[한 눈에 보는 타입스크립트](https://edu.goorm.io/learn/lecture/22106/%25ED%2595%259C-%25EB%2588%2588%25EC%2597%2590-%25EB%25B3%25B4%25EB%258A%2594-%25ED%2583%2580%25EC%259E%2585%25EC%258A%25A4%25ED%2581%25AC%25EB%25A6%25BD%25ED%258A%25B8)
