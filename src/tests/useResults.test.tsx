import { act, renderHook } from "@testing-library/react";
import { useResults } from "../hooks/useResults";
import { Person } from "../types/Person";
import { Starship } from "../types/Starship";

const mockPerson1: Person = {
  name: "Luke Skywalker",
  birth_year: "19BBY",
  eye_color: "blue",
  gender: "Male",
  hair_color: "blond",
  height: "172",
  mass: "77",
  skin_color: "fair",
  homeworld: "Tatooine",
  films: ["A New Hope", "The Empire Strikes Back", "Return of the Jedi"],
  species: ["Human"],
  starships: ["X-wing", "T-65 X-wing starfighter"],
  vehicles: ["Snowspeeder"],
  url: "https://swapi.dev/api/people/1/",
  created: "2014-12-09T13:50:51.644000Z",
  edited: "2014-12-20T21:17:50.313000Z",
};

const mockPerson2: Person = {
  name: "Han Solo",
  birth_year: "29BBY",
  eye_color: "brown",
  gender: "Male",
  hair_color: "brown",
  height: "180",
  mass: "85",
  skin_color: "light",
  homeworld: "Corellia",
  films: [
    "A New Hope",
    "The Empire Strikes Back",
    "Return of the Jedi",
    "The Force Awakens",
  ],
  species: ["Human"],
  starships: ["Millennium Falcon", "YT-1300 light freighter"],
  vehicles: ["Speeder bike"],
  url: "https://swapi.dev/api/people/14/",
  created: "2014-12-09T13:50:51.644000Z",
  edited: "2014-12-20T21:17:50.313000Z",
};

const mockStarship1: Starship = {
  name: "Millennium Falcon",
  model: "YT-1300 light freighter",
  starship_class: "Light Freighter",
  manufacturer: "Corellian Engineering Corporation",
  cost_in_credits: "100000",
  length: "34.75",
  crew: "10",
  passengers: "6",
  max_atmosphering_speed: "1050",
  hyperdrive_rating: "0.5",
  MGLT: "75",
  cargo_capacity: "100000",
  consumables: "2 months",
  films: ["A New Hope", "The Empire Strikes Back", "Return of the Jedi"],
  pilots: ["https://swapi.dev/api/people/13/"],
  url: "https://swapi.dev/api/starships/10/",
  created: "2014-12-10T16:59:45.094000Z",
  edited: "2014-12-22T18:25:25.578000Z",
};

const mockStarship2: Starship = {
  name: "X-Wing",
  model: "T-65 X-wing starfighter",
  starship_class: "Starfighter",
  manufacturer: "Incom Corporation",
  cost_in_credits: "150000",
  length: "12.5",
  crew: "1",
  passengers: "0",
  max_atmosphering_speed: "1050",
  hyperdrive_rating: "1.0",
  MGLT: "85",
  cargo_capacity: "110",
  consumables: "1 week",
  films: ["A New Hope", "The Empire Strikes Back", "Return of the Jedi"],
  pilots: ["https://swapi.dev/api/people/1/"],
  url: "https://swapi.dev/api/starships/12/",
  created: "2014-12-10T16:59:45.094000Z",
  edited: "2014-12-22T18:25:25.578000Z",
};

describe("useResults Hook", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("calculates scores correctly for people game", () => {
    const mockSetItem = jest.spyOn(Storage.prototype, "setItem");

    const { result } = renderHook(() =>
      useResults(mockPerson1, mockPerson2, "people")
    );

    expect(result.current.scores).toEqual({ playerOne: 0, playerTwo: 0 });

    act(() => {
      result.current.calculateScores();
    });

    expect(result.current.scores).toEqual({ playerOne: 0, playerTwo: 1 });

    expect(mockSetItem).toHaveBeenCalledWith(
      "sw_game_scores",
      JSON.stringify({ playerOne: 0, playerTwo: 1 })
    );
  });

  it("calculates scores correctly for starships game", () => {
    const mockSetItem = jest.spyOn(Storage.prototype, "setItem");

    const { result } = renderHook(() =>
      useResults(mockStarship1, mockStarship2, "starships")
    );

    expect(result.current.scores).toEqual({ playerOne: 0, playerTwo: 0 });

    act(() => {
      result.current.calculateScores();
    });

    expect(result.current.scores).toEqual({ playerOne: 1, playerTwo: 0 });

    expect(mockSetItem).toHaveBeenCalledWith(
      "sw_game_scores",
      JSON.stringify({ playerOne: 1, playerTwo: 0 })
    );
  });

  it("resets scores correctly", () => {
    const mockSetItem = jest.spyOn(Storage.prototype, "setItem");

    const { result } = renderHook(() =>
      useResults(mockPerson1, mockPerson2, "people")
    );
    act(() => {
      result.current.calculateScores();
    });

    expect(result.current.scores).toEqual({ playerOne: 0, playerTwo: 1 });

    act(() => {
      result.current.resetScores();
    });

    expect(result.current.scores).toEqual({ playerOne: 0, playerTwo: 0 });

    expect(mockSetItem).toHaveBeenCalledWith(
      "sw_game_scores",
      JSON.stringify({ playerOne: 0, playerTwo: 0 })
    );
  });

  it("calculates a draw correctly", () => {
    const drawPerson1: Person = {
      ...mockPerson1,
      name: "Person 1",
      mass: "80",
    };

    const drawPerson2: Person = {
      ...mockPerson2,
      name: "Person 2",
      mass: "80",
    };

    const { result } = renderHook(() =>
      useResults(drawPerson1, drawPerson2, "people")
    );

    act(() => {
      result.current.calculateScores();
    });

    expect(result.current.winner).toBe("draw");

    expect(result.current.scores.playerOne).toEqual(0);
    expect(result.current.scores.playerTwo).toEqual(0);
  });
});
