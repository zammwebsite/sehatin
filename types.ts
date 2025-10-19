
export interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'ai';
}

export interface HealthData {
  id: string;
  date: string;
  heartRate: number;
  bloodPressure: string;
  bodyTemp: number;
  fatigueLevel: 'Low' | 'Medium' | 'High';
}
