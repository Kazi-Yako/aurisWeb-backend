const convertDate = (dt: string) => {
	let tdate = new Date(dt);
	let newDate =
		tdate.getDate() +
		' ' +
		tdate.toLocaleString('default', { month: 'long' }) +
		' ' +
		tdate.getFullYear();
	return newDate;
};

export { convertDate };
