
export type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';
export type Position = { x: number; y: number };

export interface GameState {
  snake: Position[];
  food: Position;
  direction: Direction;
  nextDirection: Direction;
  isGameOver: boolean;
  score: number;
  gridSize: number;
  cellSize: number;
}

// Check if two positions are the same
export const isSamePosition = (pos1: Position, pos2: Position): boolean => {
  return pos1.x === pos2.x && pos1.y === pos2.y;
};

// Check if position is within grid bounds
export const isWithinBounds = (pos: Position, gridSize: number): boolean => {
  return pos.x >= 0 && pos.x < gridSize && pos.y >= 0 && pos.y < gridSize;
};

// Check if position is on snake
export const isOnSnake = (pos: Position, snake: Position[]): boolean => {
  return snake.some(segment => isSamePosition(segment, pos));
};

// Generate a random position for food that's not on the snake
export const generateFoodPosition = (snake: Position[], gridSize: number): Position => {
  let position: Position;
  do {
    position = {
      x: Math.floor(Math.random() * gridSize),
      y: Math.floor(Math.random() * gridSize),
    };
  } while (isOnSnake(position, snake));
  return position;
};

// Calculate the next head position based on current direction
export const getNextHeadPosition = (head: Position, direction: Direction): Position => {
  switch (direction) {
    case 'UP':
      return { x: head.x, y: head.y - 1 };
    case 'DOWN':
      return { x: head.x, y: head.y + 1 };
    case 'LEFT':
      return { x: head.x - 1, y: head.y };
    case 'RIGHT':
      return { x: head.x + 1, y: head.y };
    default:
      return head;
  }
};

// Check if the next move will result in game over
export const willGameEnd = (nextHead: Position, snake: Position[], gridSize: number): boolean => {
  // Check if snake hits the wall
  if (!isWithinBounds(nextHead, gridSize)) {
    return true;
  }
  
  // Check if snake hits itself (excluding the tail which will move)
  // We only check against n-1 segments because the tail will move in the next step
  return isOnSnake(nextHead, snake.slice(0, -1));
};

// Get opposite direction
export const getOppositeDirection = (direction: Direction): Direction => {
  switch (direction) {
    case 'UP': return 'DOWN';
    case 'DOWN': return 'UP';
    case 'LEFT': return 'RIGHT';
    case 'RIGHT': return 'LEFT';
    default: return direction;
  }
};

// Initialize game state
export const initializeGame = (gridSize: number, cellSize: number): GameState => {
  // Start with a snake of length 3 in the middle of the grid
  const middle = Math.floor(gridSize / 2);
  const snake: Position[] = [
    { x: middle, y: middle },
    { x: middle - 1, y: middle },
    { x: middle - 2, y: middle },
  ];
  
  const initialDirection: Direction = 'RIGHT';
  
  return {
    snake,
    food: generateFoodPosition(snake, gridSize),
    direction: initialDirection,
    nextDirection: initialDirection,
    isGameOver: false,
    score: 0,
    gridSize,
    cellSize,
  };
};

// Move the snake one step in the current direction
export const moveSnake = (gameState: GameState): GameState => {
  const { snake, food, nextDirection, gridSize } = gameState;
  const head = snake[0];
  const nextHead = getNextHeadPosition(head, nextDirection);
  
  // Check if game over
  if (willGameEnd(nextHead, snake, gridSize)) {
    return {
      ...gameState,
      isGameOver: true,
      direction: nextDirection,
    };
  }
  
  // Check if snake eats food
  const ateFood = isSamePosition(nextHead, food);
  
  // Create new snake with new head
  let newSnake = [nextHead, ...snake];
  
  // If didn't eat food, remove tail
  if (!ateFood) {
    newSnake = newSnake.slice(0, -1);
  }
  
  // Update game state
  return {
    ...gameState,
    snake: newSnake,
    food: ateFood ? generateFoodPosition(newSnake, gridSize) : food,
    score: ateFood ? gameState.score + 1 : gameState.score,
    direction: nextDirection,
  };
};
