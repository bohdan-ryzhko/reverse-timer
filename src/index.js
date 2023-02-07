import { Notify } from 'notiflix';
import flatpickr from "flatpickr";
import Timer from './js/timer';
import "./css/style.scss";


const refs = {
	startBtnRef: document.querySelector('[data-start]'),
	resetBtnRef: document.querySelector('[data-reset]')
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

function resetInterface() {
	if (!timer.isActive) {
		return;
	}
	timer.reset.call(timer);
	refs.startBtnRef.disabled = true;
	refs.resetBtnRef.disabled = true;
	
}

refs.startBtnRef.addEventListener('click', timer.start.bind(timer));
refs.resetBtnRef.addEventListener('click', resetInterface);