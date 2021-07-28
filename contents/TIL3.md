---
date: '2021-07-28'
title: 'TIL03 | 블로그 Github Page 생성 및 Actions으로 자동화 하기'
categories: ['TIL', 'Git']
summary: 'gatsby 를 이용해서 블로그를 만들었고 호스팅을 위해 Github Page를 사용하기로 했다.'
thumbnail: 'https://images.velog.io/images/0715yk/post/b0a4b4b6-4ede-4c8c-9a40-02b36e0f5b6f/unnamed.jpg'
---

## Github Pages

`gatsby` 를 이용해서 블로그를 만들었고 배포 하기 위해 Github Pages를 사용하기로 했다. (Github Pages는 github 에서 제공하는 정적 웹사이트 호스팅 서비스이다) 그럼 Github Pages를 만들고 배포하는 법을 정리해 보았다.
먼저 Github Pages를 생성하려면 레퍼지토리를 만들어야 하는데 이름은 무조건 [**username].github.io로\*\* 만들어야 한다.

![1](https://user-images.githubusercontent.com/60437099/127360912-8cf3abc4-9cdb-4612-9b3e-ee1b398e1008.png)

이렇게 만들고, 자신의 프로젝트로 돌아와 몇가지 과정을 수행해야 한다. Github Pages에서는 master 브랜치에서 파일을 호스팅 하기 때문에 개발용 브랜치를 생성해서 개발을 진행하는것이 났다 그래서 아래와 같이 개발 브랜치로 이동 한다.

```jsx
git branch -m dev
git add .
git commit -m "블라블라"
git push -u origin dev
```

Github Pages 통해 배포를 진행하는 경우 `npm install -D gh-pages` 를 설치해줘야 한다. 설치를 하고 배포 스크립트를 `package.json` 에 추가한다. `"deploy": "gatsby build && gh-pages -d public -b master"`

<img width="958" alt="스크린샷 2021-07-29 오전 1 08 08" src="https://user-images.githubusercontent.com/60437099/127360946-61286056-9d4f-41ab-ab28-006a7f40d41d.png">

그리고 `gatsby-config.js` 로들 어가서 해당 주소 값으로 변경해준다.

<img width="622" alt="3" src="https://user-images.githubusercontent.com/60437099/127361027-e099a2f6-e3ca-4c9f-a728-430b10fe24ad.png">

그리고 `git remote add origin 'https://github.com/[username]/[username].github.io.git` 으로 연결하고 마지막으로`npm run deploy` 명령어를 통해 프로젝트를 배포한다 마지막에 Published가 나오면 성공적으로 배포한것이다. 그럼 해당 Github Pages 레포지토리로 가서 Setting < Pages로 가면 아래 사진과와 같이 배포가 성공적으로 된다. **끝!**

![4](https://user-images.githubusercontent.com/60437099/127361075-3326eeb6-471d-490c-9272-fb3d771e01b1.png)

## Github Actions

`npm run deploy` 하면 끝나긴 한다 하지만... 불편하고 귀찮다 작성할때마다 배포 명령어를 입력해야 한다. 그래서 쉬운 방법을 찾아보다가 Github Actions를 통해 자동화를 할수 있는걸 알게되었고 검색을 하였다. 그럼 어떻게 했는지 정리해 본다.

먼저 자신의 git > Settings > Developer settings > Personal access tokens에 들어가서 Generate new token을 클릭해서 키를 발급받아야 한다.

![1](https://user-images.githubusercontent.com/60437099/127365862-da7ccba5-82f7-4b11-a5a7-8dd1ef42cfe1.png)29\_오전\_1.40.34.png)

토큰을 생성하면 키가 발급되는데 다음에는 확인 할수 없기 때문에 안전한 곳에 저장해야 한다.

Github Pages의 레파지토리의 Settings > Secrets로 가서 New repostioty secret를 클릭한다.

Name에는 원하는 이름 value값에는 아까 얻은 토큰 값을 넣고 Add secret 버튼을 클릭하면 생성이 된다.
![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/e803f481-bf7d-4b4f-af52-07a2c251c266/스크린샷_2021-07-29_오전_1.45.20.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/e803f481-bf7d-4b4f-af52-07a2c251c266/스크린샷_2021-07-29_오전_1.45.20.png)

레파지토리에 Actions탭을 누르고 New workflow를 누른다음 set up a workflow yourself를 누른다.

그리고 이렇게 설정해 주웠다.

```jsx
name: gatsby build & deploy

on:
  push:
    branches:
      - dev
name: build gatsby
jobs:
  build_gatsby:
    name: build
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v1

      - name: gatsby build
        env:
          GH_API_KEY: ${{ secrets.API_KEY }}
        run: npm run build

      - name: deploy
        uses: maxheld83/ghpages@v0.2.1
        env:
          GITHUB_TOKEN: ${{ secrets.API_KEY }}
          GH_PAT: ${{ secrets.API_KEY }}
          BUILD_DIR: 'public/'
```

간단하게 흐름을 설명하면 dev브런치에 push를 할때 마다 아래 steps에 정의한 순서대로 actions이 실행된다.

몇가지 단어를 설명하면

`runs-on` : 실행환경

`steps`:정의한 순서대로 실행

`uses` : 어떤 액션을 사용할지 지정함 이미 만들어진 액션을 사용

`env` : ${{ secrets.API_KEY }} → API_KEY는 이전에 자기가 정한 이름을 넣어주면 된다 예를 들어 아까 Name에 GitToken이라고 했으면 ${{ secrets.GitToken }} 라고 하면 된다.

push 하면 `main.yml` 파일이 생성된다 성공하면 아래와 같이 된다.
![2](https://user-images.githubusercontent.com/60437099/127365945-819b0d97-f48a-46f1-8f55-fd19dd38b55a.png)

설정하고 배포하니 확실히 삶의 질이 달라지는 느낌이 든다.
![3](https://user-images.githubusercontent.com/60437099/127366054-12094ff1-74ec-4cd0-9fa0-8d34a27b51e4.png)

### Source

[https://velog.io/@cogito288/Gatsby로-만드는-Github-블로그](https://velog.io/@cogito288/Gatsby%EB%A1%9C-%EB%A7%8C%EB%93%9C%EB%8A%94-Github-%EB%B8%94%EB%A1%9C%EA%B7%B8)

[https://j3d-team.github.io/deploy_team_blog](https://j3d-team.github.io/deploy_team_blog)

[https://dailyco.tech/share/gatsby-blog-auto-deploy/](https://dailyco.tech/share/gatsby-blog-auto-deploy/)
