import { useState, useEffect } from "react";
import React from "react";
import { getBreweriesByState } from "../breweryDbClient";
import BreweriesList from "./BreweriesList";

type ListContainerProps = {
	stateInput: string;
	setCities: (cities: string[]) => void;
	filters: { selectedCities: string[]; selectedType: string };
};

export type Brewery = {
	id: number;
	obdb_id: string;
	name: string;
	brewery_type: string;
	street: string;
	address_2: string | null;
	address_3: string | null;
	city: string | null;
	state: string | null;
	county_province: string | null;
	postal_code: string | null;
	country: string | null;
	longitude: string | null;
	latitude: string | null;
	phone: string | null;
	website_url: string | null;
	updated_at: string | null;
	created_at: string | null;
};

const parseData = (allBreweries: Brewery[]) =>
	allBreweries.filter((brewery) =>
		["micro", "regional", "brewpub"].includes(brewery["brewery_type"])
	);

const extractCities = (allBreweries: Brewery[]) =>
	allBreweries.reduce(
		(acc: string[], brewery: Brewery) =>
			acc.includes(brewery.city) ? acc : [...acc, brewery.city],
		[]
	); //TODO

export default function ListContainer({
	stateInput,
	setCities,
	filters: { selectedCities, selectedType },
}: ListContainerProps) {
	const [breweries, setBreweries] = useState<Brewery[]>([]);
	const [searchInput, setSearchInput] = useState("");

	const applyFilters = (allBreweries: Brewery[]) =>
		allBreweries.filter(isSelected);

	const isSelected = ({ city, brewery_type, name }: Brewery) => {
		const lowerCasedInput = searchInput.toLowerCase();
		if (city) {
			return (
				(selectedType ? selectedType === brewery_type : true) &&
				(selectedCities.length
					? selectedCities.includes(city)
					: true) &&
				(searchInput
					? city.toLowerCase().includes(lowerCasedInput) ||
					  name.toLowerCase().includes(lowerCasedInput)
					: true)
			);
		}
	};

	useEffect(() => {
		stateInput &&
			getBreweriesByState(stateInput).then((data) => {
				const breweries = parseData(data);
				setBreweries(breweries);
				setCities(extractCities(breweries)); //TODO
			});
	}, [stateInput]);

	return (
		<>
			<h1>List of Breweries from {breweries[0]?.state || "nowhere"}</h1>
			<header className="search-bar">
				<form id="search-breweries-form" autoComplete="off">
					<label htmlFor="search-breweries">
						<h2>Search breweries:</h2>
					</label>
					<input
						id="search-breweries"
						name="search-breweries"
						value={searchInput}
						onInput={({ target }) => setSearchInput(target.value)}
						type="text"
					/>
				</form>
			</header>
			<BreweriesList breweries={applyFilters(breweries)} />
		</>
	);
}
