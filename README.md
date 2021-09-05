# React Router】ルーティング設定を管理しやすくするツール

## 概要

React Router は React でルーティングを設定したいときに大変重宝しますが、ページ数の増加やネストが深くなるにつれてコードが読みづらくなり、後からページやネストを追加するのが難しくなる問題があります。

本記事ではこれらの問題を解消するためのツールを作成したので紹介します。
簡単に説明すると設定データからルーティングを生成する仕組みとなっています。

## 前提

GitHub にデモ用のリポジトリを用意しましたので、これをローカルに入れていることを前提に説明します。

https://github.com/GrowUp-Haruno/react-router-easy-implementation

GitHub からダウンロード後、react-router-easy-implementation ディレクトリに入り、下記コマンドを実行して必要なモジュールをインストールします。

```
yarn install
```

インストールが完了後、下記コマンドで React の開発環境を起動します。

```
yarn start
```

各リンクを押すとページ遷移の動作が確認できます。
(設定されていないパスを入れた場合は「ページが見つかりません」ページに遷移します。)

![説明資料１.gif](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/890567/8d005fc5-6786-7db7-014c-960474d6e1e7.gif)

## ディレクトリ構造

```
./src
├── components
│   └── pages
│       ├── Page404.tsx # ページデータ
│       ├── Top.tsx     # ページデータ
│       ├── Users.tsx   # ページデータ
│       ├── User1.tsx   # ページデータ
│       ├── User2.tsx#  # ページデータ
│       └── router
│           ├── api                     # ツールのコア
│           ├── routes
│           │   ├── rootRoute.tsx       # localhost:3000/ のルーティング設定データ
│           │   └── usersRoute.tsx      # localhost:3000/users　のルーティング設定データ
│           └── types
│               └── RouteType.tsx       # ルーティング設定データの型定義
└── app.tsx # BrowserRouterとPageRouter.tsxをインポート
```

## 使い方(ルーティングの設定方法)

/src/components/pages/router/routes/rootRoute.tsx を開くと下記の内容となっています。
このファイルを編集すると、"/"ルートのルーティング設定ができます。

```tsx:/src/components/pages/router/routes/rootRoute.tsx
// 設定データの型定義
import { RouteType } from "../types/RouteType";

// ページコンポーネント
import { Top } from "../../Top";
import { Page404 } from "../../Page404";

// ネストの設定データ
import { usersRoute } from "./usersRoute";

export const rootRoute: Array<RouteType> = [
  {
    path: "/",
    exact: true,
    children: <Top />
  },
  {
    path: "/users",
    exact: false,
    children: usersRoute
  },
  {
    path: "*",
    exact: false,
    children: <Page404 />
  }
];

```

### ページ設定

rootRoute[0]には下記のオブジェクトが設定されています。

```tsx
{
  path: "/",
  exact: true,
  children: <Top />
}
```

children に ReactNode が設定されている場合、ページ設定と判断して下記のように変換します。

```tsx
<Route exact path="/" children={<Top />} />
```

### ネスト設定

一方、rootRoute[1]には下記のオブジェクトが設定されています。

```tsx
{
  path: "/users",
  exact: false,
  children: usersRoute
},
```

children の usersRoute は同階層の usersRoute.tsx からインポートしたデータです。
このファイルを編集すると、"/users"ルートのルーティングを設定できます。

```tsx:/src/components/pages/router/routes/usersRoute.tsx（抜粋）
export const usersRoute: Array<RouteType> = [
  {
    path: "/",
    exact: true,
    children: <Users />
  },
  {
    path: "/user1",
    exact: false,
    children: <User1 />
  },
  {
    path: "/user2",
    exact: false,
    children: <User2 />
  },
  {
    path: "*",
    exact: false,
    children: <Page404 />
  }
];
```

この様な配列データが入っている場合、ネスト設定と判断して最終的に次のように変換します。

```tsx
<Route
  path="/users"
  render={() => (
    <Switch>
      <Route exact path="/users" children={<Users />} />
      <Route path="/users/user1" children={<User1 />} />
      <Route path="/users/user2" children={<User2 />} />
      <Route path="/users/*" children={<Page404 />} />
    </Switch>
  )}
/>
```

もし、/user1 に対してネストを設定したい場合は、rootRoute.tsx や usersRoute.tsx の同階層に同様のファイルを用意してインポートすると設定できます。
再帰処理でネストを実現しているため、理論上いくらでもネストを設定することができます。

```tsx:例
  {
    path: "/user1",
    exact: false,
    children: <User1 />
  }
```

↓

```tsx
import user1Route from "./user1Route"
//中略
  {
    path: "/user1",
    exact: false,
    children: user1Route
  }
```

↓

```tsx
<Route path="/users" render={() => (
  <Switch>
    <Route exact path="/users" children={<Users />} />
    <Route path="/users/user1" render={() => (
      <Switch>
        <Route exact path="/users/user1" children={<User1 />} />
        <Route path="/users/user1/hoge" children={<Hoge />} />
        <Route path="/users/user1/*" children={<Page404 />} />
      </Switch>
    )}
    <Route path="/users/user2" children={<User2 />} />
    <Route path="/*" children={<Page404 />} />
  </Switch>
)}/>
```

## おまけ

> スニペット

/src/components/pages/router/routes/にルーティングのファイルを作成する際に便利な TypeScript のスニペットを用意しました。
react-router-page と入力するとスニペットが展開されます。
（"prefix"で呼び出し名の変更が可能）

```json:typescript.json
{
  "React Router Page Setting": {
    "prefix": "react-router-page",
    "body": [
      "// 設定データの型定義",
      "import { RouteType } from '../types/RouteType';",
      "",
      "export const ${TM_FILENAME_BASE}: Array<RouteType> = [",
      "\t{",
      "\t\tpath: '$1',",
      "\t\texact: $2,",
      "\t\tchildren: $3",
      "\t},",
      "];"
    ],
    "description": ""
  }
}
```

> 型定義について

設定データを安全に設定できるように Array\<RouteType\>で型を定義しています。
RouteType の定義は次の通りです。

```tsx:/src/components/pages/router/types/RouteType.tsx
import { ReactNode } from "react";

export type RouteType = {
  path: string;
  exact: boolean;
  children: ReactNode | Array<RouteType>;
};
```

##　最後
最後まで読んでいただきありがとうございます。
質問や改善点ございましたら、Qiita 記事の返信か GitHub のリポジトリへ issue をいただけると幸いです。
