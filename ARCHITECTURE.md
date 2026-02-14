# React Native 2048 - Architecture Documentation

## Clean Architecture Overview

This project strictly follows **Clean Architecture** principles with **MVVM (Model-View-ViewModel)** pattern, ensuring maximum maintainability, testability, and scalability.

### Architecture Layers

```
┌─────────────────────────────────────────────────────────┐
│                   Presentation Layer                     │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │   Views      │  │  ViewModels  │  │   Theme      │  │
│  │  (UI/React)  │◄─┤  (Business   │  │  (Styling)   │  │
│  │              │  │   Logic)     │  │              │  │
│  └──────────────┘  └──────┬───────┘  └──────────────┘  │
└────────────────────────────┼────────────────────────────┘
                             │
┌────────────────────────────┼────────────────────────────┐
│                   Domain Layer                           │
│  ┌──────────────┐  ┌──────┴───────┐  ┌──────────────┐  │
│  │   Entities   │  │  Use Cases   │  │ Repositories │  │
│  │ (Core Data)  │◄─┤  (Business   │──┤ (Interfaces) │  │
│  │              │  │   Rules)     │  │              │  │
│  └──────────────┘  └──────────────┘  └──────┬───────┘  │
└────────────────────────────────────────────────┼────────┘
                                                  │
┌─────────────────────────────────────────────────┼────────┐
│                   Data Layer                     │       │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────┴─────┐ │
│  │ Data Sources │  │ Repositories │  │   Storage      │ │
│  │ (AsyncStore) │◄─┤  (Concrete)  │──┤ (AsyncStorage) │ │
│  │              │  │              │  │                │ │
│  └──────────────┘  └──────────────┘  └────────────────┘ │
└─────────────────────────────────────────────────────────┘
```

### Layer Responsibilities

#### 1. Core Layer (Innermost)
**Location**: `src/core/`
**Responsibility**: Pure business logic, no dependencies
**Contains**:
- Constants (GameConstants, ColorSchemes)
- Type definitions
- Utility functions (GridUtils, AnimationUtils)

**Key Principle**: No external dependencies, pure TypeScript

#### 2. Domain Layer
**Location**: `src/domain/`
**Responsibility**: Business rules and entities
**Contains**:
- **Entities**: Core business objects (Tile, Grid, GameState)
- **Use Cases**: Business operations (MoveTiles, MergeTiles, etc.)
- **Repository Interfaces**: Contracts for data access

**Key Principle**: Depends only on core layer

#### 3. Data Layer
**Location**: `src/data/`
**Responsibility**: Data access and persistence
**Contains**:
- **Repository Implementations**: Concrete implementations of interfaces
- **Data Sources**: AsyncStorage, LocalStorage wrappers

**Key Principle**: Implements domain interfaces, handles persistence

#### 4. Presentation Layer (Outermost)
**Location**: `src/presentation/`
**Responsibility**: UI and user interaction
**Contains**:
- **ViewModels**: Coordinate use cases, manage state
- **Views**: React components
- **Theme**: UI styling

**Key Principle**: Depends on all other layers through interfaces

## SOLID Principles Implementation

### 1. Single Responsibility Principle (SRP)

Each class has exactly one reason to change:

```typescript
// ✅ Good: Tile only manages tile data
class Tile {
  constructor(public position: Position, public value: number) {}
  updatePosition(position: Position): void { /* ... */ }
}

// ✅ Good: MoveTilesUseCase only handles movement
class MoveTilesUseCase {
  execute(grid: Grid, direction: Direction): MoveResult { /* ... */ }
}

// ✅ Good: GameViewModel coordinates, doesn't implement business rules
class GameViewModel {
  constructor(
    private moveTilesUseCase: MoveTilesUseCase,
    private gameRepository: IGameRepository
  ) {}
}
```

### 2. Open/Closed Principle (OCP)

Open for extension, closed for modification:

```typescript
// ✅ Add new themes without modifying existing code
export const Themes: ThemeColors[] = [
  ClassicTheme,
  DarkTheme,
  OceanTheme,
  // Easy to add new themes here
  NewCustomTheme,
];

// ✅ Add new use cases without changing existing ones
class NewGameModeUseCase {
  // New functionality without modifying existing use cases
}
```

### 3. Liskov Substitution Principle (LSP)

Implementations can be substituted for interfaces:

