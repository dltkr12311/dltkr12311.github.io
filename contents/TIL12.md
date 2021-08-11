---
date: '2021-08-12'
title: 'TIL12 | 자바스크립트 비동기 처리'
categories: ['TIL']
summary: '특정 코드의 실행이 완료될 때까지 기다리지 않고 다음 코드를 먼저 수행한다.'
thumbnail: './images/TIL3.png'
---

**비동기란?**

특정 코드의 실행이 완료될 때까지 기다리지 않고 다음 코드를 먼저 수행한다.

> 자바스크립트는 싱글 스레드이다. 한 번에 한 작업만 메인 스레드에서 처리될 수 있다. 외부 API에서 데이터를 받아와서 화면에 뿌려 줄 때나, 웹캠에서 비디오에 접근하거나, 디스플레이를 VR 헤드셋으로 브로드캐스팅 하는 작업을 할 때 동기적으로 코드를 사용한다면 네트워크 환경, 다운로드 속도 등의 영향을 받아 전송이 완료되기 전까지 다른 작업은 할 수가 없다(최악이다) 사용자 경험에 있어 좋지 않은 경험을 준다. 그래서 이러한 작업을 비동기로 처리해야 한다.

**다음은 비동기 작업을 처리하는 세 가지 방법이 있다.**

1. Callback
2. Promise
3. Async / Await

## 1. Callback

---

### 특징

- 다른 함수에서 인자로 받아 내부에서 실행하는 함수이다.
- 자바스크립트에서 함수는 객체이다. 때문에 함수는 다른 함수에 인자로 쓰일수 있고, 다른 함수에 의해 반환 될 수도 있다.(이러한 함수를 고차 함수라고 한다)

**Callback 처리**

변수 `resultData` 를 선언하고 해당 서버에서 데이터를 요청하고 받아온 데이터는 `res` 인자에 담깁니다. `res` 를 `resultData` 에 할당하고 `resultData` 를 반환합니다 이렇게 실행하면 콘솔창에 데이터가 출력될꺼 같지만 `undefined` 가 출력이 된다. 이유는 **해당 주소에서 데이터를 가져오는 동안 `resultData` 는 이미 반환 하였기 때문에 `undefined` 가 출력이 된다.** 이러한 이유를 자세히 알기 위해서는 Event Loop를 이해야 한다.

```jsx
function getData() {
  let resultData;
  $.get('https://example.com', function (res) {
    resultData = res;
  });
  return resultData;
}

console.log(getData()); // undefined
```

아래와 같이 작성하면 비동기 처리를 할수 있습니다. 함수를 `getData` 함수 인자로 넘겨서 원하는 시점에 동작을 실행할 수 있습니다 **- 콜백 함수**

```jsx
function getData(callbackFunc) {
  $.get('https://example.com', function (res) {
    callbackFunc(res);
  });
}

getData(function (resultData) {
  console.log(resultData);
});
```

### **Callback hell**

