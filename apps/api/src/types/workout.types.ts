export interface prInput {
  userId: number;
  sessionId: number;
  exerciseId: number;
  setId: number;
  score: number;
  weightLbs: number;
  repCount: number;
}

export interface sessionInput {
  categories: string[];
}

export interface setInput {
  exerciseId: number;
  intensity: number;
  notes: string;
  repCount: number;
  weightLbs: number;
}

export interface exerciseInput {
  name: string;
  variation: string;
  repRange: string;
  categories: string[];
  muscleGroups: muscleGroupInput[];
}

export interface muscleGroupInput {
  priority: number;
  vagueName: string;
  specificName: string;
}

export interface userInput {
  username: string;
}
