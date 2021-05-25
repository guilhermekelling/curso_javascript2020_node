function esperarPor(tempo = 2000) {
    return new Promise(function(resolve) {
        setTimeout(() => resolve(), tempo)
    })
}

function retornarValor() {
    return new Promise(resolve => {
        setTimeout(() => resolve(10), 5000)
    })
}

function retornarValorRapido() {
    return 20
}

async function executar() {
    let valor = await retornarValorRapido()

    await esperarPor(1500)
    console.log(`Async/Await ${valor}...`)

    await esperarPor(1500)
    console.log(`Async/Await ${valor + 1}...`)

    await esperarPor(1500)
    console.log(`Async/Await ${valor + 2}...`)

    return valor + 3
}

executar().then(console.log)


//Exemplo 2
function gerarNumerosEntre(min, max, numerosProibidos) {
    if(min > max) [max, min] = [min, max]    
    return new Promise((resolve, reject) => {
        const fator = max - min + 1 
        const aleatorio = parseInt(Math.random() * fator) + min
        if(numerosProibidos.includes(aleatorio)) {
            reject('Número repetido!!')
        } else {
            resolve(aleatorio)
        }
    })
}
/*
gerarNumerosEntre(1,5, [1, 2, 4])
    .then(console.log)
    .catch(console.log)
*/
async function gerarMegaSena(qtdNumeros, tentativas = 1) {  
    try{
        const numeros = []
        for(let _ of Array(qtdNumeros).fill()){
            numeros.push(await gerarNumerosEntre(1, 60, numeros))
        }
        return numeros
    } catch(e) {
        if(tentativas > 10){
            throw "Não deu certo!"
        } else {
            return gerarMegaSena(qtdNumeros, tentativas + 1)
        }
    }
}

gerarMegaSena(8)
    .then(console.log)
    .catch(console.log)
