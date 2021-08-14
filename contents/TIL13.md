---
date: '2021-08-13'
title: 'TIL13 | 브라우저 동작 원리'
categories: ['TIL']
summary: '브라우저는 HTML과 CSS 명세에 따라 HTML 파일을 해석해서 표시하는데 이 명세는 웹 표준화 기구인 W3C(World Wide Web Consortium)에서 정한다. '
thumbnail: './images/TIL3.png'
---

## 브라우저의 기본 구조

![브라우저 동작원리](https://user-images.githubusercontent.com/60437099/129354655-82990077-7200-4600-b690-3b53e4929ef8.png)

**User Interface**

- 이전/다음 버튼, 주소 표시줄, 북마크 메뉴 등등 (요청한 페이지를 보여주는 창을 제외한 모든 부분)

**Browser Engine**

- 사용자 인터페이스와 렌더링 엔진 사의 동작 제어

**Rendering Engine**

- 사용자로부터 요청 받은 컨텐츠를 표시

**Networking**

- HTTP와 같은 네이트워크 호출에 사용됨.

**Javascript Interpreter**

- 자바스크립트 코드를 파싱하고 실행 하는 자바스크립트 해석기

**UI Backend**

- 기본적인 UI를 말한다.`<input/>`, `<button/>` 태그를 사용할때 스타일을 따로 적용하지 않아도 기본적으로 화면에 보여진다 . 이러한 요소들을 플랫폼에서 명시하지 않고, OS 사용자 인터페이스의 UI를 사용한다.

**Data Storage**

- 자료를 저장하는 계층(웹 스토리지, 쿠키와 같은 데이터가 이 곳에 저장됨)

## 렌더링 엔진

브라우저의 주요 구성중 렌더링 엔진은 요청 받은 컨텐츠를 화면에 표시하는 일이다.

### **렌더링 엔진들**

- 여기에서는 크롬을 위주로 다룰 예정이다 크롬은 **웹킷**에서 파생된 **블링크**를 사용중에 있고 또 오페라, 웨일, 엣지도 같은 엔진을 사용하고 있다. [여기 참고](https://ko.wikipedia.org/wiki/%EB%B8%8C%EB%9D%BC%EC%9A%B0%EC%A0%80_%EC%97%94%EC%A7%84)

### 동작 과정

- 렌더링 엔진은 통신으로부터 요청받은 문서의 내용을 얻는 것부터 시작한다고 한다 문서의 내용은 보통 8kb 단위로 전송된다.

**렌더링 엔진의 동작 과정이다.**

<img width="4371" alt="렌더링 과정" src="https://user-images.githubusercontent.com/60437099/129354807-09a5d188-139c-48f4-9595-7918bbd2b2eb.png">

**동작 방식에 대해 이야기 해보려고 한다.**

- 렌더링 엔진에서는 HTML **문서를 파싱**한다.

```js
문서 파싱이란?
브라우저가 코드를 이해하고 사용할수 있는 구조로 변환하는 것 파싱의 결과는 보통 문서 구조를 나타내는 노드 트리인데 파싱 트리 또는 문법 트리라고 한다.

파서는 보통 두 가지 일을 하는데 자료를 유효한 토큰으로 분해 하는 어휘 분석기가 있고, 언어 구문 규칙에 따라 문서 구조를 분석함에 따라 파싱 트리를 생성하는 파서가 있다.

파싱 과정은 반복된다 보통 파서는 어휘 구문기한테 새로운 토큰을 받아 구문 규칙과 일치하는지 판단한다. 규칙에 맞으면 토큰에 해당하는 노드가 파싱 트리 추가되고 파서는 다시 새로운 토큰을 요청한다.

규칙에 맞지 않으면 파서는 토큰 내부적으로 저장하며 맞을때까지 요청 한다. 맞는 규칙이 없는 경우 예외 처리를 하는데 문서가 유효하지 않고 구문 오류를 포함고 있다는 의미이다.
```

- 그 다음 CSS 파일과 함꼐 스타일 요소도 파싱한다. DOM 트리와 스타일 시트가 **어태치먼트** 과정을 지나서 렌더 트리를 생성한다. 문서를 시각적인 구성 요소로 만들어주는 역할을 한다.(어떻게 나타날지 스타일을 지정)

```js
어태치먼트는 렌더트리를 생성하기 위해 DOM노드와 시각정보를 연결하는 과정이다.
```

- 렌더 트리가 생성되면 레이아웃이 일어난다.(위치나 요소에 대한 크기를 계산한다)
- 렌더 트리의 각 노드를 화면의 실제 픽셀로 변환하는 마지막 단계로 정보를 전달한다. (레이아웃이 완료될 때 브라우저가 페인트 이벤트를 발생 시킨다.)
- 마지막 Composit단계에서는 각 레이어를 합성하는 과정이다. 최종적인 화면을 그린다.

**전체적인 과정을 Critical Rendering Path 또는 Pixel Pipeline이라고 부른다.**

_아래의 그림은 글로 작성한 흐름을 표현 한것이다._

![https://d2.naver.com/content/images/2015/06/helloworld-59361-3.png](https://d2.naver.com/content/images/2015/06/helloworld-59361-3.png)

## 스타일 변경

### **Reflow 발생(속성)**

- width, height(위치나 크기) 변경하는 작업이 생긴다면 위치나 크기나 변경된다면 당연히 레이아웃 단계를 지나고 픽셀 등 바뀌었으니 페인트 부분도 다시 변경되어야 한다.

<img width="6228" alt="렌더링과정" src="https://user-images.githubusercontent.com/60437099/129354702-5e23b8bf-110c-4492-b1ab-b5e4ab585b80.png">

```jsx
//reflow가 발생되는 속성들
postion, width, height, left, top, right, bottom, margin, padding, border,
border-width, display, float, font-family, font-size, font-weigth, line-height,
min-heigth, overflow, text-align, vertical-align ...
```

### **Repaint 발생(속성)**

- color, background-color(색깔)변경 하는 작업이 생긴다면
  색깔이 변경되기 때문에 위치나 크기는 변경되지 않아도 된다. 페인트 작업을 하고 다시 합성 작업을 한다.

     <img width="6228" alt="11" src="https://user-images.githubusercontent.com/60437099/129354884-510e09bd-efaf-434b-bac1-d18755e7ebb2.png">

```jsx
//repaint가 발생되는 속성들
background, background-image, background-position, background-repeat,
background-size, border-radius, border-style, box-shadow, color, line-syle,
outline, outline-color,outline-style, outline-width, text-decoration ....
```

### **Reflow, Repaint 피하기(GPU 도움받기)**

- transform. opacity(GPU가 관여할 수 있는 속성)
  돔과 렌더 트리까지 과정은 똑같다 레이아웃과 페인트 단계에서 GPU가 관여해서 바로 합성 단계로 넘어간다. 이전 작업 보단 더 빠르게 렌더링 될 수 있을 거 같다.

![22](https://user-images.githubusercontent.com/60437099/129354905-8bb532fc-6b52-47f9-8825-d9a3f96a28bd.png)

### Source

[브라우저는 어떻게 동작하는가? - 네이버D2](https://d2.naver.com/helloworld/59361)
