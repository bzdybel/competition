type Gender = "Male" | "Female" | "unknown" | "n/a";

export interface Person {
  name: string;
  birth_year: string;
  eye_color: string;
  gender: Gender;
  hair_color: string;
  height: string;
  mass: string;
  skin_color: string;
  homeworld: string;
  films: string[];
  species: string[];
  starships: string[];
  vehicles: string[];
  url: string;
  created: string;
  edited: string;
}
