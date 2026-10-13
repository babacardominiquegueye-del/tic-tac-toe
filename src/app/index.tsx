import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

type SquareValue = "X" | "O" | null;

function Square({
  value,
  onPress,
}: {
  value: SquareValue;
  onPress: () => void;
}) {
  return (
    <Pressable style={styles.square} onPress={onPress}>
      <Text style={styles.squareText}>{value}</Text>
    </Pressable>
  );
}

function calculateWinner(squares: SquareValue[]): SquareValue {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (const [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function Board({
  xIsNext,
  squares,
  onPlay,
}: {
  xIsNext: boolean;
  squares: SquareValue[];
  onPlay: (nextSquares: SquareValue[]) => void;
}) {
  function handlePress(i: number) {
    if (squares[i] || calculateWinner(squares)) {
      return;
    }
    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? "X" : "O";
    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares);
  const status = winner
    ? `Winner: ${winner}`
    : `Next player: ${xIsNext ? "X" : "O"}`;

  return (
    <View>
      <Text style={styles.status}>{status}</Text>
      <View style={styles.boardRow}>
        <Square value={squares[0]} onPress={() => handlePress(0)} />
        <Square value={squares[1]} onPress={() => handlePress(1)} />
        <Square value={squares[2]} onPress={() => handlePress(2)} />
      </View>
      <View style={styles.boardRow}>
        <Square value={squares[3]} onPress={() => handlePress(3)} />
        <Square value={squares[4]} onPress={() => handlePress(4)} />
        <Square value={squares[5]} onPress={() => handlePress(5)} />
      </View>
      <View style={styles.boardRow}>
        <Square value={squares[6]} onPress={() => handlePress(6)} />
        <Square value={squares[7]} onPress={() => handlePress(7)} />
        <Square value={squares[8]} onPress={() => handlePress(8)} />
      </View>
    </View>
  );
}

export default function Game() {
  const [history, setHistory] = useState<SquareValue[][]>([
    Array(9).fill(null),
  ]);
  const [currentMove, setCurrentMove] = useState(0);

  const currentSquares = history[currentMove];
  const xIsNext = currentMove % 2 === 0;

  function handlePlay(nextSquares: SquareValue[]) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(move: number) {
    setCurrentMove(move);
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      const index = squares.findIndex(
        (value, i) => value !== history[move - 1][i]
      );
      const col = index % 3;
      const row = Math.floor(index / 3);
      description = `Go to move #${move} (${col}, ${row})`;
    } else {
      description = "Go to game start";
    }
    return (
      <Pressable key={move} onPress={() => jumpTo(move)}>
        <Text style={styles.move}>{description}</Text>
      </Pressable>
    );
  });

  return (
    <View style={styles.container}>
      <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      <View style={styles.gameInfo}>
        <ScrollView>{moves}</ScrollView>
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
  status: {
    fontSize: 20,
    marginBottom: 16,
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
  gameInfo: {
    marginTop: 16,
  },
  move: {
    fontSize: 16,
    color: "#2563eb",
    paddingVertical: 4,
  },
});
