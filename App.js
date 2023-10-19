import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TextInput, Button, Image } from "react-native";
import axios, { formToJSON } from "axios";
import React, { useState } from "react";

export default function App() {
  const [pokemon, setPokemon] = useState("");
  const [pokemonData, setPokemonData] = useState({});
  const atualizaPokemon = async () => {
    axios.get("https://pokeapi.co/api/v2/pokemon/" + pokemon).then((res) => {
      console.log(res);
      setPokemonData(res.data);
    });
  };
  return (
    <View style={styles.container}>
      <Text>Digite o número do seu pokemon!</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Digite o número do seu pokemon!"
          value={pokemon}
          onChangeText={(text) => setPokemon(text)}
        />
        <Button
          title="Pesquisar"
          onPress={() => {
            atualizaPokemon();
          }}
        />
      </View>
      <View>
        <Text style={styles.namePokemon}>{pokemonData.name}</Text>
        <Image
          style={styles.image}
          source={{
            uri:
              pokemonData &&
              pokemonData.sprites &&
              pokemonData.sprites.front_default
                ? pokemonData.sprites.front_default
                : null,
          }}
        ></Image>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#CCC",
    marginRight: 10,
    borderRadius: 10,
    padding: 10,
    fontSize: 18,
  },
  image: {
    width: 200,
    height: 200,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  namePokemon: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    textTransform: "capitalize",
  },
});
