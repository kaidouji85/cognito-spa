import {Amplify} from 'aws-amplify'
import './style.css'
import {config} from '../config'

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: config.userPoolId,
      userPoolClientId: config.userPoolClientId,
    }
  }
});

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    hello
  </div>
`