![callbackhell](https://user-images.githubusercontent.com/60437099/129032611-de40ef34-7f03-45b3-a839-fb13101703b9.jpeg)
_[사진 출처](https://res.cloudinary.com/practicaldev/image/fetch/s--c0aEZX7m--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/b8euo2n7twvgh3dbuatd.jpeg)_</br>

콜백함수로 비동기 함수를 처리하려면 많이 들어봤거나 봤던 코드이지 않을까 싶다 비동기로 처리하려면 콜백안에 콜백으로 계속 작성을 해야한다. 이렇게 되면 지금은 당장 기능이 잘 돌아갈지 모르겠지만 가독성도 많이 떨어지고 유지보수는 포기할꺼 같다....
**그래서 콜백 지옥을 벗어날 방법이 있긴하다.⬇️⬇️⬇️⬇️**

## 2. Promise

---

### 특징

- promise는 자바스크립트 비동기 처리에 사용되는 객체
- promise를 사용하면 비동기 메서드를 동기 메서드 처럼 값을 반환 할수 있다.

### 프로미스의 3가지 상태

**Pending:** 비동기 처리 로직이 완료되지 않은 상태

**Fulfilled:** 비동기 처리가 완료되어 프로미스가 결과 값을 반환해준 상태

**Rejected:** 비동기 처리가 실패하거나 오류가 발생한 상태

![ promise](https://user-images.githubusercontent.com/60437099/129033005-fb9e63da-be1b-4295-ab31-106113673f1f.png)

_위 사진은 mdn에서 가져온 사진입니다._

`new Promise()` 생성자 함수를 호출하게 되면 **`pending`:대기** 상태가 됩니다.

프로미스 메소드는 콜백 함수를 선언 할수 있고 인자로 `resolve`와 `reject` 가 있습니다 위 사진과 같이 **fullfill(`resolve`:성공)**가 되면 `.then` 을 통해 값을 전달 할 수 있습니다.`(then 메서드를 호출하고 나면 새로운 프로미스 객체가 반환된다)`

`**reject**` **:실패**라면 `catch` 를 통해 실패 이유를 알 수 있습니다.

### Promise 에러 처리 방법

비동기 음성 파일을 생성해 주는 `createAudioFileAsync()` 라는 함수가 있다. 해당 함수는 음성 설정에 대한 정보를 받고 두 가지 콜백 함수를 받는다. 하나는 음성 파일이 성공적으로 생성되었을때 실행되는 콜백 함수, 그리고 다른 하나는 에러가 발생했을때 실행되는 콜백이다.

```jsx
function successCallback(result) {
  console.log(`Audio file ready at URL: ${result}`);
}

function failureCallback(error) {
  console.log(`Error generating audio file: ${result}`);
}

createAudioFIleAsync(audioSettings, sucessCallback, failureCallback);
```

콜백을 붙여 사용할 수 있게 Promise를 반환 해준다.

```jsx
createAudioFileAsync(audioSettings)
  .then(successCallback)
  .catch(failureCallback);
```

chain에서 작업이 실패한 후에도 새로운 작업을 수행할수 있는것이 유용하다.

```jsx
new Promise((resolve, reject) => {
  console.log('initial');
  resolve();
})
  .then(() => {
    throw new Error('someting failed');
    console.log('Do this');
  })
  .catch(() => {
    console.log('Do that');
  })
  .then(() => {
    console.log('Do this, whatever happend before');
  });

/*
  출력 순서
	inotial
	Do that
	Do this, whatever happend before

	Do this가 출력되지 않았다 이유는 "someting failed" 에러가 rejection을 
	발생시켰기 때문이다.
*/
```

## 3. async & await

---

### 특징

- `async / await` 은 ECMA2017에 추가 되었다.
- 함수는 언제나 프로미스를 반환한다.
- 기존의 비동기 처리 코드 방식으로 사고하지 않아도 되는 장점이 있다.
- 코드를 작성하는게 쉽고 가독성이 좋다.

함수 앞에 예약어 `async` 를 추가하고 비동기 처리 코드 앞에 `await` 를 붙인다. 주의할점은 비동기 처리 메서드가 꼭 프로미스 객체를 반환해야 `await` 가 의도한 대로 동작한다.

```jsx
// 기존 promise 방식
fetch('https://example.com')
  .then(response => response.json())
  .then(data => console.log(data));

// async/await 방식
async function getData() {
  let response = await fetch('https://example.com');
  let data = await response.json();
  return data;
}
console.log(getData());
```

비동기로 작동 하지만 `await` 키워드를 통해 동기처럼 작동하는걸 볼 수 있다. 확실히 `async/await` 가 보통 함수 작성이랑 비슷하여서 가독성이 좋다!!

### async/await 에러 처리 방법

```jsx
// async/await 방식
async function getData() {
  try {
    let response = await fetch('https://example.com');
    let data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}
console.log(getData());
```

`try...catch` 구문을 통해서 에러 처리를 할 수 있습니다.

### Source

[비동기 처리와 콜백 함수, 프로미스 - 캡틴 판교](https://joshua1988.github.io/web-development/javascript/javascript-asynchronous-operation/)

[Using promises - MDN](https://developer.mozilla.org/ko/docs/Web/JavaScript/Guide/Using_promises)

[Promise - MDN](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Promise)
[async와 await - MDN](https://developer.mozilla.org/ko/docs/Learn/JavaScript/Asynchronous/Async_await)
