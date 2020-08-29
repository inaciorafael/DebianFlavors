const os = require('os')
const moment = require('moment')
const inquirer = require('inquirer')
const shelljs = require('shelljs')

//Troque o link do wallpaper.
const wallpaper = `https://images7.alphacoders.com/698/698363.png`

//Adicione ou remova os programas como quiser.
const programs = ['vim', 'vlc', 'feh','ranger', 'compton', 'wget', 'curl', 'gimp', 'weechat', 'nodejs', 'npm', 'deluge','i3blocks','i3status', 'python3-pip' ]
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
    const cmd = `sudo apt-get`

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

function i3Dir(){
    shelljs.cd('~')
    shelljs.cd('.config/i3')
}

function i3wmEssentialsDir(){
    shelljs.cd('~')
    shelljs.cd('.i3wmEssentials')
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
    console.log('Baixando papel de parede...')
    sleep(2)
    jumpLine(1)
    shelljs.exec(`mkdir ~/.i3wmEssentials`)
    shelljs.exec(`mkdir ~/.i3wmEssentials/Wallpaper`)
    shelljs.exec(`cd ~/.i3wmEssentials/Wallpaper && wget -O wallpaper.png ${wallpaper}`)
    console.log(`Configurando papel de parede...`)
    i3Dir()
    shelljs.exec(`echo "exec --no-startup-id feh --bg-fill ~/.i3wmEssentials/Wallpaper/wallpaper.png" >> ~/.config/i3/config`)
    console.log(`Modificacao so fara efeito apos a reinicializacao.`)
    jumpLine(1)
    i3wmEssentialsDir()
    // shelljs.exec(`chmod +x polybarInstall`)
    // shelljs.exec(`./polybarInstall --install`)

})

