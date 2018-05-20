import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import * as store from '../../store/';
import { mapActions } from '../../actions';

@Component({
  selector: 'app-search-filter',
  templateUrl: './search-filter.component.html',
  styleUrls: ['./search-filter.component.scss']
})
export class SearchFilterComponent implements OnInit {
  @Output() textSearch = new EventEmitter<string>();
  panelOpened = false;
  formGroup: FormGroup;
  typeOptions = [
    'General Residential Operation',
    'Child Placing Agency',
    'Registered Child-Care Home',
    'Licensed Center'
  ];
  agesOptions = [
    'Infant',
    'Toddler',
    'Pre-Kindergarten',
    'School'
  ];
  servicesOptions = [
    'Emotional Disorders',
    'Mental Retardation',
    'Pervasive Development Disorder'
  ];
  programsOptions = [
    'After School Care',
    'Weekend Care',
    'Meals Provided',
    'Childrens with Special Needs'
  ];



  constructor(private _formBuilder: FormBuilder,
    private _store$: Store<store.State>
) {
    this.formGroup = this._initForm();
  }
  ngOnInit() {
    console.log(this.formGroup);
  }
  toggleSearchPanel() {
    this.panelOpened = this.panelOpened ? false : true;
  }

  submitFilter() {
    const formValue = this.formGroup.value;
    const { operationType, ages, services, programs } = formValue;

    const field1 = ['PROGRAMS_PROVIDED', programs];
    const field2 = ['LICENSED_TO_SERVE_AGES', ages];
    const field3 = ['TREATMENT_SERVICES', services];
    const field4 = ['OPERATION_TYPE', operationType];


    const query = `$select=OPERATION_ID,OPERATION_NAME,LOCATION_ADDRESS&$where=${field4[0]} like '%${field4[1]}%'`;


    this._store$.dispatch(new mapActions.LoadOperations({query: encodeURI(query)}));
  }

  _initForm() {
    return this._formBuilder.group({
      operationType: [''],
      ages: [''],
      services: [''],
      programs: ['']
    });
  }
}
