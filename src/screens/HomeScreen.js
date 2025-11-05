// src/screens/HomeScreen.js
import axios from "axios";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function HomeScreen() {
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(true);
  const [randomItem, setRandomItem] = useState(null);

  const fetchMenu = async () => {
    try {
      const res = await axios.get("http://localhost:3000/menu");
      setMenu(res.data);
    } catch (err) {
      console.error("Error fetching menu:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchRandom = async () => {
    try {
      const res = await axios.get("http://localhost:3000/menu/random");
      setRandomItem(res.data);
    } catch (err) {
      console.error("Error fetching random item:", err);
    }
  };

  useEffect(() => {
    fetchMenu();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#d2691e" />
        <Text style={styles.loadingText}>Loading Menu...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>☕ Coffee Shop Menu</Text>

      <FlatList
        data={menu}
        keyExtractor={(item) => item._id}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.category}>{item.category}</Text>
            {item.inStock ? (
              <Text style={styles.price}>Rs. {item.price}</Text>
            ) : (
              <Text style={styles.outOfStock}>Out of Stock</Text>
            )}
          </View>
        )}
      />

      <TouchableOpacity style={styles.button} onPress={fetchRandom}>
        <Text style={styles.buttonText}>🎁 Surprise Me</Text>
      </TouchableOpacity>

      {randomItem && (
        <View style={styles.surpriseCard}>
          <Image source={{ uri: randomItem.image }} style={styles.surpriseImage} />
          <Text style={styles.name}>{randomItem.name}</Text>
          <Text style={styles.category}>{randomItem.category}</Text>
          <Text style={styles.price}>Rs. {randomItem.price}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2ebe3",
    padding: 20,
    paddingTop: 60,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#5c3c1a",
    textAlign: "center",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 10,
    marginBottom: 15,
    width: "48%",
    alignItems: "center",
    elevation: 3,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  name: {
    fontWeight: "bold",
    color: "#3e2723",
    marginTop: 10,
  },
  category: {
    color: "#795548",
  },
  price: {
    color: "#d2691e",
    fontWeight: "bold",
    marginTop: 5,
  },
  outOfStock: {
    color: "red",
    fontWeight: "bold",
    marginTop: 5,
  },
  button: {
    backgroundColor: "#d2691e",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  surpriseCard: {
    backgroundColor: "#fff7e6",
    borderRadius: 15,
    padding: 20,
    alignItems: "center",
    marginTop: 20,
  },
  surpriseImage: {
    width: 120,
    height: 120,
    borderRadius: 10,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
    color: "#5c3c1a",
  },
});
