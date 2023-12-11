const fs = require('fs');

fs.readFile('input/file.tu', 'utf8', function(err, data) {
    if (err) {
        console.error(err);
        return;
    }
    //console.log(data);

    const lines = data.split('\n'); // Divide o texto em linhas

    for (let i = 0; i < lines.length; i++) {
        //console.log('>>>>>>> ' + lines[i])

        if (lines[i].startsWith('    ' || '  ')) {
            // Verifica se a próxima linha não tem espaçamento antes
            if (i + 1 < lines.length && !lines[i + 1].startsWith('    ' || '  ')) {
                lines[i] = lines[i].trim() + '\n}';
            }
        }

        if (lines[i].includes('->')) {
            lines[i] = lines[i].replace(/->/g, '='); // Troca '->' por '='
            lines[i] = 'let ' + lines[i]; // Adiciona 'var' no início da linha
        }

        if (lines[i].includes('se ')) {
            lines[i] = lines[i].replace('se ', 'if(');
            lines[i] = lines[i].trim() + "){";
        }

        if (lines[i].includes('para ')) {
            lines[i] = lines[i].replace('let ', '');
            lines[i] = lines[i].replace(',', ';');
            lines[i] = lines[i].replace(',', ';');
            lines[i] = lines[i].replace('para ', 'for(let ');
            lines[i] = lines[i].trim() + "){";
        }

        if (lines[i].includes('enquanto ')) {
            lines[i] = lines[i].replace('let ', '');
            lines[i] = lines[i].replace('enquanto ', 'while(');
            lines[i] = lines[i].trim() + "){";
        }

        if (lines[i].includes('senao')) {
            lines[i] = lines[i].replace('senao', 'else{');
        } 
        
        if (lines[i].includes('imprima ')) {
            lines[i] = lines[i].replace('imprima ', 'console.log(');
        }

        if (lines[i].includes('console.log(') && (lines[i][lines[i].length - 1] !== '}')) {
            lines[i] = lines[i].trim() + ")";
        }

        if (lines[i].includes('console.log(') && (lines[i][lines[i].length - 1] === '}')) {
            lines[i] = lines[i].slice(0, -1);
            lines[i] = lines[i].trim() + ')\n}';
        }
   

    }

    const dataConverted = lines.join('\n'); // Junta as linhas novamente em um único texto
    

    const arquivoJS = 'output/file.js'; // Nome do arquivo .js que será criado
    fs.writeFile(arquivoJS, dataConverted, function(err) {
        if (err) {
            console.error(err);
            return;
        }
        //console.log(`Arquivo ${arquivoJS} criado com sucesso!`);
    });

});
