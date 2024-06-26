# AWS Amplify勉強

このリポジトリはVanilla TypeScript + Cognito(Hosted UI) + Amplifyで構築した認証サンプルです。

## 必須ソフトウェア

* node.js(v20.15.0以上)
* npm(10.7.0以上)

## 事前作業

### Cognitoのユーザープールの作成

Cognitoのユーザープールを以下条件で作成する

* Hosted UIを有効にする
    * スコープにopenid, email, profile、phone、aws.cognito.signin.user.adminを追加する
* 許可されているコールバック URL、許可されているサインアウト URLに```http://localhost:5173```を設定する

### CognitoにGooogleのソーシャルログインを追加

Google Play ConsoleでOAuth2.0クライアントIDを以下条件で追加する。
この時に生成されるクライアントIDとクライアントシークレットを控えておく。

* 承認済みのリダイレクト URIに```https://<Cognitoのドメイン>/oauth2/idpresponse```を追加する

CognitoのアイデンティティプロバイダーにGoogleを以下条件で追加する。

* 許可されたスコープは```profile email openid```を指定
* 属性マッピングは以下のように設定

| Cognito属性          | Google属性 |
|--------------------|----------|
| email              | email    |
| picture            | picture  |
| preferred_username | name     |

## セットアップ

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
