export interface SensorFilterProps {
	searchText: string;
	onSearchTextChange: (value: string) => void;
	typeFilter: string;
	onTypeFilterChange: (value: string) => void;
	statusFilter: string;
	onStatusFilterChange: (value: string) => void;
}
