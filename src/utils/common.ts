import { format } from 'date-fns';

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

const padTwoDigits = (num: number) => {
	return num.toString().padStart(2, '0');
};

const timeToSave = (dt: string) => {
	let tdate = new Date(dt);
	return [
		padTwoDigits(tdate.getHours()),
		padTwoDigits(tdate.getMinutes()),
		padTwoDigits(tdate.getSeconds()),
	].join(':');
};

const dateToSave = (dt: string) => {
	let tdate = new Date(dt);
	return [
		tdate.getFullYear(),
		padTwoDigits(tdate.getMonth() + 1),
		padTwoDigits(tdate.getDate()),
	].join('-');
};

const formatDateString = (dt: string | undefined, pattern: string) => {
	var newDateformat = '';
	if (dt) {
		const newDate = new Date(dt);
		newDateformat = format(newDate, pattern);
	}

	return newDateformat;
};

export { convertDate, timeToSave, dateToSave, formatDateString };
