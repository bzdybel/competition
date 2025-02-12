import { GameType } from "../types/GameType";
import { Person } from "../types/Person";
import { Starship } from "../types/Starship";

const urlMap: Record<GameType, string> = {
  people: "/people/",
  starships: "/starships/",
};
const fetchSWData = async <T>(resource: string, id: number): Promise<T> => {
  const baseURL = process.env.REACT_APP_SWAPI_BASE_URL;

  if (!baseURL) {
    throw new Error("Base URL for SWAPI is not defined.");
  }

  const url = `${baseURL}${resource}${id}/`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Data fetching failed");
  }

  return response.json();
};

export const fetchPerson = async (id: number): Promise<Person> => {
  return fetchSWData<Person>(urlMap.people, id);
};

export const fetchStarship = async (id: number): Promise<Starship> => {
  return fetchSWData<Starship>(urlMap.starships, id);
};
