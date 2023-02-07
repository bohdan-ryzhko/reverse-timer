import { Notify } from 'notiflix';
import flatpickr from "flatpickr";
import Timer from './js/timer';
import "./css/style.scss";

const circle = document.querySelector('.progress-ring__circle');
const radius = circle.r.baseVal.value;
const circumference = 2 * Math.PI * radius;

function setProgress(percent) {
	return circumference * percent / 100;
}

circle.style.strokeDasharray = `${circumference} ${circumference}`;
circle.style.strokeDashoffset = `${circumference * 2}`;

const refs = {
	startBtnRef: document.querySelector('[data-start]'),
	resetBtnRef: document.querySelector('[data-reset]'),
	inputDate: document.querySelector('#datetime-picker'),
}

refs.startBtnRef.disabled = true;
refs.resetBtnRef.disabled = true;

const options = {
	enableTime: true,
	time_24hr: true,
	defaultDate: new Date(),
	minuteIncrement: 1,
	onClose(selectedDates) {
		if (selectedDates[0] < timerPicker.now) {
			Notify.failure('Please choose a date in the future');
			refs.startBtnRef.disabled = true;
			refs.resetBtnRef.disabled = true;
			return;
		}
		Notify.success('Correct');
		refs.startBtnRef.disabled = false;
		refs.resetBtnRef.disabled = false;
	},
};

const timerPicker = flatpickr('#datetime-picker', options);

const timer = new Timer('.timer', timerPicker);

function showTimerCircle() {
	const finalTime = new Date(refs.inputDate.value);

	let intervalId = setInterval(() => {
		const percent = setProgress(Date.now() * 100 / finalTime) + 942.478;
		circle.style.strokeDashoffset = setProgress(Date.now() * 100 / finalTime) + 942.478;
	}, 1000);

	return intervalId;
}

function resetInterface() {
	if (!timer.isActive) {
		return;
	}
	timer.reset.call(timer);
	refs.startBtnRef.disabled = true;
	refs.resetBtnRef.disabled = true;
}

refs.startBtnRef.addEventListener('click', timer.start.bind(timer));
refs.startBtnRef.addEventListener('click', showTimerCircle);
refs.resetBtnRef.addEventListener('click', resetInterface);