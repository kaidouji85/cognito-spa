import {Amplify} from 'aws-amplify'
import {getCurrentUser, signInWithRedirect} from "aws-amplify/auth"

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
          scopes: ['openid'],
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
  </div>
`

document.querySelector('#sign-in')!.addEventListener('click', async () => {
  await signInWithRedirect();
});

window.addEventListener("load", async () => {
  const user = await getCurrentUser();
  console.log(user);
});