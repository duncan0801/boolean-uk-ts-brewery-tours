import { useState } from "react";
import React from "react";
import Header from "./components/Header";
import BreweriesSearch from "./components/BreweriesSearch";
import BookingsContainer from "./components/BookingsContainer";
import "./styles/reset.css"
import "./styles/index.css"


export default function App() {
	const [searchInput, setSearchInput] = useState<string>("");
	const [showBookings, setShowBookings] = useState<boolean>(false);

	return (
		<>
			<Header
				submitForm={setSearchInput}
				setShowBookings={setShowBookings}
			/>
			{/* {!searchInput || (showBookings && <BookingsContainer />)} */}
			{searchInput && <BreweriesSearch searchInput={searchInput} />}
		</>
	);
}
