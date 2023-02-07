import { Notify } from 'notiflix';
import flatpickr from "flatpickr";
import Timer from './js/timer';
import "./css/style.scss";

console.log(new Timer('.timer'))
const inputTime = document.querySelector('#datetime-picker')

flatpickr(inputTime);
