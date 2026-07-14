import rawJson from "../../nan_dataset.json";
import {
  FLOWERS_DATA,
  FESTIVALS_DATA,
  WELLNESS_COMMUNITIES,
  ETHNIC_GROUPS,
  PRODUCTS_DATA,
  elementMatching
} from "../ARSpotMap";

export { FLOWERS_DATA, FESTIVALS_DATA, WELLNESS_COMMUNITIES, ETHNIC_GROUPS, PRODUCTS_DATA, elementMatching };

export const NAN_DATASET = rawJson;

export const MONTHLY_OVERVIEW = rawJson.festival_monthly_overview;
export const BLOOMING_CALENDAR = rawJson.flower_blooming_calendar;
export const RELATIONSHIP_MATRIX = rawJson.relationship_matrix;
export const LOCATIONS = rawJson.locations;
export const PRODUCTS = rawJson.flower_products;
export const TAT_API = rawJson.tat_api;
export const TAT_API_EVENTS = rawJson.tat_api_events;
export const TAT_API_PLACES = rawJson.tat_api_places;
export const TAT_API_ROUTES = rawJson.tat_api_routes;
export const TAT_API_ARTICLES = rawJson.tat_api_articles;
