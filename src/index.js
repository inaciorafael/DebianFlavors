const os = require('os')
const moment = require('moment')
const inquirer = require('inquirer')
const shelljs = require('shelljs')

//functions
function sleep(seconds){
    shelljs.exec(`sleep ${seconds}`)
}

function apt(action, apps = []){    
    let cmd = `sudo apt-get`

    if(action === 'install'){
        apps.map((appName) => {
            if(!shelljs.which(appName)){
                shelljs.exec(`${cmd} install -y ${appName}`)
            }
        })
    }

    if(action === 'upgrade'){
        shelljs.exec(`${cmd} update`) 
        shelljs.exec(`${cmd} upgrade -y`)
    }

    if(action === 'clear'){
        shelljs.exec(`${cmd} -f install`) 
        shelljs.exec(`${cmd} autoremove`) 
    }

}

function npm(action, apps = []){
    const cmd = `sudo npm`

    if(action === 'install'){
        apps.map((appName) => {
            shelljs.exec(`${cmd} install -g ${appName}`)
        })
    }
}

//Messages
inquirer.prompt([
    {
        name: 'wellcome',
        message: `Ola, bem vindo ao linux flavors.`
    }
])

inquirer.prompt([
    {
        type: 'confirm',
        name: 'accept',
        message: 'Vamos comecar?'
    }
]).then((response) => {
    if(!response){
        console.log('Encerrando aplicacao...')
    }

    console.log(`Primeiro vamos instalar alguns programas`)
    sleep(0.5)
    console.log(`Precisamos da sua senha de root para instalar os programas`)
    sleep(0.5)
    console.log(`Sera necessario digitar a senha somente uma vez.`)
    sleep(0.5)
    apt('upgrade')  
    apt('install', ['vim', 'vlc', 'nodejs', 'npm', 'deluge' ])
    apt('clear')  
    npm('install', ['yarn'])
    console.log('passou por tudo')
})


