import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, interval, Subscription } from 'rxjs';
import {
  trigger,
  state,
  style,
  transition,
  animate
} from '@angular/animations';
import { map, filter } from 'rxjs/operators';
import { WeatherService } from '../weather.service';
import { Slide } from '../interfaces/slide';
import { CurrencyService } from '../currency.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger('slideAnimation', [
      state(
        'inactive',
        style({
          opacity: 0
        })
      ),
      state(
        'active',
        style({
          opacity: 1
        })
      ),
      transition('inactive => active', animate('600ms ease')),
      transition('active => inactive', animate('1200ms ease'))
    ])
  ]
})
export class HomeComponent implements OnInit, OnDestroy {
  slides$: Observable<Array<Slide>>;
  slides: Array<Slide>;

  slidesLength: number;
  autoPlaySub: Subscription;

  autoPlayInterval: number;
  autoPlayInterval$: Observable<number>;

  currentSlide = 0;

  datetimeSub: Subscription;
  dateRU: string;
  dateENG: string;
  time: string;

  currentTemp$: Observable<{}>;
  forecast$: Observable<{}>;

  currency$: Observable<{}>;

  daysOfWeek = {
    ru: [
      'Воскресенье',
      'Понедельник',
      'Вторник',
      'Среда',
      'Четверг',
      'Пятница',
      'Суббота'
    ],
    eng: ['Sun', 'Mon', 'Tues', 'Wed', 'thurs', 'Fri', 'Sat']
  };

  months = {
    ru: [
      'Января',
      'Февраля',
      'Марта',
      'Апреля',
      'Мая',
      'Июня',
      'Июля',
      'Августа',
      'Сентября',
      'Ноября',
      'Декабря'
    ],
    eng: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ]
  };

  constructor(
    private afs: AngularFirestore,
    private ref: ChangeDetectorRef,
    private weather: WeatherService,
    private currency: CurrencyService
  ) {}

  ngOnInit() {
    this.currency$ = this.currency.currencyRealtime$;
    this.setWeather();

    this.datetimeSub = interval(1000).subscribe(() => {
      this.setDate();
    });

    this.slides$ = this.afs.collection<Slide>('slides').valueChanges();

    this.autoPlayInterval$ = this.afs
      .collection('meta')
      .doc('settings')
      .valueChanges()
      .pipe(
        filter(data => !!data),
        map(data => data['slidesInterval'])
      );
    this.autoPlayInterval$.subscribe(i => {
      this.autoPlayInterval = i;
      this.autoPlay();
    });

    this.slides$.subscribe(slides => {
      this.slides = slides;
      this.ref.markForCheck();
    });
  }

  ngOnDestroy() {
    try {
      this.autoPlaySub.unsubscribe();
      this.datetimeSub.unsubscribe();
    } catch (error) {}
  }

  setWeather() {
    this.currentTemp$ = this.weather.currentRealtime$;
    this.forecast$ = this.weather.forecastRealtime$;
  }

  setDate() {
    const dateRef = new Date();

    const dayOfWeekRU = this.daysOfWeek.ru[dateRef.getDay()];
    const dayOfWeekENG = this.daysOfWeek.eng[dateRef.getDay()];
    const day = dateRef.getDate().toString();
    const year = dateRef.getFullYear().toString();
    const monthRU = this.months.ru[dateRef.getMonth()];
    const monthENG = this.months.eng[dateRef.getMonth()];

    let hours: string = dateRef.getHours().toString();
    if (dateRef.getHours() < 10) {
      hours = '0' + hours.toString();
    }

    let minutes: string = dateRef.getMinutes().toString();
    if (dateRef.getMinutes() < 10) {
      minutes = '0' + minutes.toString();
    }

    this.time = `${hours}:${minutes}`;
    this.dateRU = `${dayOfWeekRU}, ${day} ${monthRU} ${year} года`;
    this.dateENG = `${dayOfWeekENG}, the ${day} of ${monthENG}, ${year}`;

    this.ref.markForCheck();
  }

  autoPlay() {
    if (this.autoPlaySub) {
      this.autoPlaySub.unsubscribe();
    }
    this.autoPlaySub = interval(this.autoPlayInterval).subscribe(() => {
      this.nextSlide();
    });
  }

  nextSlide() {
    if (this.currentSlide === this.slides.length - 1) {
      this.currentSlide = 0;
    } else {
      this.currentSlide++;
    }
    this.ref.markForCheck();
  }

  sortSlides(prop: string) {
    return this.slides
      .filter(slide => slide.type === 'video' || slide.type === 'image')
      .sort((a, b) => (a[prop] > b[prop] ? 1 : a[prop] === b[prop] ? 0 : -1));
  }

  trackByFn(index, slide) {
    return slide.id; // or item.id
  }
}
