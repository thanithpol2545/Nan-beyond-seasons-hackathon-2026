export interface MedicalInfo {
  benefits_th: string[];
  uses_th: string[];
  benefits_en: string[];
}

export interface AestheticInfo {
  description_th: string;
  description_en?: string;
  photography_score: number;
  instagram_worthy: boolean;
}

export interface TraditionInfo {
  uses_th: string[];
  food_th: string;
}

export interface BeliefInfo {
  meaning_th: string;
  beliefs_th: string[];
  beliefs_en: string[];
}

export interface Flower {
  id: string;
  name_th: string;
  name_en: string;
  scientific: string;
  family: string;
  symbol: string;
  season: string;
  scent: string;
  color: string;
  medical: MedicalInfo;
  aesthetic: AestheticInfo;
  tradition: TraditionInfo;
  belief: BeliefInfo;
  wellness_activity: string[];
  fragrance_family: string;
  element: "ดิน (Earth)" | "น้ำ (Water)" | "ลม (Wind)" | "ไฟ (Fire)" | string;
  knowledge_graph_tags: string[];
  image_url?: string;
}

export interface FestivalFlower {
  name: string;
  use: string;
  symbolism: string;
}

export interface Festival {
  id: string;
  name_th: string;
  name_en: string;
  month: number | null;
  period: string;
  location: string;
  ethnic_group: string;
  description_th: string;
  description_en: string;
  flowers_used: FestivalFlower[];
  wellness_connection: string;
}

export interface WellnessCommunity {
  id: string;
  name: string;
  name_en: string;
  location: string;
  type: string;
  description: string;
  services: string[];
  key_herbs?: string[];
  flowers_in_use?: string[];
  products_certified?: string;
}

export interface EthnicGroup {
  id: string;
  name_th: string;
  name_en: string;
  population_in_nan: string;
  districts: string[];
  language: string;
  religion: string;
  cultural_highlights: {
    textile: string;
    food: string[];
    music: string[];
    dance: string;
    medicine: string;
  };
  flower_connection: {
    traditional_flowers: string[];
    special_tradition: string;
  };
}

export interface WellnessPlace {
  id: string;
  name: string;
  lat: number;
  lng: number;
  type: string;
  tags: string[];
  wellness_score: number;
  signature_scent?: string;
  description?: string;
}

export interface EcomProduct {
  id: string;
  name: string;
  ingredients: string[];
  benefits: string[];
  source: string;
  price: number;
  image_url: string;
  scent_family?: string;
  category: "tea" | "oil" | "body" | "craft" | "pass";
}

export interface CartItem {
  product: EcomProduct;
  quantity: number;
}

export interface MonthlyCalendarDetail {
  flowers: string[];
  festivals: string[];
  season: string;
  avg_temp: string;
  wellness_tip: string;
}

export interface MonthlyOverview {
  month: number;
  festivals: string[];
  flower_highlights: string[];
  season: string;
  weather: string;
  tourist_level: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: {
    text: string;
    value: "Earth" | "Water" | "Wind" | "Fire";
    symbol: string;
  }[];
}

export interface JournalLog {
  id: string;
  date: string;
  mood: "stressed" | "sad" | "tired" | "anxious" | "peaceful";
  note: string;
  matchedFlowerIds: string[];
  zodiacElement?: string;
}

export interface TatApiEvent {
  event_id: number;
  name_th: string;
  start_date: string;
  end_date: string;
  latitude: number | null;
  longitude: number | null;
  thumbnail_url: string;
}

export interface TatApiPlace {
  place_id: string;
  name_th: string;
  category: string;
  district: string;
  thumbnail_url: string[];
  tags: string[];
}
