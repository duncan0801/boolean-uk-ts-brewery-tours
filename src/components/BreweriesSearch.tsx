import { SyntheticEvent, useState } from "react";
import React from "react";

import ListContainer from "./ListContainer";
import FilterContainer from "./FilterContainer";

type BreweriesSerachProps = {
	searchInput: string;
};
type filterType = {
    selectedCities: [];
	selectedType: string;
	
}

export default function BreweriesSearch({ searchInput }: BreweriesSerachProps) {
	const [cities, setCities] = useState<string[]>([]);
	const [filters, setFilters] = useState<filterType>
		({
		selectedCities: [],
		selectedType: "",
	});

	const updateFilters = (e: SyntheticEvent) => {
		let { name, value, checked, type } = e.target as HTMLInputElement;

		if (type === "checkbox") {
			const newVal = checked
				? [...filters.selectedCities, value]
				: filters.selectedCities.filter((c) => c !== value);

			setFilters({ ...filters, [name]: newVal });
		} else {
            setFilters({ ...filters, [name]: value });
        }
	};
	return (
		<main className="main-search">
			<ListContainer
				stateInput={searchInput}
				setCities={setCities}
				filters={filters}
			/>
			<FilterContainer
				cities={cities}
				filterSelections={filters}
				updateFilter={updateFilters}
			/>
		</main>
	);
}
