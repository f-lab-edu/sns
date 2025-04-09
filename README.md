# sns

sns

## 개발환경 설정

scripts:

- pnpm install
- pnpm run dev

libs:

- typescript
- eslint
- prettier
- nodemon
- jest
- express

sqlite3 라이브러리 오류 해결법 [출처 링크](https://github.com/TryGhost/node-sqlite3/issues/1783#issuecomment-2232994688)

> Error: Could not locate the bindings file. Tried:

```
> cd node_modules/sqlite3
> pnpm run rebuild
```

## 구현 기능

유저 (/users)

- 유저 추가 POST /
- 특정 유저 정보 반환 GET /:userId

포스트 (/post)

- 모든 게시글 반환 GET /
- 특정 게시글 반환 GET /:postId
- 새로운 게시글 추가 POST /

팔로우 (/follow)

- 팔로우 추가 POST /:targetId
- 팔로워 목록 반환 GET /:userId/followers
- 팔로잉 목록 반환 GET /:userId/followings

뉴스피드 (/newsfeed)

- 뉴스피드 목록 반환 GET /:userId