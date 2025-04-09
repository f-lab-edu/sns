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
