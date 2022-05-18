let info = {
  personagem: "Margarida",
  origem: "Pato Donald",
  nota: "Namorada do personagem principal nos quadrinhos do Pato Donald",
  recorrente: "Sim"
};

let info2 = {
  personagem: "Tio Patinhas",
  origem: "Christmas on Bear Mountain, Dell's Four Color Comics #178",
  nota: "O último MacPatinhas",
  recorrente: "Sim"
}

function greetCharacter(name) {
  console.log("Bem vinda, " + name);
}

function getObjKeys(obj) {
  for (let i in obj) {
    console.log(i);
  }
}

function getObjKeyValues(obj) {
  for (let i in obj) {
    console.log(obj[i]);
  }
}

function getBothInfo(obj1, obj2) {
  for (let i in obj1) {
    if (obj1[i] === "Sim" && obj2[i] === "Sim") {
      console.log("Ambos recorrentes");
    }
    else {
      console.log(obj1[i] + " e " + obj2[i]);
    }
  }
}

/////////////////////////////////////////////////////////////

let leitor = {
  nome: 'Julia',
  sobrenome: 'Pessoa',
  idade: 21,
  livrosFavoritos: [
    {
      titulo: 'O Pior Dia de Todos',
      autor: 'Daniela Kopsch',
      editora: 'Tordesilhas',
    },
  ],
};

console.log("O livro favorito de " + leitor.nome + " " + leitor.sobrenome + " se chama '" + leitor.livrosFavoritos[0].titulo + "'");

leitor.livrosFavoritos.push(
  {
    titulo: 'Harry Potter e o Prisioneiro de Azkaban',
    autor: 'JK Rowling',
    editora: 'Rocco',
  }
);

console.log(leitor.nome + " tem " + leitor.livrosFavoritos.length + " livros favoritos.");
