const os = require('os')
const moment = require('moment')
const inquirer = require('inquirer')
const shelljs = require('shelljs')

const programs = ['vim', 'vlc', 'weechat', 'nodejs', 'npm', 'deluge', 'python3-pip' ]
const npmTools = ['yarn']

//functions
function jumpLine(numberOfLines){
    for(let i = 0; i < numberOfLines; i++){
        shelljs.echo('')
    }
}

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

//Interaction
inquirer.prompt([
    {
        name: 'wellcome',
        message: `Ola, bem vindo ao Debian flavors.`
    }
])

inquirer.prompt([
    {
        type: 'confirm',
        name: 'accept',
        message: 'Vamos comecar?'
    }
]).then((response) => {
    if(!response.accept){
        console.log('Encerrando aplicacao...')
        jumpLine(1)
        return 
    }

    let initJobTime = moment().format()

    console.log(`Primeiro vamos instalar alguns programas`)
    sleep(0.5)
    console.log(`Precisamos da sua senha de root para instalar os programas`)
    sleep(0.5)
    console.log(`Sera necessario digitar a senha somente uma vez.`)
    sleep(0.5)
    apt('upgrade')  
    apt('install', programs)
    apt('clear')  
    npm('install', npmTools)
    jumpLine(1)
    console.log(`Processo terminado ${moment(initJobTime).locale('pt-br').fromNow()}`)
    jumpLine(1)

    inquirer.prompt([
        {
            type: 'list',
            name: 'toggleNextAction',
            message: 'Parece que fizemos o basico, qual e o proximo passo?',
            choices: ['Vizualizar opcoes extras', 'Sair'],
        }
    ]).then(answer => {
        console.log(answers.toggleNextAction)
        inquirer.prompt([
            {
                type: 'checkbox',
                name: 'extraOptions',
                message: 'Selecione as opcao desejada',
                choices: ['Ambiente Grafico i3Wm', 'Ferramentas', 'Dev configs']
            }
        ]).then((answer) => {
            
        })
    })
    
})

// i3 i3-wm i3status

