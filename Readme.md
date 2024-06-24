# AWS Amplify勉強

このリポジトリはVanilla TypeScript + Cognito(Hosted UI) + Amplifyで構築した認証サンプルです。

## 必須ソフトウェア
* node.js(v20.15.0以上)
* npm(10.7.0以上)

## セットアップ
* Cognitoのユーザープールを以下条件で作成する
  * Hosted UIを有効にする
  * 許可されているコールバック URL、許可されているサインアウト URLに```http://localhost:5173```を設定する
* 本リポジトリ直下で以下コマンドを実行する
```bash
npm ci
# config.tsを作成し、適切な値をセットする
cp config.template.ts config.ts
```

## 動かし方

```bash
#　デフォルトだとhttp://localhost:5173で機動する
npm run start
```
