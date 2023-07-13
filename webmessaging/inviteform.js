'use strict'

//Variables to change in your deployment
const deploymentId = 'b9c07add-2ac6-45f5-8be8-bf608e215f3f' //Your WebMessenger DeploymentId
const hexColor = '#0D6EFD' //Color theme

function toggleMessenger() {
  const customAttributes = {
    FirstName: document.getElementById('fname').value,
    LastName: document.getElementById('lname').value,
    PhoneNumber: document.getElementById('phonenumber').value,
    Country: document.getElementById('country').value,
    Language: document.getElementById('language').value,
    EmailAddress: document.getElementById('email').value,
    ProblemCategory1: document.getElementById('problemCategory1').value,
    ProblemCategory2: document.getElementById('problemCategory2').value,
    SerialNumber: document.getElementById('serialNumber').value,
    Device: document.getElementById('device').value,
    DeviceOwner: document.getElementById('deviceOwner').value,
    DeviceOwnerNumber: document.getElementById('deviceOwnerNumber').value,
  }
  console.log(formData);
  Genesys(
    'command',
    'Messenger.open',
    {},
    function (o) {
      closeLauncher()
      Genesys('command', 'Database.set', {
        messaging: {
          customAttributes,
        },
      })
    },
    function (o) {
      Genesys('command', 'Messenger.close')
    }
  )
}

function closeLauncher() {
  let input = document.getElementById('input')
  input.hidden = true
  console.log('Hiding...')
}

function openLauncher() {
  let session = JSON.parse(localStorage.getItem(`_${deploymentId}:gcmcsessionActive`))
  let input = document.getElementById('input')
  console.log(session?.value)
  if (session?.value) {
    console.log('Opening Widget...')
    Genesys(
      'command',
      'Messenger.open',
      {},
      function (o) {
        closeLauncher()
      },
      function (o) {
        Genesys('command', 'Messenger.close')
      }
    )
  } else {
    console.log('showing...')
    input.hidden = false
  }
}

//Create Launcher
let launcher = document.createElement('button')
launcher.onclick = function () {
  openLauncher()
}
launcher.style = `cursor: pointer;
      box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 5px -2px, rgba(0, 0, 0, 0.14) 0px 1px 4px 2px, rgba(0, 0, 0, 0.12) 0px 1px 4px 1px;
      position: fixed !important;
      bottom: 30px !important;
      width: 56px;
      height: 56px;
      right: 30px !important;
      border-radius: 50%;
      background-color: ${hexColor};
      z-index: 9999;
      border: 0px;`
launcher.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#FFFFFF"><path d="M0 0h24v24H0z" fill="none"/><path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/></svg>`
document.body.appendChild(launcher)

//Create Input Form
let input = document.createElement('div')

let header = document.createElement('div')
let title = document.createElement('p')
let minButton = document.createElement('button')

let content = document.createElement('div')

let form = document.createElement('div')
let fnameL = document.createElement('label')
let fnameI = document.createElement('input')

let lnameL = document.createElement('label')
let lnameI = document.createElement('input')

let phonenumberL = document.createElement('label')
let phonenumberI = document.createElement('input')

let countryL = document.createElement('label')
let countryI = document.createElement('input')

let languageL = document.createElement('label')
let languageI = document.createElement('input')

let emailL = document.createElement('label')
let emailI = document.createElement('input')

let problemCategory1L = document.createElement('label')
let problemCategory1S = document.createElement('select')
let option11 = document.createElement('option')
let option12 = document.createElement('option')
let option13 = document.createElement('option')

let problemCategory2L = document.createElement('label')
let problemCategory2S = document.createElement('select')
let option21 = document.createElement('option')
let option22 = document.createElement('option')

let serialNumberL = document.createElement('label')
let serialNumberI = document.createElement('input')

let deviceL = document.createElement('label')
let deviceI = document.createElement('input')

let deviceOwnerL = document.createElement('label')
let deviceOwnerI = document.createElement('input')

let deviceOwnerNumberL = document.createElement('label')
let deviceOwnerNumberI = document.createElement('input')

let submit = document.createElement('button')

input.id = 'input'
input.hidden = true
input.style = `box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 5px -2px, rgba(0, 0, 0, 0.14) 0px 1px 4px 2px, rgba(0, 0, 0, 0.12) 0px 1px 4px 1px;
      position: fixed !important;
      bottom: 30px !important;
      width: 408px;
      height: 648px;
      right: 30px !important;
      background-color: white;
      z-index: 99999;`
header.style = `display: inline-flex;
      background-color: ${hexColor};
      color: white;
      font-size: 1.33929rem;
      line-height: 2.6;
      font-weight: 400;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen-Sans, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', 'sans-serif';
      width: 100%;
      height: 60px;`
title.style = `margin: 0;
      padding-left: 25px;`
title.innerText = 'Please give us some info'
minButton.style = `position: absolute;
      width: 50px;
      right: 8px;
      top: 15px;
      cursor: pointer;
      filter: invert(1);
      border: 0;
      background-color: transparent`
minButton.onclick = function () {
  closeLauncher()
}
minButton.tabIndex = 0
minButton.ariaLabel = 'Minimize the Messenger'
minButton.innerHTML = `<svg id="svgid" viewBox="0 0 24 24" style="width: 26px; height: 26px;">
<title>window-minimize</title>
<path d="M19 13H5v-2h14v2z"></path>
</svg>`
header.appendChild(title)
header.appendChild(minButton)
input.appendChild(header)

