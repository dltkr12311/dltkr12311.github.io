---
date: '2021-08-02'
title: 'TIL07 | React Class VS Function Component'
categories: ['TIL']
summary: '오늘 세션을 들으면서 다시 한번 정리하기 위해 작성한다.
리액트를 사용할때 두 가지 방법으로 코드를 작성할수 있다. 예전에는 클래스형 컴포넌트를 주로 사용했지만 최근에는 함수형 컴포넌트로 많이 사용하고 있다. 페이스북 공식문서에 보면 Hooks을 권장한다. '
thumbnail: '../images/TIL2.png'
---

## Class VS Function Component

오늘 세션을 들으면서 다시 한번 정리하기 위해 작성한다.
리액트를 사용할때 두 가지 방법으로 코드를 작성할수 있다. 예전에는 클래스형 컴포넌트를 주로 사용했지만 최근에는 함수형 컴포넌트로 많이 사용하고 있다. 페이스북 공식문서에 보면 Hooks을 권장한다.

### 선언 방식

**Class Component**

- `class` 문법을 사용하고 상속 받는 개념이다.
- `render()` 메소드가 필수다.

```jsx
import React, { Component } from 'react';

class Example extends Component {
  render() {
    return <div>Hello World</div>;
  }
}

export default Example;
```

**Function Component**

- 함수로 작성된다.

```jsx
import React from 'react';

const Example = () => {
  return <div>Hello World</div>;
};

export default Example;
```

### 상태 관리

**Class Component**

`constructor` 안에서 `this.state` 로 관리되고 상태를 변경하려면 무조건 `this.setState` 로 변경해야 한다.

```jsx
import React, { Component } from 'react';

class Example extends Component {
  constructor(props) {
		super(props)
		this.handleIncrement = this.handleIncrement.bind(this);
		this.state = {
			count = 0;
		}
	}

handleIncrement() {
  this.setState({
		count++;
  })
}

  render() {
		return (
			<div>증가</div>
			<button onClick{this.increment}>+<button>

		)
	}
}

export default Example;
```

**Function Component**

`useState`를 `import` 하고 배열 구조 분해로 변수 선언 한다. setCount 함수를 호출하여 state 변수를 갱신한다.

```jsx
import React, { useState } from 'react';

const Example = () => {
 const [count, setCount] = useState(0);

  return (
		<div>증가</div>
		<button onClick={() => setCount(count++)}>+<button>
  )
}

export default Example;
```

### 데이터 전달

**Class Component**

`this.props` 로 값을 불러와 전달 한다.

```jsx
import React, { Component } from 'react';
import ChildComponent from './ChildComponent'

class Example extends Component {
  constructor(props) {
		super(props)
		this.handleIncrement = this.handleIncrement.bind(this);
		this.state = {
			count = 0;
		}
	}

handleIncrement() {
  this.setState({
		count++;
  })
}

  render() {
		return (
			<ChildComponent increment={this.props.handleIncrement} />
		)
	}
}

export default Example;
```

**Function Component**

그냥 props으로 전달한다.

```jsx
import React, { useState } from 'react';
import ChildComponent from './ChildComponent';

const Example = () => {
  const [count, setCount] = useState(0);

  const handleIncrementClick = () => {
    setCount(count++);
  };

  return <ChildComponent increment={handleIncrementClick()} />;
};

export default Example;
```

### Life Cycle method

**Class Component**

**Life Cycle를 사용할수 있다**

총 크게 세가지로 나뉜다.

**componentDidMount**

- 실행 순서는 `constructor` 가 생성되고 → `rendering` 이 되고 → `componentDidMount` 가 실행된다. `componentDidMount` 는 처음 딱 한번만 실핸된다.

**componentDidUpdate**

- `rendering` 이 되고 `componentDidUpdate` 가 실행된다. `componentDidUpdate` 는 리렌더링 이후에 state나 props가 변경이 될 때마다 실행 된다.

**componentWillunmount**

- `componentWillunmount` 해당 메소드를 실행하면 제거가 된다.

**Function Component**

함수형 컴포넌트에서는 Life Cycle를 useEffect로 사용할 수 있다.

이렇게 두번째 인자에 의존성 빈 배열을 넣게 되면 `componentDidMount` 와 같다 처음 렌더링에만 호출이 되고 그다음 호출이 되지 않는다. \*\*\*\*

```jsx
useEffect(() => {}, []);
```

두 번째 인자에 의존성 배열 값을 넣어주면 `componentDidUpdate` 와 같다 리렌더링 이후에 변경이 있을때 마다 호출이 된다.

```jsx
useEffect(() => {}, [블라]);
```

return문을 작성하게 되면 `componentWillunmount` 와 같다 해당 메소드를 제거한다.

```jsx
useEffect(() => {
  return () => {};
}, [블라]);
```
