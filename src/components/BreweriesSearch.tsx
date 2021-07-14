import { useState } from "react";
import React from "react";

import ListContainer from "./ListContainer";
import FilterContainer from "./FilterContainer";

type BreweriesSerachProps = {
	searchInput: string;
};
// type EventTarget = {
// 	name: string;
// 	value: string;
// 	checked: boolean;
// 	type: boolean;
// };

export default function BreweriesSearch({ searchInput }: BreweriesSerachProps) {
	const [cities, setCities] = useState<string[]>([]);
	const [filters, setFilters] = useState<{
        selectedCities: []
        selectedType: string
    }>({
		selectedCities: [],
		selectedType: "",
	});

	const updateFilters = (e: Event) => {
		let { name, value, checked, type } = e.target;

		if (type === "checkbox")
			value = checked
				? [...filters.selectedCities, value]
				: filters.selectedCities.filter((c) => c !== value);

		setFilters({ ...filters, [name]: value });
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
