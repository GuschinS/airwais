import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ILocationForm } from '../form-location/form-location.component';

@Component({
  selector: 'app-form-search-flight',
  templateUrl: './form-search-flight.component.html',
  styleUrls: ['./form-search-flight.component.scss'],
})

export class FormSearchFlightComponent {
  passengers: IPassengers[] = [
    {
      name: 'Adults',
      desc: '14+ years',
      value: 0,
    },
    {
      name: 'Child',
      desc: '2-14 years',
      value: 0,
    },
    {
      name: 'Infant',
      desc: '0-2 years',
      value: 0,
    },
  ];
  dateAirport = dateAirport;
  searchForm!: FormGroup;
  selectDate: FormGroup | undefined;
  selectFromFlight: string | undefined;
  selectDestinationFlight: string | undefined;
  tripOption: string | undefined;
  optionPassenger: string | undefined;

  constructor(private fb: FormBuilder) {
    this.createForm();
    this.updatePassengers();
  }

  private createForm() {
    this.searchForm = this.fb.group({
      type: ['Round', []],
      origin: ['', [Validators.required]],
      destination: ['', [Validators.required]],
      startDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]],
    });
  }

  clickPlus(event: Event, name: string) {
    event.stopPropagation();
    this.passengers.map((item) => {
      if (item.name === name) {
        item.value += 1;
      }
    });
    this.updatePassengers();
  }

  clickMinus(event: Event, name: string) {
    event.stopPropagation();
    this.passengers.map((item) => {
      if (item.name === name) {
        item.value -= 1;
        if (item.value < 0) {
          item.value = 0;
        }
      }
    });
    this.updatePassengers();
  }

  reverseClick() {
    [this.selectFromFlight, this.selectDestinationFlight] = [
      this.selectDestinationFlight,
      this.selectFromFlight,
    ];
  }

  private updatePassengers() {
    this.optionPassenger = `${this.passengers[0].value} Adult, ${this.passengers[1].value} Child, ${this.passengers[2].value} Infant`;
  }

  onSubmit() {
    const controls = this.searchForm?.controls;
    if (this.searchForm?.invalid) {
      Object.keys(controls).forEach((controlName) =>
        controls[controlName].markAsTouched()
      );
      return;
    }

    console.log(this.searchForm.value);
  }

  get _from() {
    return this.searchForm.get('origin');
  }

  get _destination() {
    return this.searchForm.get('destination');
  }

  get _startDate() {
    return this.searchForm.get('startDate');
  }

  locationForms: ILocationForm[] = [
    {
      nameForm: 'origin',
      namelabel: 'From'
    },
    {
      nameForm: 'destination',
      namelabel: 'Destination'
    }
  ]

  searchForm: FormGroup;
  tripOption: string;

  constructor(private fb: FormBuilder) {
    this.createForm();
  }

  private createForm() {
    this.searchForm = this.fb.group({
      type: ['Round', []],
      startDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]],
    });
  }


  reverseClick() {
    [this.locationForms[0].namelabel, this.locationForms[1].namelabel] = [this.locationForms[1].namelabel, this.locationForms[0].namelabel];
    this.locationForms.reverse();
  }

  onSubmit() {
    if (this.searchForm.invalid) {
      this.searchForm.markAllAsTouched()
      return;
    }

    console.log(this.searchForm.value)
  }


  get _startDate() {
    return this.searchForm.get('startDate');
  }

  get _endDate() {
    return this.searchForm.get('endDate');
  }
}
