import {Amplify} from 'aws-amplify'
import {
  deleteUser,
  getCurrentUser,
  fetchAuthSession,
  fetchUserAttributes,
  signInWithRedirect,
  signOut
} from "aws-amplify/auth"

import './style.css'
import {config} from '../config'

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: config.userPoolId,
      userPoolClientId: config.userPoolClientId,
      loginWith: {
        oauth: {
          domain: config.hostedUIDomain,
          scopes: [
            'openid',
            'email',
            'profile',
            'phone',
            'aws.cognito.signin.user.admin'
          ],
          redirectSignIn: [config.redirectURL],
          redirectSignOut: [config.redirectURL],
          responseType: 'code',
        }
      }
    }
  }
});

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div class="cognito-spa">
    <h2>amplifyのサンドボックス</h2>
    <div class="cognito-spa__caption">各種関数の実行結果はconsoleに出力される。</div>
    <button id="sign-in">サインイン（Hosted UI）</button>
    <button id="fetch-auth-session">fetchAuthSession</button>
    <button id="get-current-user">getCurrentUser</button>
    <button id="fetch-user-attributes">fetchUserAttributes</button>
    <button id="delete-user">deleteUser</button>
    <button id="sign-out">サインアウト</button>
  </div>
`

document.querySelector('#sign-in')?.addEventListener('click', async () => {
  await signInWithRedirect();
});

document.querySelector('#fetch-auth-session')?.addEventListener('click', async () => {
  const authSession = await fetchAuthSession();
  console.log(authSession);
  // APIに渡すアクセストークンはこのように取得する
  const accessToken = authSession.tokens?.accessToken.toString() ?? "";
  console.log(accessToken);
});

document.querySelector('#get-current-user')?.addEventListener('click', async () => {
  const user = await getCurrentUser();
  console.log(user);
});

document.querySelector('#fetch-user-attributes')?.addEventListener('click', async () => {
  const userAttributes = await fetchUserAttributes();
  console.log(userAttributes);
});

document.querySelector('#delete-user')?.addEventListener('click', async () => {
  // ユーザー削除に成功するとサインアウトされる
  // 正確にはOAuthSignOutにリダイレクトされ、そこから本ページに再度リダイレクトしている
  await deleteUser();
});

document.querySelector('#sign-out')?.addEventListener('click', async () => {
  // サインアウトに成功するとページがリロードされる
  // 正確にはOAuthSignOutにリダイレクトされ、そこから本ページに再度リダイレクトしている
  await signOut();
});
