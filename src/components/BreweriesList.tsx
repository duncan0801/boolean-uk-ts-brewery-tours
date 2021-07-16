import { useState } from "react";
import React from "react";
import BreweriesListItem from "./BreweriesListItem";
import { Brewery } from "./ListContainer";

type BreweriesListProps = {
    breweries: Brewery
}

export default function BreweriesList({ breweries }: BreweriesListProps) {
	const [openForm, setOpenForm] = useState<number | null>(null);

	return (
		<article>
			<ul className="breweries-list">
				{breweries.map((brewery) => (
					<BreweriesListItem
						key={brewery.id}
						brewery={brewery}
						setOpenForm={setOpenForm}
						isFormOpen={brewery.id === openForm}
					/>
				))}
			</ul>
		</article>
	);
}
