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
import Constants from "expo-constants";

// Get API URL from app.json or use fallback
const API_BASE_URL = Constants.expoConfig?.extra?.apiUrl || "https://backend-for-vercel-delta.vercel.app";

export default function HomeScreen() {
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(true);
  const [randomItem, setRandomItem] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const fetchMenu = async () => {
    try {
      console.log("Fetching menu from:", `${API_BASE_URL}/menu`);
      const res = await axios.get(`${API_BASE_URL}/menu`);
      setMenu(res.data);
    } catch (err) {
      console.error("Error fetching menu:", err);
      alert("Failed to load menu. Please check your connection and make sure the backend is running.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const fetchRandom = async () => {
    try {
      console.log("Fetching random item from:", `${API_BASE_URL}/menu/random`);
      const res = await axios.get(`${API_BASE_URL}/menu/random`);
      setRandomItem(res.data);
    } catch (err) {
      console.error("Error fetching random item:", err);
      alert("Failed to get random item. Please try again.");
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchMenu();
  };

  useEffect(() => {
    fetchMenu();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#d2691e" />
        <Text style={styles.loadingText}>Loading Menu...</Text>
        <Text style={styles.apiUrl}>API: {API_BASE_URL}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>☕ Coffee Shop Menu</Text>
      
      {refreshing && (
        <View style={styles.refreshingContainer}>
          <ActivityIndicator size="small" color="#d2691e" />
          <Text style={styles.refreshingText}>Refreshing...</Text>
        </View>
      )}

      {menu.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyStateText}>No menu items found</Text>
          <TouchableOpacity style={styles.retryButton} onPress={fetchMenu}>
            <Text style={styles.retryButtonText}>Retry</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={menu}
          keyExtractor={(item) => item._id || item.id || Math.random().toString()}
          numColumns={2}
          columnWrapperStyle={styles.columnWrapper}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Image 
                source={{ uri: item.image }} 
                style={styles.image}
              />
              <Text style={styles.name} numberOfLines={1}>{item.name}</Text>
              <Text style={styles.category} numberOfLines={1}>{item.category}</Text>
              {item.inStock ? (
                <Text style={styles.price}>Rs. {item.price}</Text>
              ) : (
                <Text style={styles.outOfStock}>Out of Stock</Text>
              )}
            </View>
          )}
          refreshing={refreshing}
          onRefresh={onRefresh}
          showsVerticalScrollIndicator={false}
        />
      )}

      <TouchableOpacity style={styles.button} onPress={fetchRandom}>
        <Text style={styles.buttonText}>🎁 Surprise Me</Text>
      </TouchableOpacity>

      {randomItem && (
        <View style={styles.surpriseCard}>
          <Text style={styles.surpriseTitle}>Your Surprise Item! 🎉</Text>
          <Image 
            source={{ uri: randomItem.image }} 
            style={styles.surpriseImage}
          />
          <Text style={styles.surpriseName}>{randomItem.name}</Text>
          <Text style={styles.surpriseCategory}>{randomItem.category}</Text>
          <Text style={styles.surprisePrice}>Rs. {randomItem.price}</Text>
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
  columnWrapper: {
    justifyContent: "space-between",
    marginBottom: 15,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 10,
    width: "48%",
    alignItems: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
    backgroundColor: "#f5f5f5",
  },
  name: {
    fontWeight: "bold",
    color: "#3e2723",
    marginTop: 10,
    textAlign: "center",
    fontSize: 14,
  },
  category: {
    color: "#795548",
    fontSize: 12,
    textAlign: "center",
  },
  price: {
    color: "#d2691e",
    fontWeight: "bold",
    marginTop: 5,
    fontSize: 14,
  },
  outOfStock: {
    color: "red",
    fontWeight: "bold",
    marginTop: 5,
    fontSize: 12,
  },
  button: {
    backgroundColor: "#d2691e",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
    marginBottom: 10,
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
    borderWidth: 2,
    borderColor: "#d2691e",
    borderStyle: "dashed",
  },
  surpriseTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#5c3c1a",
    marginBottom: 10,
  },
  surpriseImage: {
    width: 120,
    height: 120,
    borderRadius: 10,
    backgroundColor: "#f5f5f5",
  },
  surpriseName: {
    fontWeight: "bold",
    color: "#3e2723",
    marginTop: 10,
    fontSize: 16,
  },
  surpriseCategory: {
    color: "#795548",
    fontSize: 14,
  },
  surprisePrice: {
    color: "#d2691e",
    fontWeight: "bold",
    marginTop: 5,
    fontSize: 16,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f2ebe3",
  },
  loadingText: {
    marginTop: 10,
    color: "#5c3c1a",
    fontSize: 16,
  },
  apiUrl: {
    marginTop: 5,
    color: "#795548",
    fontSize: 12,
    textAlign: "center",
    paddingHorizontal: 20,
  },
  refreshingContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  refreshingText: {
    marginLeft: 10,
    color: "#5c3c1a",
    fontSize: 14,
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 50,
  },
  emptyStateText: {
    fontSize: 18,
    color: "#795548",
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: "#d2691e",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  retryButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});