---
date: '2021-08-14'
title: 'TIL14 | Event Loop'
categories: ['TIL']
summary: '자바스크립트는 싱글 스레드 기반 언어다. 스레드가 싱글이란 말은 동시에 하나의 작업만을 수행한다. 그런데 생각을 해보면 우리는 브라우저에서 특정 작업을 할 때에 불편한 점을 느끼지 못했다?? '
thumbnail: './images/TIL3.png'
---

### Event Loop?

자바스크립트는 싱글 스레드 기반 언어다. 스레드가 싱글이란 말은 동시에 하나의 작업만을 수행한다. 그런데 생각을 해보면 우리는 브라우저에서 특정 작업을 할 때에 불편한 점을 느끼지 못했다?? 수많은 데이터들을 서버로부터 받아와 화면에 출력해준다고 했을 때 싱글 스레드라면 화면에 데이터가 출력될 때까지 우리는 아무것도 할 수가 없다. 그대로 화면이 멈춰있을 것이다 그러나 실제로 브라우저에서 수행 할 때에 데이터가 모두 출력되지 않아도 움직이거나 다른 작업을 할 수가 있다. 이러한 작업을 가능하게 해주는 것이 이벤트 루프이다 좀 더 이야기하면 이벤 루프는 비동기로 작업이 이루어지는데 비동기의 동작은 자바스크립트 엔진에서 제공 되는 것이 아니라 `브라우저`나 `node` 에서 지원된다 자바스크립트 엔진은 호출 스택을 사용하며 요청이 들어올 때마다 해당 요청을 차례로 호출 스택에 담아 처리만을 담당한다. 호출 스택도 단일 스택이다 `싱글 스레드 === 호출 스택` 자바스크립트가 구동되는 환경인 브라우저에서는 주로 여러 개의 스레드가 사용되며 단일 호출 스택을 사용하는 자바스크립트 엔진과연동하기 위해 사용되는 장치가 **이벤트 루프**이다.

### Event Loop Architecture

![https://miro.medium.com/max/1400/1*MnRk2ZVl5acI5BFmmw7IRg.png](https://miro.medium.com/max/1400/1*MnRk2ZVl5acI5BFmmw7IRg.png)

[사진출처](https://towardsdev.com/event-loop-in-javascript-672c07618dc9)

**Memory Heap**

- 객체들은 힙안에 할당된다. 힙은 구조화 되지 않은 넓은 메모리 영역이라 한다.

**Call Stack**

- 해당 함수가 여기에 차례대로 쌓인다.

**Web APIs**

- 브라우저에서 제공되는 api들이다. 대표적으로 AJAX, Timer, DOM 이벤트 등 있다.

**Callback Queue**

- web APIs에서 비동기 작업들이 실행된 후 호출되는 콜백 함수들이 대기하는 공간이다.
  호출 스택이 비어있다면 들어온 순서대로 호출 스택에 전달한다.

**어떻게 작동하는지?**

![ezgif com-gif-maker](https://user-images.githubusercontent.com/60437099/129439435-47e50537-0d1b-422b-a9be-163378b6434c.gif)

> **위에 순서는 이렇게 진행이 된다.**

- 작성한 코드 순서대로 호출 스택에 쌓인다.
- `timer()` 는 DOM 이벤트(비동기)는 Web APIs에 넘어간다.(콜백 함수여서 실행될때까지 대기한다)
- `console.log("Hi!")` 가 호출 되고 바로 출력한다.
- `timeout()` (비동기)은 Web APIs로 넘어간다. 5초가 지난 뒤 Callback Queue로 넘어가서 Call Stack이 비워질때까지 대기한다.
- `console.log("Welcome to loupe")` 가 호출 되고 바로 출력된다.
- Callback Queue에 대기하던 `timeout()` 는 Call Stack이 비워진걸 확인하고 Call Stack으로 넘어가서 `console.log("Click the button!")` 을 출력한다.
- Click me 버튼을 클릭하면 Web APIs에 대기하던 `timer()` 는 2초가 지난 뒤 Callback Queue에 넘어가고 역시 Call Stack이 비워진걸 확인한 후 `console.log("You clicked the button!")` 을 출력한다.

**이벤트 루프는 이런 동작을 하게 된다는걸 알수 있다.**

> 마지막으로 이 영상을 꼭 한번씩 보는걸를추천한다. (처음 이벤트 루프를 접할때 도움이 많이 되었다)

[https://www.youtube.com/watch?v=8aGhZQkoFbQ](https://www.youtube.com/watch?v=8aGhZQkoFbQ)

### Source

[어쨌든 이벤트 루프는 무엇입니까? | Philip Roberts | JSConf EU](https://www.youtube.com/watch?v=8aGhZQkoFbQ)

[동시성 모델과 이벤트 - MDN](https://developer.mozilla.org/ko/docs/Web/JavaScript/EventLoop)
