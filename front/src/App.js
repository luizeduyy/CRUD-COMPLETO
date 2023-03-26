import { useEffect, useState } from 'react';
import './App.css';
import Formulario from './Formulario';
import Tabela from './Tabela';

function App() {

  //objeto produto = vai sr um json
  const produto = {
    codigo: 0,
    nome: '',
    marca: ''
  }

  //useState
  const [btnCadastrar, setBtnCadastrar] = useState(true); //personalizar os botoes
  const [produtos, setProdutos] = useState([]);
  const [objProduto, setObjProduto] = useState(produto);

  //useEffect
  useEffect(() => {
    fetch("http://localhost:8080/listar")
      .then(retorno => retorno.json())
      .then(retorno_convertido => setProdutos(retorno_convertido));
  }, []);// se nao tiver com colchetes, vai haver varias requisições na nossa api, por isso necessario os colchetes

  //obtendo os dados do formulario
  const aoDigitar = (e) => {
    setObjProduto({ ...objProduto, [e.target.name]: e.target.value });
  }

  //cadastrar prooduto
  const cadastrar = () => {
    fetch("http://localhost:8080/cadastrar", {
      method: 'post',
      body: JSON.stringify(objProduto),
      headers: {
        'Content-type': 'application/json',
        'Acecept': 'aplication/json'
      }
    })
      .then(retorno => retorno.json())
      .then(retorno_convertido => {
        if (retorno_convertido.mensagem !== undefined) {
          alert(retorno_convertido.mensagem);
        } else {
          setProdutos([...produtos, retorno_convertido]);
          alert("Produto efetuado com sucesso");
          limparFormulario();
        }
      })
  }

  //alterar prooduto
  const alterar = () => {
    fetch("http://localhost:8080/alterar", {
      method: 'put',
      body: JSON.stringify(objProduto),
      headers: {
        'Content-type': 'application/json',
        'Acecept': 'aplication/json'
      }
    })
      .then(retorno => retorno.json())
      .then(retorno_convertido => {

        if (retorno_convertido.mensagem !== undefined) {
          alert(retorno_convertido.mensagem);
        } else {
          alert("Produto alterado com sucesso");

          //copia vetor produtos
          let vetorTemp = [...produtos];

          //indice 
          let indice = vetorTemp.findIndex((p) => {
            return p.codigo === objProduto.codigo;
          });

          //alterar produto do vetorTemp
          vetorTemp[indice] = objProduto;

          //atualizar vetor produtos
          setProdutos(vetorTemp);

          //limpar o forms
          limparFormulario();
        }

      })
  }

  //remover produto
  const remover = () => {
    fetch("http://localhost:8080/remover/" + objProduto.codigo, {
      method: 'delete',
      headers: {
        'Content-type': 'application/json',
        'Acecept': 'aplication/json'
      }
    })
      .then(retorno => retorno.json())
      .then(retorno_convertido => {

        //mensagem
        alert(retorno_convertido.mensagem);

        //copia vetor produtos
        let vetorTemp = [...produtos];

        //indice 
        let indice = vetorTemp.findIndex((p) => {
          return p.codigo === objProduto.codigo;
        });

        //remover produto do vetorTemp
        vetorTemp.splice(indice, 1);

        //atualizar vetor produtos
        setProdutos(vetorTemp);

        //limpar forms
        limparFormulario();

      })
  }
  //limpeza dos campos
  const limparFormulario = () => {
    setObjProduto(produto);
    setBtnCadastrar(true);
  }


  //selecionar produtoo
  const selecionarProduto = (indice) => {
    setObjProduto(produtos[indice]);
    setBtnCadastrar(false);
  }


  //retorno
  return (
    <div>
      <Formulario botao={btnCadastrar} eventoTeclado={aoDigitar} cadastrar={cadastrar} obj={objProduto} cancelar={limparFormulario} remover={remover} alterar={alterar}/>
      <Tabela vetor={produtos} selecionar={selecionarProduto} />
    </div>
  );
}

export default App;
