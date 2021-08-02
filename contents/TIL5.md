---
date: '2021-07-30'
title: 'TIL05 | HTML, CSS 기본이지만 중요한 (feat. 랜덤 리스트)'
categories: ['TIL']
summary: '오늘 팀 과제가 본격적으로 시작되었다. 내가 맡은 부분은 상품 상세 페이지이다.  html 로 구조를 나눌 태그들을 만들고, css로 레이아웃을 잡았다. 아래와 같이 보더 색을 구분지어서 구역을 나누었다 보기에는 너무 쉬어 보일수 있으나 나름 고민하며 작성 하였다.  '
thumbnail: './images/TIL.png'
---

## Layout

오늘 팀 과제가 본격적으로 시작되었다. 내가 맡은 부분은 상품 상세 페이지이다. `html` 로 구조를 나눌 태그들을 만들고, css로 레이아웃을 잡았다. 아래와 같이 보더 색을 구분지어서 구역을 나누었다 보기에는 너무 쉬어 보일수 있으나 나름 고민하며 작성 하였다.

<img width="1003" alt="dd" src="https://user-images.githubusercontent.com/60437099/127680344-a8a945a3-d018-44b6-87ee-56cd28c306a9.png">

자세히 설명하면 `html`로 테두리 색이 `div` 이다. 부모 `div` 에서 자식 `div` 로 작성을 하였다. 나눌 구역만큼 div로 만들고 그 다음 css는 중요하게 생각하는것이 깔끔하게 나누어 떨어지는 것을 생각하며 작성을 한다. 인위적으로 특정 위치만 따로 위치를 설정하지 않고 모든 위치가 동일하게 나누어 떨어지게 작성하려고 노력한다. 나는 이번에 전체적으로 `flex` 로 나누었다. 그리고 자식 `div` 파란 테두리가 있는데 사이 간격이 있다 예전이라면 `margin-left` 또는 `margin-right:` 로 값을 주고 나머지 한쪽은 `margin-rigth || left:0`으로 잡았다. 이렇게 잡아도 동일하게 간격이 나누어지지만 깔끔하지가 않다. 그러던중 `flex`를 사용하면 `gap` 속성을 사용할 수 있는데 깔끔하게 사이 간격을 나누어준다. 다른 한쪽에 0을 따로 설정하지 않아도 된다. 너무나도 좋은 속성이다. 다음부터는 자주 사용할 것 같다. 이렇게 먼저 구조를 생각하지 않고 작성한다면 필요하지 않은 `div` 가 남발할 수 있다. 너무나 간단하고 기본이지만 그렇다고 대충하면 안되는 작업인걸 느꼈다 기본기를 탄탄하게 기르자~!

## Feat. 랜덤 목록 리스트

기능 구현 중 하나가 버튼을 클릭하면 목록 아이템들이 랜덤으로 바뀌게 구현해야 한다. 나는 아래와 같이 작성해서 구현을 하였다.

```jsx
state = {
	lists: [데이터 들어있음]
}

handleRandomButtonClick = () => {
    const lists = [];
    const itemLists = this.state.lists.map(item => item);
    for (let i = 0; i < this.props.products.length - 1; i++) {
      const randomLists = Math.floor(Math.random() * (itemLists.length - 1));
      lists.push(itemLists[randomLists + 1]);
    }
    this.setState({
      lists,
    });
  };

return (
      <>
       <button onClick={this.handleRandomButtonClick}> 랜덤 아이템 변경</button>
       {this.handleRandomButtonClick ? (
          <List>
            {lists &&
              lists.map(() => (
                <ListItem />
              ))}
          </List>
        ) : (
          <List>
            {products &&
              products.map(() => (
                <ListItem />
              ))}
          </List>
        )}
      </>
}
```

lists라는 빈 배열을 만들고 데이터 카피를 해서 for loop으로 순회 하며 random아이템들을 lists에 담는다.
setState에 lists를 넣어서 콘솔로 확인해 보면 정상적으로 랜덤하게 리스트들이 담는 것을 볼 수 있다.

이제 랜덤 함수를 작성은 했지만 순차적으로 정렬된 리스트 화면에서 어떻게 랜덤하게 보여줄지 고민이 있었다.
그러다가 생각난것이 삼항연산자로 분기 처리 하는것이였다. 그러면 처음에는 정렬되어있는 목록이지만 랜덤 버튼을 누르면 랜덤하게 아이템들이 변경 된다.
