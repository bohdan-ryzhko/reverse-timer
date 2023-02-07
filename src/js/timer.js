import { Notify } from 'notiflix';

class Timer {
	constructor(timerContainer, circle, timerPicker) {
		this.timerContainer = document.querySelector(`${timerContainer}`);
		this.circle = document.querySelector(`${circle}`);
		this.timerPicker = timerPicker;
		this.amountDaysRef = this.timerContainer.querySelector('[data-days]');
		this.amountHoursRef = this.timerContainer.querySelector('[data-hours]');
		this.amountMinsRef = this.timerContainer.querySelector('[data-minutes]');
		this.amountSecsRef = this.timerContainer.querySelector('[data-seconds]');
		this.timerId = null;
		this.isActive = false;
	}

	start() {
		if (this.isActive || this.timerPicker.latestSelectedDateObj < Date.now()) {
			Notify.failure('Please choose a date in the future')
			return;
		}

		const selectedTime = this.timerPicker.latestSelectedDateObj;
		this.isActive = true;
		const fullTime = selectedTime - Date.now();

		const radius = this.circle.r.baseVal.value;
		const circumference = 2 * Math.PI * radius;
		
		this.timerId = setInterval(() => {
			const timeNow = Date.now();
			const percent = (selectedTime - timeNow) * 100 / fullTime;

			this.circle.style.strokeDashoffset = `${circumference - this.setProgress(percent, circumference)}`;

			const countDays = this.addLeadingZero(this.convertMs(timeNow - selectedTime).days  * (-1) - 1);
			const countHours = this.addLeadingZero(this.convertMs(timeNow - selectedTime).hours  * (-1) - 1);
			const countMins = this.addLeadingZero(this.convertMs(timeNow - selectedTime).minutes  * (-1) - 1);
			const countSecs = this.addLeadingZero(this.convertMs(timeNow - selectedTime).seconds * (-1) - 1);

			this.amountDaysRef.textContent = countDays;
			this.amountHoursRef.textContent = countHours;
			this.amountMinsRef.textContent = countMins;
			this.amountSecsRef.textContent = countSecs;

			if (this.amountDaysRef.textContent === '00'
				&& this.amountHoursRef.textContent === '00'
				&& this.amountMinsRef.textContent === '00'
				&& this.amountSecsRef.textContent === '00') {
				this.stop();
			}
		}, 1000);
	}

	stop() {
		if (!this.isActive) {
			return;
		}

		Notify.info('Time is over!')
		this.circle.style.strokeDashoffset = 0;
		this.isActive = false;
		clearInterval(this.timerId);
	}

	reset() {
		if (this.isActive) {
			this.stop();
			this.amountDaysRef.textContent = '00';
			this.amountHoursRef.textContent = '00';
			this.amountMinsRef.textContent = '00';
			this.amountSecsRef.textContent = '00';
		}
		return;
	}

	addLeadingZero(value) {
		return String(value).padStart(2, '0');
	}

	setProgress(percent, circumference) {
		return percent * circumference / 100;
	}

	convertMs(ms) {
		// Number of milliseconds per unit of time
		const second = 1000;
		const minute = second * 60;
		const hour = minute * 60;
		const day = hour * 24;

		// Remaining days
		const days = Math.floor(ms / day);
		// Remaining hours
		const hours = Math.floor((ms % day) / hour);
		// Remaining minutes
		const minutes = Math.floor(((ms % day) % hour) / minute);
		// Remaining seconds
		const seconds = Math.floor((((ms % day) % hour) % minute) / second);

		return { days, hours, minutes, seconds };
	}
}

export default Timer;