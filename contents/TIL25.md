---
date: '2022-10-22'
title: 'git reset --hard'
categories: ['TIL']
summary: '기능 개발을 마치고 커밋을 할 상황이 되었다. 모두 stage에 올리지 않고 한 개의 변경 사항만 stage에 올린 상태에서 commit을 하였고 다시 되돌리려고...'
thumbnail: './images/TIL1.png'
---

### Git을 잘 알고 활용하자...

- 기능 개발을 마치고 커밋을 할 상황이 되었다. 모두 stage에 올리지 않고 한 개의 변경 사항만 stage에 올린 상태에서 commit을 하였고 다시 되돌리려고 git reset --hard 을 사용하였다. 생각 한 것처럼 커밋 전 파일들이 보이지 않고 변경 전에 코드들로 돌아갔다. 순간 뇌 정지가 왔고 구글링해서 찾아보니 git reflog 로 커밋 로그를 확인하여 git reset 이전으로 되돌릴 수 있다고 하여 git reset —hard {해당 커밋 로그 해쉬} 을 입력하였지만, stage가 안된 파일들은 여전히 돌아오지 않았다. 그래서 좀 더 검색해서 확인해보니 최종 커밋 이후에 변경사항이 있는데 그 부분을 커밋하지 않고 reset —hard 를 진행 했다면 working directory 까지 돌아가기 때문에 git reflog 를 활용한다고 해도 복구 할 수 없다는 정보를 확인 하였다. 조금 좌절이였지만 다행히 변경된 사항이 작은 단위였기 때문에 금방 다시 작업을 하였고, 결론은 git reset —hard 명령어를 사용할 때는 정말 주의해서 사용하자는 교훈을 얻었다.
  git에 대해 더 공부할 필요가 있다.
