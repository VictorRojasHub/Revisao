import axios from 'axios';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, View, Image, TextInput } from 'react-native';


export default function App() {
  const [contador, setContador]  = useState(0);
  const [cep, setCep] = useState('')
  const [endereco, setEndereco] = useState<any>(null) // Variável para contar
  
  useEffect(() => {
    carregarCepInicial();

  }, []);
  

  async function carregarCepInicial() {
    let resposta = axios.get('https://viacep.com.br/ws/09390-120/json/')
    let novoEndereco = (await resposta).data; // Carrega o CEP inicial
    setEndereco(novoEndereco) // Carrega o CEP inicial
  }

  function contar() {
    setContador(contador+1) // Incrementa o contador
    console.log('Contador:', contador); // Imprime o valor atual do contador

  }

  async function pesquisarCEP()  {
    let url = `https://viacep.com.br/ws/${cep}/json/`;
    let resposta = await fetch(url); // Faz a requisição para a API
    let enderecoNovo = await resposta.json();
    console.log('Retorno da pesquisa:', enderecoNovo); // Imprime o retorno da pesquisa
    setEndereco(enderecoNovo) // URL da API de CEP
  }

  return (
    <View style={styles.container}>
      <Text>Contando : {contador}</Text>
      <StatusBar style="auto" />
      <Button  title='Contar' onPress={contar}></Button>
      <Image source={{ uri: 'https://placehold.co/150' }} style={{ width: 150, height: 150 }} /> 
      <TextInput onChangeText={setCep} value={cep} ></TextInput>
      <Button title='Enviar CEP' onPress={pesquisarCEP}></Button>
      <View style={styles.card}>
        <Text>CEP: {cep}</Text>
        {endereco && <View>
          <Text>Rua: {endereco.logradouro}</Text>
          <Text>Bairro: {endereco.bairro}</Text>
          <Text>Cidade: {endereco.localidade}</Text>
          <Text>Estado: {endereco.uf}</Text>
          </View> }
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card:{
    padding: 20, // Espaçamento interno
    margin: 10, // Espaçamento externo
    borderWidth: 1, // Borda
    borderColor: '#ccc', // Cor da borda
    borderRadius: 5, // Bordas arredondadas

  }
  
});
