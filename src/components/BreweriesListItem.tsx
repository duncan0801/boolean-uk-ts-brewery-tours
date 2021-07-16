import { SyntheticEvent, useState } from "react";
import BookingForm from "./BookingForm";
import React from "react";
import { Brewery } from "./ListContainer";

import { postNewBooking } from "../breweryDbClient";

const initialForm = {
	firstName: "",
	lastName: "",
	date: "",
	peopleCount: "",
	time: "",
};

// type Brewery = {
// 	name: string | null;
// 	brewery_type: "micro" | "brewpub" | "regional" | null;
// 	phone: string | null;
// 	website_url: string | null;
// 	street: string | null;
// 	city: string | null;
// 	postal_code: string | null;
// 	id: number;
// };
type SetOpenFormFunc = (openForm: number) => null | number;

type BreweryListItemProps = {
	brewery: Brewery;
	isFormOpen: boolean;
	setOpenForm: (arg: SetOpenFormFunc | number | null) => void;
};

function BreweriesListItem({
	brewery: {
		name,
		brewery_type,
		phone,
		website_url,
		street,
		city,
		postal_code,
		id,
	},
	isFormOpen,
	setOpenForm,
}: BreweryListItemProps) {
	const [form, setForm] = useState(initialForm);
	const updateForm = (e: SyntheticEvent) => {
		const { name, value } = e.target as HTMLInputElement;

		setForm((form) => ({ ...form, [name]: value }));
	};

	const clearForm = () => setForm(initialForm);

	return (
		<li>
			<h2>{name}</h2>
			<div className="type">{brewery_type}</div>
			<section className="address">
				<h3>Address:</h3>
				<p>{street}</p>
				<p>
					<strong>
						{city}, {postal_code}
					</strong>
				</p>
			</section>
			<section className="phone">
				<h3>Phone:</h3>
				<p>{phone || "N/A"}</p>
			</section>
			<section className="booking">
				{
					<button
						onClick={() =>
							setOpenForm((openForm: number) =>
								openForm === id ? null : id
							)
						}
					>
						Book a tour
					</button>
				}
			</section>
			<section className="link">
				{website_url && (
					<a href={website_url} target="_blank">
						Visit Website
					</a>
				)}
			</section>
			{isFormOpen && (
				<BookingForm
					handleSubmit={() => {
						postNewBooking({ ...form, breweryId: id });
						clearForm();
					}}
					updateForm={updateForm}
					form={form}
				/>
			)}
		</li>
	);
}
export default BreweriesListItem;
