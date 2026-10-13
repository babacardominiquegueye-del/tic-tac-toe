import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

type SquareValue = "X" | "O" | null;

function Square({
  value,
  highlight,
  onPress,
}: {
  value: SquareValue;
  highlight?: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      style={[styles.square, highlight && styles.highlight]}
      onPress={onPress}
    >
      <Text style={styles.squareText}>{value}</Text>
    </Pressable>
  );
}

function calculateWinner(squares: SquareValue[]): number[] | null {
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
      return [a, b, c];
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
    if (squares[i] || winningLine) {
      return;
    }
    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? "X" : "O";
    onPlay(nextSquares);
  }

  const winningLine = calculateWinner(squares);
  const winner = winningLine ? squares[winningLine[0]] : null;
  const isDraw = !winner && squares.every((value) => value !== null);
  const status = winner
    ? `Winner: ${winner}`
    : isDraw
      ? "Draw"
      : `Next player: ${xIsNext ? "X" : "O"}`;

  return (
    <View>
      <Text style={styles.status}>{status}</Text>
      <View style={styles.board}>
        {Array.from({ length: 3 }).map((_, row) => (
          <View key={row} style={styles.boardRow}>
            {Array.from({ length: 3 }).map((_, col) => {
              const i = row * 3 + col;
              return (
                <Square
                  key={i}
                  value={squares[i]}
                  highlight={winningLine?.includes(i)}
                  onPress={() => handlePress(i)}
                />
              );
            })}
          </View>
        ))}
      </View>
    </View>
  );
}

export default function Game() {
  const [history, setHistory] = useState<SquareValue[][]>([
    Array(9).fill(null),
  ]);
  const [currentMove, setCurrentMove] = useState(0);
  const [ascending, setAscending] = useState(true);

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
        <Text style={[styles.move, move === currentMove && styles.currentMove]}>
          {description}
        </Text>
      </Pressable>
    );
  });

  const sortedMoves = ascending ? moves : [...moves].reverse();

  return (
    <View style={styles.container}>
      <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      <View style={styles.gameInfo}>
        <ScrollView style={styles.moveList}>{sortedMoves}</ScrollView>
        <Pressable onPress={() => setAscending((value) => !value)}>
          <Text style={styles.sortButton}>
            {ascending ? "Sort descending" : "Sort ascending"}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 48,
    paddingBottom: 24,
  },
  status: {
    fontSize: 20,
    marginBottom: 16,
    textAlign: "center",
  },
  board: {
    width: 60 * 3,
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
  highlight: {
    backgroundColor: "#fde68a",
  },
  gameInfo: {
    flex: 1,
    alignSelf: "stretch",
    paddingHorizontal: 24,
    marginTop: 16,
  },
  moveList: {
    flexGrow: 0,
  },
  move: {
    fontSize: 16,
    color: "#2563eb",
    paddingVertical: 4,
  },
  currentMove: {
    fontWeight: "bold",
  },
  sortButton: {
    fontSize: 16,
    fontWeight: "600",
    color: "#16a34a",
    paddingVertical: 8,
  },
});
