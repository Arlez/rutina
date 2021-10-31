//medidor de indice de masa corporal
//formula: estatura al cuadrado divido el peso

function calcularIMC(estatura, peso){
    
    const estaturaCuadrado = Math.pow(estatura, 2);

    const resultado = peso / estaturaCuadrado;
    
    return resultado.toFixed(1);
}

calcularIMC(1.70, 70);