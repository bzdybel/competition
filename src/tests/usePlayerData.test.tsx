import { act, renderHook, waitFor } from "@testing-library/react";
import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { fetchPerson, fetchStarship } from "../api/swapi";
import { usePlayersData } from "../hooks/usePlayerData";
import { Person } from "../types/Person";
import { Starship } from "../types/Starship";

jest.mock("../api/swapi", () => ({
  fetchPerson: jest.fn(),
  fetchStarship: jest.fn(),
}));

const mockPersonData: Person = {
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

const mockStarshipData: Starship = {
  name: "Millennium Falcon",
  model: "YT-1300 light freighter",
  starship_class: "Light Freighter",
  manufacturer: "Corellian Engineering Corporation",
  cost_in_credits: "100000",
  length: "34.75",
  crew: "4",
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

const queryClient = new QueryClient();

describe("usePlayersData Hook", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("fetches player data for people game type", async () => {
    (fetchPerson as jest.Mock).mockResolvedValue(mockPersonData);

    const { result } = renderHook(() => usePlayersData("people"), {
      wrapper: ({ children }) => (
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      ),
    });

    await act(async () => {
      await result.current.getPlayersData();
    });

    await waitFor(() => result.current.playerOne !== null);

    expect(result.current.playerOne).toEqual(mockPersonData);
    expect(result.current.playerTwo).toEqual(mockPersonData);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it("fetches player data for starship game type", async () => {
    (fetchStarship as jest.Mock).mockResolvedValue(mockStarshipData);

    const { result } = renderHook(() => usePlayersData("starships"), {
      wrapper: ({ children }) => (
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      ),
    });

    await act(async () => {
      await result.current.getPlayersData();
    });

    await waitFor(() => result.current.playerOne !== null);

    expect(result.current.playerOne).toEqual(mockStarshipData);
    expect(result.current.playerTwo).toEqual(mockStarshipData);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it("handles errors while fetching player data", async () => {
    (fetchPerson as jest.Mock).mockRejectedValueOnce(
      new Error("Failed to fetch")
    );

    const { result } = renderHook(() => usePlayersData("people"), {
      wrapper: ({ children }) => (
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      ),
    });

    await act(async () => {
      await result.current.getPlayersData();
    });

    await waitFor(() => result.current.error !== null);

    expect(result.current.isLoading).toBe(false);
  });

  it("can reset player data", async () => {
    const { result } = renderHook(() => usePlayersData("people"), {
      wrapper: ({ children }) => (
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      ),
    });

    await act(async () => {
      await result.current.getPlayersData();
    });

    await waitFor(() => result.current.playerOne !== null);

    act(() => {
      result.current.resetPlayersData();
    });

    expect(result.current.playerOne).toBeUndefined();
    expect(result.current.playerTwo).toBeUndefined();
  });
});
