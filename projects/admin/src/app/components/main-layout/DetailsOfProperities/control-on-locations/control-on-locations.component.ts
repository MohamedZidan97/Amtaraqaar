import { CommonModule } from '@angular/common';
import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-details-of-location',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './control-on-locations.component.html',
  styleUrl: './control-on-locations.component.scss'
})
export class ControlOnLocationsComponent implements OnInit{
  cities: any = [{ id: 1, name: 'najran' }, { id: 2, name: 'elriad' },{ id: 3, name: 'Gada'}];
  districts = [
    { id: 1, name: 'khmis', cityId: 1 }, { id: 2, name: 'elmontashar', cityId: 1 },
    { id: 3, name: 'hdar', cityId: 2 }, { id: 4, name: 'taih', cityId: 2 }
  ];

  cityId: number = 0;
  governorateId:number=0;
  districtId:number=0;

  districtNameM:string='';



  cityForm: FormGroup;
  governorateForm: FormGroup;
  districtForm: FormGroup;

  constructor(private fb: FormBuilder) {
   
    this.cityForm=this.fb.group({
      name: ['',[Validators.required]]
    })
    this.governorateForm=this.fb.group({
      name: ['',[Validators.required]]
    })
    this.districtForm = this.fb.group({
      name: ['',[Validators.required]]
    });
  }

  ngOnInit(): void {
   this.cities;
   this.districts;
   this.cityId;
  }


//                               City

//get all


// submitting
onSubmitCity() {
  let disVal = this.cityForm.value;
  this.cities.push({ id: 5, name: disVal.name});
  
}


// district
  get districtName() {
    return this.districtForm.get('name');
  }
  giveCitId(id: number) { this.cityId = id };
  deleteDistirct(){
    this.districts = this.districts.filter(dis => dis.id !== this.districtId);
  }
  onSubmitDistrict() {
    let disVal = this.districtForm.value;
    this.districts.push({ id: 5, name: disVal.name, cityId: this.cityId });
    
  }
  


}