```typescript
// ✅ Any IGameRepository implementation can be used
interface IGameRepository {
  saveGameState(state: GameState): Promise<void>;
  loadGameState(): Promise<GameState | null>;
}

class GameRepositoryImpl implements IGameRepository {
  // Implementation using AsyncStorage
}

class MockGameRepository implements IGameRepository {
  // Mock implementation for testing
}

// Both can be used interchangeably:
const viewModel = new GameViewModel(new GameRepositoryImpl(dataSource));
// or
const testViewModel = new GameViewModel(new MockGameRepository());
```

### 4. Interface Segregation Principle (ISP)

Small, focused interfaces:

```typescript
// ✅ Separate interfaces for different responsibilities
interface IGameRepository {
  saveGameState(state: GameState): Promise<void>;
  loadGameState(): Promise<GameState | null>;
}

interface IScoreRepository {
  saveBestScore(score: number): Promise<void>;
  loadBestScore(): Promise<number>;
}

interface IThemeRepository {
  saveThemeId(themeId: string): Promise<void>;
  loadThemeId(): Promise<string | null>;
}

// ❌ Bad: One big interface
interface IMegaRepository {
  // All methods in one interface
}
```

### 5. Dependency Inversion Principle (DIP)

Depend on abstractions, not concretions:

```typescript
// ✅ GameViewModel depends on interface (abstraction)
class GameViewModel {
  constructor(
    private gameRepository: IGameRepository,  // Interface, not concrete class
    private scoreRepository: IScoreRepository
  ) {}
}

// ✅ Dependency injection in App.tsx
const dataSource = new AsyncStorageDataSource();
const gameRepository = new GameRepositoryImpl(dataSource);
const scoreRepository = new ScoreRepositoryImpl(dataSource);
const viewModel = new GameViewModel(gameRepository, scoreRepository);

// Easy to swap implementations:
const mockDataSource = new MockDataSource();
const testRepository = new GameRepositoryImpl(mockDataSource);
```

## MVVM Pattern Implementation

### Model (Domain Layer)
**What**: Business data and rules
**Where**: `src/domain/entities/`, `src/domain/usecases/`

```typescript
// Entities represent business data
class GameState {
  public grid: Grid;
  public score: number;
  public bestScore: number;
  // ... business logic methods
}

// Use cases implement business rules
class MoveTilesUseCase {
  execute(grid: Grid, direction: Direction): MoveResult {
    // Pure business logic
  }
}
```

### View (Presentation/Views)
**What**: UI components
**Where**: `src/presentation/views/`

```typescript
// React components for UI
const GameScreen: React.FC<GameScreenProps> = ({
  gameRepository,
  scoreRepository,
  theme
}) => {
  const [gameViewModel] = useState(
    () => new GameViewModel(gameRepository, scoreRepository)
  );
  
  // UI renders based on ViewModel state
  return <Grid grid={gameState.grid.cells} theme={theme} />;
};
```

### ViewModel (Presentation/ViewModels)
**What**: Presentation logic, state management
**Where**: `src/presentation/viewmodels/`

```typescript
// ViewModel coordinates use cases and manages state
class GameViewModel {
  private gameState: GameState;
  
  constructor(
    private gameRepository: IGameRepository,
    private scoreRepository: IScoreRepository
  ) {
    // Inject dependencies
  }
  
  async move(direction: Direction): Promise<boolean> {
    // Save previous state
    this.gameState.savePreviousState();
    
    // Execute use case
    const result = this.moveTilesUseCase.execute(
      this.gameState.grid,
      direction
    );
    
    // Update state
    this.gameState.updateScore(/* ... */);
    
    // Persist
    await this.saveGame();
    
    // Notify view
    this.notifyStateChange();
    
    return result.moved;
  }
}
```

### Data Flow

```
User Interaction → View → ViewModel → Use Case → Entity
                    ↑       ↓         ↓          ↓
                    └─────State─────Repository──DataSource
```

## Dependency Injection

The app uses constructor injection throughout:

```typescript
// 1. Create data sources
const dataSource = new AsyncStorageDataSource();

// 2. Create repositories (inject data source)
const gameRepository = new GameRepositoryImpl(dataSource);
const scoreRepository = new ScoreRepositoryImpl(dataSource);

// 3. Create ViewModels (inject repositories)
const gameViewModel = new GameViewModel(gameRepository, scoreRepository);

// 4. Create Views (inject ViewModels)
<GameScreen
  gameRepository={gameRepository}
  scoreRepository={scoreRepository}
  theme={theme}
/>
```

