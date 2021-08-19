---
date: '2021-08-19'
title: 'TIL16 | Quick Sort'
categories: ['TIL']
summary: '과제를 진행하였는데 숫자를 입력하면 결과 필드에서 내림차순과 올림차순으로 정렬해야 하는 기능을 구현해야 했다.'
thumbnail: './images/TIL4.png'
---

과제를 진행하였는데 숫자를 입력하면 결과 필드에서 내림차순과 올림차순으로 정렬해야 하는 기능을 구현해야 했다. 여기에서 자바스크립트 정렬 메소드를 사용하지 않고 직접 정렬 알고리즘을 작성해야 했다. 처음에 버블정렬 알고리즘을 작성할려고 했었다. 이유는 로직 자체가 어렵지 않고 쉽고 빠르게 진행할수 있기 때문이였다. 하지만 공부하고 있는 입장에서 그렇게 좋은 방법은 아닌거 같다 그래서 정렬 중에서 가장 빠르다는 퀵 정렬을 선택하였다.

## 버블 정렬

위에서 말한 "적용해볼까?" 했던 알고리즘이다.

**장점**

- 구현이 매우 간단하다.

**단점**

- 해당 요소가 위치에 있는다고 해도 실행이 되고 길이의 상관없이 왼쪽부터 오른쪽까지 실행하기 때문에 시간복잡도는 `O(n^2)` 이다. 성능이 많이 안좋다.

```jsx
function bubbleSort(arr
	for(let i = 0; i < arr.length; i++) {
		let swap;
		for(let j = 0; j < arr.length - 1 - i; j++) {
			if(arr[j] > arr[j + 1]) {
				swap = arr[j];
				arr[j] = arr[j + 1];
				arr[j + 1] = swap;
			}
		}
		if(!swap) {
		break;
	}
	return arr;
}

bubbleSort([100, 55, 12, 62, 23, 1, 10, 39, 44]);
```

for문에 for문을 돌리고 현재 값과 다음값을 swap이라는 변수를 만들어서 현재 숫자와 다음 숫자를 비교 한 후 현재 값이 크다면 다음 값을 현재 값에 할당하고 현재 값을 다음 값에 할당한다. 이렇게 오른쪽 끝까지 반복한다.

## 퀵 정렬

퀵 정렬은 다른 요소와의 비교만으로 정렬을 수행하는 비교 정렬에 속한다. 퀵 정렬은 재수없는 경우에는 `O(n^2)` 의 복잡도가 걸리지만 평균적으로 `O(n log n)` 의 복잡도가 걸린다. 정렬 알고리즘중 제일 빠르게 작동한다.

```jsx
function partition(array, left, right, pivotIndex, isDescending) {
  let swap;
  let pivot = array[pivotIndex];
  while (left <= right) {
    if (isDescending) {
      while (array[left] > pivot) left++;
      while (array[right] < pivot) right--;
    } else {
      while (array[left] < pivot) left++;
      while (array[right] > pivot) right--;
    }
    if (left <= right) {
      swap = array[left];
      array[left] = array[right];
      array[right] = swap;
      left++;
      right--;
    }
  }
  swap = array[left];
  array[left] = array[pivotIndex];
  array[pivotIndex] = swap;
  return left;
}

function recursionSort(array, left, right, isDescending) {
  let pivotIndex = right;

  pivotIndex = partition(array, left, right - 1, pivotIndex, isDescending);

  if (left < pivotIndex - 1) {
    recursionSort(array, left, pivotIndex - 1, isDescending);
  }
  if (pivotIndex + 1 < right) {
    recursionSort(array, pivotIndex + 1, right, isDescending);
  }
  return array;
}

export default function numberSort(array, isDescending = false) {
  const left = 0;
  const right = array.length - 1;

  return recursionSort(array, left, right, isDescending);
}
```

이번에 작성하게 된 코드이다. 동작은 이렇다.

오름차순과 내림차순을 구현하기 때문에 `isDescending` 으로 구분을 한다. true라면 내림차순으로 작성하고 false라면 오름차순으로 작성되게끔 설계하였다. `pivot` 은 맨 오른쪽에 있는 숫자로 정하였다. `pivot` 을 기준으로 왼쪽에는 작은 숫자가 있고 오른쪽에는 높은 숫자자 있게끔 조정하였다. 왼쪽 수가 기준보다 작으면 넘어가고 크면 가만히 있는다. 오른쪽 수는 기준보다 크면 다음으로 넘어가고 작으면 가만히 있는다. 이렇게 재귀적으로 호출하면서 정렬하게 된다.
