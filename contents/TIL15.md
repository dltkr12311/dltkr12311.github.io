---
date: '2021-08-16'
title: 'TIL15 | this'
categories: ['TIL']
summary: 'this는 실행컨텍스트가 생성될 때 결정된다. 실행컨텍스트는 함수를 호출할때 생성되므로, this는 함수를 호출한 방법에 의해 결정된다. '
thumbnail: './images/TIL4.png'
---

### 정의

- this는 실행컨텍스트가 생성될 때 결정된다. 실행컨텍스트는 함수를 호출할때 생성되므로, **this는 함수를 호출한 방법에 의해 결정된다.**
- this는 기본적으로 전역 객체를 참조한다.
- this의 값은 this를 사용하는 해당 함수를 어떻게 실행하느냐에 따라 바뀐다.

```jsx
const test = {
  prop: 34,
  func: function () {
    return this.prop;
  },
};
console.log(test.func()); // output:34

//window
console.log(this === window); //true
```

**예시**

1. 아버지: 나는 허리가 아프다. ( 나 === 아버지 )
2. 어머니 : 나는 어깨가 아프다. (나 === 어머니 )
3. 삼촌: 나는 머리가 아프다. ( 나 === 삼촌 )

> 자바스크립트에서 this는 여기서 '나'라는 단어와 비슷 하다 어떤 문맥이냐에 따라서 그 의미(값)가 바뀐다.

### this를 사용하는 4가지 방법

**1. reguler function call (일반 실행 함수)**

- 함수와 메서드는 모두 function 키워드로 함수를 정의한것을 의미한다.

```jsx
// 1-1.
function foo() {
  console.log(this); //this === global object(브라우저상에서는 window객체)
}

foo();

////////// 1-2. ///////////

var name = 'lee';

function bar() {
  var name = 'kim';
  baz();
}

function baz() {
  console.log(this.name);
}

bar();
//outpiut: lee

//////// 1-3. **use strict을 사용할 경우 ////////**
('use strict');

var name = 'lee';

function foo() {
  console.log(this.name);
}

foo(); //output: this === undefined
```

**2. Dot Notation (점 방식)**

- 메서드는 객체의 프로퍼티로 함수가 정의되어야 한다.
- 객체의 프로퍼티에 할당된 함수를 호출하면, this는 해당 객체를 바라본다.

```jsx
//2-1.
var age = 100;

var lee = {
  age: 28,
  foo: function foo() {
    console.log(this.age);
  },
};

lee.foo(); //output: 28

//2-2.
function foo() {
  console.log(this.age);
}

var age = 100;

var lee = {
  age: 28,
  foo: foo,
};

var kim = {
  age: 21,
  foo: foo,
};

lee.foo(); //output: 28
kim.foo(); //output: 21

//2-3.
var age = 100;

var lee = {
  age: 28,
  foo: function bar() {
    console.log(this.age);
  },
};

var kim = {
  age: 21,
  foo: lee.foo,
};

var foo = lee.foo;

lee.foo(); //output: 28
kim.foo(); //output: 21
foo(); //output: 100
```

**3.Function.prototype.call, Function.prototype.apply, Function.prototype.bind**

- this의 값을 한 문맥에서 다른 문맥으로 넘기려면 다음 `call()` 이나 `apply()` 를 사용해야 한다.
- call,apply의 첫번째 인자는 this로 사용할 객체이다.

```jsx
//3-1.
var age = 100;

function foo() {
  console.log(this.age);
}

var lee = {
  age: 28,
};

var kim = {
  age: 21,
};
foo(); //output: 100

foo.call(lee); //output:28
foo.apply(kim); //output:21

//3-2
var age = 100;

function foo(a, b, c, d, e) {
  console.log(this.age);
  console.log(arguments);
}

var lee = {
  age: 28,
};

var kim = {
  age: 21,
};

foo(); //output:100

foo.call(lee, 1, 2, 3, 4, 5); //output:28
foo.apply(kim, [1, 2, 3, 4, 5]); //output:21

//3-3.
var age = 100;

function foo() {
  console.log(this.age);
  console.log(arguments);
}

var lee = {
  age: 28,
};

foo(); //output:100

let bar = foo.bind(lee); //바로 실행되는것이 아니라 대기하고 있다가 할당한 변수가 실행되면 출력이 된다.

bar(); //output:28
```

**4. "new" Keyword (생성자 함수)**

```jsx
//4-1.
function Foo() {
  console.log(this);
}
//new를 사용하면 새로운 빈 객체가 생성되고 this는 새로운 생성자 함수에 this의 값이 담긴다.
// return을 따로 명시하지 않아도 자바스크립트 엔진에서 return을 알아서 해준다.
new Foo(); //output: foo:{}

//4-2.
function Foo() {
  this.name = 'this 공부중...';
}

var thisReult = new Foo();
console.log(thisResult); // output: foo {name: "this 공부중..."}

//4-3.
function Person(name) {
  this.name = name;
}

var leeCoding = new Person('lee coding');

console.log(leeCoding); //output: Person {name: "lee coding"}

//4-4.
function Person(name, age, color) {
  this.name = name;
  this.age = age;
  this.color = color;
}

var lee = new Person('lee coding', 28, 'red');
var kim = new Person('kim coding', 21, 'orange');

lee; //output: Person {name: "lee coding", age: 28, color: "red"}
kim; //output: Person {name: "kim coding", age: 21, color: "orange"}
```

### **화살표 함수(Arrow Function)(ES6 Syntax)**

- 화살표 함수는 함수를 선언할때 this에 바인딩할 객체가 정적으로 결정된다. 화살표 함수는 언제나 상위 스코프의 this를 가리킨다.(lexical this)
- 화살표 함수는 call, apply, bind를 이용하여 변경할수 없다.
- abbEventListener함수의 콜백 함수를 화살표 함수로 정의하면 this가 전역 객체인 window를 가리킨다.
  이벤트 함수 내의 this를 정의하고 싶으면 일반 함수로 작성해야 한다.
