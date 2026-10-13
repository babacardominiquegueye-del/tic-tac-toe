import { Pressable, StyleSheet, Text, View } from "react-native";

type SquareValue = "X" | "O" | null;

function Square({ value }: { value: SquareValue }) {
  return (
    <Pressable style={styles.square}>
      <Text style={styles.squareText}>{value}</Text>
    </Pressable>
  );
}

export default function Board() {
  return (
    <View style={styles.container}>
      <View style={styles.boardRow}>
        <Square value={null} />
        <Square value={null} />
        <Square value={null} />
      </View>
      <View style={styles.boardRow}>
        <Square value={null} />
        <Square value={null} />
        <Square value={null} />
      </View>
      <View style={styles.boardRow}>
        <Square value={null} />
        <Square value={null} />
        <Square value={null} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  boardRow: {
    flexDirection: "row",
  },
  square: {
    width: 60,
    height: 60,
    borderWidth: 1,
    borderColor: "#999",
    alignItems: "center",
    justifyContent: "center",
  },
  squareText: {
    fontSize: 28,
  },
});
