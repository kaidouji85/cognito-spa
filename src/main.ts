import {Amplify} from 'aws-amplify'
import {getCurrentUser, fetchUserAttributes, signInWithRedirect, signOut} from "aws-amplify/auth"

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
  <div>
    hello
    <button id="sign-in">サインイン（Hosted UI）</button>
    <button id="sign-out">サインアウト</button>
  </div>
`

document.querySelector('#sign-in')?.addEventListener('click', async () => {
  await signInWithRedirect();
});

document.querySelector('#sign-out')?.addEventListener('click', async () => {
  await signOut();
});

window.addEventListener("load", async () => {
  const user = await getCurrentUser();
  console.log(user);

  const userAttributes = await fetchUserAttributes();
  console.log(userAttributes);
});