content.style = `height: 580px; width: 100%; overflow-y: scroll;`

form.style = `padding: 25px;`
const styleItemLabel = `font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen-Sans, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', 'sans-serif';`
const styleItemInput =  `      width: 100%; padding: 12px 20px; margin: 8px 0; display: inline-block; border: 1px solid #ccc; border-radius: 4px; box-sizing: border-box;`

fnameL.innerText = 'First Name'
fnameL.style = styleItemLabel
fnameI.id = 'fname'
fnameI.style = styleItemInput
fnameI.placeholder = 'Your first name..'

lnameL.innerText = 'Last Name'
lnameL.style = styleItemLabel
lnameI.id = 'lname'
lnameI.style = styleItemInput
lnameI.placeholder = 'Your last name..'

phonenumberL.innerText = 'Phone Number'
phonenumberL.style = styleItemLabel
phonenumberI.id = 'phonenumber'
phonenumberI.style = styleItemInput
phonenumberI.placeholder = 'Your phone number..'

countryL.innerText = 'Country'
countryL.style = styleItemLabel
countryI.id = 'country'
countryI.style = styleItemInput
countryI.placeholder = 'Your country..'

languageL.innerText = 'Language'
languageL.style = styleItemLabel
languageI.id = 'language'
languageI.style = styleItemInput
languageI.placeholder = 'Your language..'

emailL.innerText = 'Email Address'
emailL.style = styleItemLabel
emailI.id = 'email'
emailI.style = styleItemInput
emailI.placeholder = 'Your email address..'

problemCategory1L.innerText = 'Problem Category1'
problemCategory1L.style = styleItemLabel
problemCategory1S.id = 'problemCategory1'
problemCategory1S.style = styleItemInput
option11.value = 'device'
option11.innerText = 'Device'
option12.value = 'network'
option12.innerText = 'Network'
option13.value = 'system'
option13.innerText = 'System'

problemCategory2L.innerText = 'Problem Category2'
problemCategory2L.style = styleItemLabel
problemCategory2S.id = 'problemCategory2'
problemCategory2S.style = styleItemInput
option21.value = 'voice'
option21.innerText = 'Voice'
option22.value = 'screen'
option22.innerText = 'Screen'

serialNumberL.innerText = 'Serial Number'
serialNumberL.style = styleItemLabel
serialNumberI.id = 'serialNumber'
serialNumberI.style = styleItemInput
serialNumberI.placeholder = 'Your serial number..'

deviceL.innerText = 'Device'
deviceL.style = styleItemLabel
deviceI.id = 'device'
deviceI.style = styleItemInput
deviceI.placeholder = 'Your device..'

deviceOwnerL.innerText = 'Device Owner'
deviceOwnerL.style = styleItemLabel
deviceOwnerI.id = 'deviceOwner'
deviceOwnerI.style = styleItemInput
deviceOwnerI.placeholder = 'Your device owner..'

deviceOwnerNumberL.innerText = 'Device Owner Number'
deviceOwnerNumberL.style = styleItemLabel
deviceOwnerNumberI.id = 'deviceOwnerNumber'
deviceOwnerNumberI.style = styleItemInput
deviceOwnerNumberI.placeholder = 'Your device owner number..'

submit.style = `width: 100%;
background-color: ${hexColor};
color: white;
padding: 14px 20px;
margin: 100px 0 0 0;
border: none;
border-radius: 4px;
cursor: pointer;`
submit.innerText = 'Submit'
submit.onclick = function () {
  toggleMessenger()
}

problemCategory1S.appendChild(option11)
problemCategory1S.appendChild(option12)
problemCategory1S.appendChild(option13)

problemCategory2S.appendChild(option21)
problemCategory2S.appendChild(option22)

form.appendChild(fnameL)
form.appendChild(fnameI)

form.appendChild(lnameL)
form.appendChild(lnameI)

form.appendChild(phonenumberL)
form.appendChild(phonenumberI)

form.appendChild(countryL)
form.appendChild(countryI)

form.appendChild(languageL)
form.appendChild(languageI)

form.appendChild(emailL)
form.appendChild(emailI)


form.appendChild(problemCategory1L)
form.appendChild(problemCategory1S)

form.appendChild(problemCategory2L)
form.appendChild(problemCategory2S)

form.appendChild(serialNumberL)
form.appendChild(serialNumberI)

form.appendChild(deviceL)
form.appendChild(deviceI)

form.appendChild(deviceOwnerL)
form.appendChild(deviceOwnerI)

form.appendChild(deviceOwnerNumberL)
form.appendChild(deviceOwnerNumberI)

form.appendChild(submit)
content.appendChild(form)
input.appendChild(content)

document.body.appendChild(input)

//listen to screen sizing for mobile & dynamic pc
function sizeChanged() {
  if (window.innerWidth < 600 && screenSize != 'mobile') {
    screenSize = 'mobile'
    let input = document.getElementById('input')
    input.style.width = '100%'
    input.style.height = '100%'
    input.style.bottom = 0
    input.style.right = 0
  }
  if (window.innerWidth > 600 && screenSize != 'pc') {
    screenSize = 'pc'
    let input = document.getElementById('input')
    input.style.width = '408px'
    input.style.height = '648px'
    input.style.bottom = '30px'
    input.style.right = '30px'
  }
}

let screenSize = ''
window.addEventListener('resize',sizeChanged)
sizeChanged()