**Benefits**:
- Easy to test (inject mocks)
- Easy to swap implementations
- Clear dependencies
- No hidden dependencies

## Testing Strategy

### Unit Tests (Domain Layer)
Test pure business logic:

```typescript
describe('MoveTilesUseCase', () => {
  it('should move tiles correctly', () => {
    const grid = new Grid();
    const useCase = new MoveTilesUseCase();
    
    const result = useCase.execute(grid, Direction.UP);
    
    expect(result.moved).toBe(true);
  });
});
```

### ViewModel Tests
Test presentation logic:

```typescript
describe('GameViewModel', () => {
  it('should update score after move', async () => {
    const mockRepo = new MockGameRepository();
    const viewModel = new GameViewModel(mockRepo, mockScoreRepo);
    
    await viewModel.move(Direction.UP);
    
    expect(viewModel.getState().score).toBeGreaterThan(0);
  });
});
```

### Component Tests
Test UI rendering:

```typescript
describe('Grid', () => {
  it('should render tiles correctly', () => {
    const grid = createTestGrid();
    const {getByText} = render(<Grid grid={grid} theme={ClassicTheme} />);
    
    expect(getByText('2')).toBeDefined();
  });
});
```

## Performance Optimizations

### 1. React Native Reanimated
Uses native driver for 60 FPS animations:

```typescript
const animatedStyle = useAnimatedStyle(() => ({
  transform: [
    {translateX: withTiming(left, {duration: 200})},
    {translateY: withTiming(top, {duration: 200})},
    {scale: scale.value},
  ],
}));
```

### 2. Memoization
Prevents unnecessary re-renders:

```typescript
const Grid = React.memo(({grid, theme}) => {
  // Only re-renders when grid or theme changes
});
```

### 3. Efficient State Updates
Only updates changed parts:

```typescript
// ✅ Good: Only update specific cells
grid.setCellContent(position, tile);

// ❌ Bad: Clone entire grid every time
const newGrid = cloneDeep(grid);
```

## Security Considerations

### 1. No Secrets in Code
All sensitive data in environment variables:

```typescript
// ✅ Good: Use environment variables
const adUnitId = process.env.IOS_BANNER_AD_UNIT_ID;

// ❌ Bad: Hard-coded secrets
const adUnitId = "ca-app-pub-1234567890123456/1234567890";
```

### 2. Input Validation
Validate all user inputs:

```typescript
// Validate grid position
if (!isWithinBounds(position)) {
  return;
}
```

### 3. ProGuard Configuration
Protects Android code in production

## Scalability

The architecture supports growth:

### Adding New Features
1. Create new use case in `domain/usecases/`
2. Add method to ViewModel
3. Update UI component

### Adding New Storage
1. Create new data source implementing interface
2. Inject into repository
3. No changes needed elsewhere

### Adding New Themes
1. Add theme object to `ColorSchemes.ts`
2. Add to Themes array
3. Automatically available in theme selector

## Best Practices

### 1. Naming Conventions
- **Entities**: Nouns (Tile, Grid, GameState)
- **Use Cases**: Verb + Noun + UseCase (MoveTilesUseCase)
- **Repositories**: I + Name + Repository (IGameRepository)
- **ViewModels**: Name + ViewModel (GameViewModel)

### 2. File Organization
- One class per file
- File name matches class name
- Group related files in folders

### 3. Comments
- Document public APIs
- Explain "why", not "what"
- Use TSDoc format

### 4. Error Handling
- Try-catch in data layer
- Log errors (removable in production)
- Graceful degradation

## Summary

This React Native 2048 implementation demonstrates:

✅ **Clean Architecture** with clear separation of concerns
✅ **MVVM Pattern** for testable presentation logic
✅ **SOLID Principles** throughout the codebase
✅ **Dependency Injection** for flexibility
✅ **Type Safety** with TypeScript
✅ **Performance** with native animations
✅ **Maintainability** with clear structure
✅ **Testability** with isolated components
✅ **Scalability** for future growth

The architecture ensures the code is:
- Easy to understand
- Easy to test
- Easy to modify
- Easy to extend
- Production-ready
