import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

let timer = null;
let ss = 0;
let mm = 0;
let hh = 0;

export default function cronoApp() {

  const[numero, setNumero] = useState(0);
  const[botao, setBotao] = useState('Iniciar');
  const[ultimo, setUltimo] = useState(null);

  function vai(){
    if(timer !== null){
      clearInterval(timer);
      timer = null;
      setBotao('Iniciar');
    }else{
      timer = setInterval(()=>{ 
        ss++;
        if(ss == 60){
          ss=0;
          mm++;
        }
        if(mm == 60){
          mm=0;
          hh++;
        }

        let format = 
        (hh < 10 ? '0'+hh : hh)+ ':'
        +(mm < 10 ? '0'+mm : mm) + ':'
        +(ss < 10 ? '0'+ss : ss);

        setNumero(format);
        
      }, 1000)
      setBotao('Parar');
    }
  }
  function limpar(){
    if(timer !== null){
      clearInterval(timer);
      timer = null;
      
    }
    setUltimo(numero);
    setNumero(0);
    ss = 0;
    mm = 0;
    hh = 0;
    setBotao('Iniciar');
  }

 return (
   <View style={styles.container}>
    <Image 
      source={require('./src/crono.png')}
    />
    <Text style={styles.timer}>{numero}</Text>

    <View style={styles.btnArea}>
      <TouchableOpacity style={styles.btn} onPress={vai}>
        <Text style={styles.btnTexto}>{botao}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.btn} onPress={limpar}>
        <Text style={styles.btnTexto}>Zerar</Text>
      </TouchableOpacity>
    </View>
    <View style={styles.areaUltima}>
      <Text style={styles.textUlt}> 
      { ultimo ? 'Último tempo : ' + ultimo : ''}
      </Text>
    </View>

    
   </View>
  );
}

const styles = StyleSheet.create({

  container:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00aeef'
  },
  timer:{
    textAlign: 'center',
    fontSize: 45,
    marginTop: -160,
    marginBottom:10,
    color:'#ffffff',
    fontWeight: 'bold'
  },
  btnArea:{
    flexDirection: 'row',
    marginTop: 130,
  },
  btn:{
    flex:1,
    width: 160,
    backgroundColor: '#ffffff',
    borderRadius:20,
    margin: 5,
    justifyContent:'center',
    alignItems:'center'
  },
  btnTexto:{
    color:'#00aeef',
    fontSize: 20,
    fontWeight: 'bold',
    padding:15
  },
  areaUltima:{
    marginTop:40
  },
  textUlt:{
    color: '#ffffff',
    fontSize: 20,
    justifyContent: 'center',
    alignItems: 'center'
  }

});

