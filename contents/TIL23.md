---
date: '2021-10-29'
title: 'Deep Copy & Shllow Copy'
categories: ['TIL']
summary: '자바스크립트에서는 원시값과 참조값으로 나뉜다.'
thumbnail: './images/TIL6.png'
---

> **자바스크립트에서는 원시값과 참조값으로 나뉜다.**

- 원시값에는 `Number, String, Boolean, Null, Undefiend` 타입이 있고 값을 복사할 때 다른 메모리에 복사가 되기때문에 영향을 받지 않는다.

```jsx
let a = 'lee';
let b = a;
b = 'park';
console.log(b); // park
console.log(a); // lee
```

- 참조값은 `Object, Symbol` 타입이 있고 참조값은 변수가 같은 객체의 주소를 가르키기 때문에 영향을 미친다.

```jsx
let a = {
  name: 'lee',
  age: 99,
};

let b = a;

b.name = 'park';

console.log(b.name); // park
console.log(a.name); // park
```

> **이러한 객체의 특징 때문에 객체는 불변성을 지키기 위해 얕은 복사 또는 깊은 복사를 하게 된다.**

### 얕은복사(Shllow Copy)

**Object.assign()**

```jsx
let a = {
  name: 'lee',
  b: {
    age: 99,
  },
};

let newA = Object.assign({}, a);

newA.name = 'park';

console.log(newA.name); // park
console.log(a.name); // lee
```

이렇게 `Object.assign()` 메소드를 사용하면 값이 변하지 않는것을 확인할수 있다.

**Spread Operator**

```jsx
let a = {
  name: 'lee',
  b: {
    age: 99,
  },
};

let newA = { ...a };

newA.name = 'park';

console.log(newA.name); // park
console.log(a.name); // lee
```

두번째로는 `Spread Operator` 를 사용하면 값이 변하지 않는다.

`Object.assign() 와` `Spread Operator`를 사용하면 1차원 객체는 복사가 되지만 2차원 객체는 복사가 되지 않는다.

```jsx
newA.b.age = 100;
console.log(newA.b.age); // 100
console.log(a.b.age); // 100
```

### 깊은 복사(Deep Copy)

**JSON Method**

```jsx
let a = {
  name: 'lee',
  b: {
    age: 99,
  },
};

let stringA = JSON.stringify(a);
let newA = JSON.parse(stringA);

newA.b.age = 100;

console.log(newA.b.age); // 100;
console.log(a.b.age); // 99
```

JSON 객체를 이용해 깊은 복사를 할 수 있다. `JSON.stringify()` 로 객체를 문자열로 변환해준다. 그리고 다시 `JSON.parse()` 을 통해 문자열을 객체로 변환해준다. 이 방법으로 깊은 복사를 할 수 있게된다 하지만
객체 → 문자열 → 객체로 과정이 필요하기에 성능이 좋지? 않다.

**Recursive Function**

```jsx
let a = {
  name: 'lee',
  b: {
    age: 99,
  },
};

function deepCopy(obj) {
  const result = {};
  for (let key in obj) {
    if (typeof obj[key] === 'object') {
      result[key] = deepCopy(obj[key]);
    } else {
      result[key] = obj[key];
    }
  }
  return result;
}

let newA = deepCopy(a);

newA.b.age = 100;
console.log('a:', a); //99
console.log('newA:', newA); //100
```

객체의 키가 객체가 아닐때까지 자신을 호출한다. 이렇게 재귀함수로 깊은 복사를 할 수 있다.
