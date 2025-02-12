import { render, screen } from "@testing-library/react";
import React from "react";
import { Player } from "../components/Player";
import { Person } from "../types/Person";
import { Starship } from "../types/Starship";

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

describe("Player Component", () => {
  it("displays skeleton when loading", () => {
    render(
      <Player
        type="red"
        playerData={undefined}
        isWinner={false}
        isLoading={true}
        scores={10}
      />
    );

    const skeleton = screen.getByTestId("skeleton");
    expect(skeleton).toBeInTheDocument();
  });

  it("displays player info when not loading", () => {
    render(
      <Player
        type="red"
        playerData={mockPersonData}
        isWinner={false}
        isLoading={false}
        scores={10}
      />
    );

    expect(screen.getByText("Luke Skywalker")).toBeInTheDocument();
    expect(screen.getByText("Mass: 77")).toBeInTheDocument();
  });

  it("displays starship info when not loading", () => {
    render(
      <Player
        type="blue"
        playerData={mockStarshipData}
        isWinner={false}
        isLoading={false}
        scores={20}
      />
    );

    expect(screen.getByText("Millennium Falcon")).toBeInTheDocument();
    expect(screen.getByText("Crew: 4")).toBeInTheDocument();
  });

  it("displays winner card shadow", () => {
    render(
      <Player
        type="blue"
        playerData={mockPersonData}
        isWinner={true}
        isLoading={false}
        scores={20}
      />
    );

    const card = screen.getByTestId("player-card");
    expect(card).toHaveStyle(
      "box-shadow: 0 0 5px #fff,0 0 8px #fff,0 0 12px #fff,0 0 115px blue,0 0 25px blue"
    );
  });

  it("displays score on the screen", () => {
    render(
      <Player
        type="red"
        playerData={mockPersonData}
        isWinner={false}
        isLoading={false}
        scores={10}
      />
    );

    const score = screen.getByText("10");

    expect(score).toBeInTheDocument();
  });
});
