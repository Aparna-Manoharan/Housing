
import { Component, OnInit } from '@angular/core';
import { HousingService } from 'src/app/services/housing.service';
import { IProperty } from '../IProperty.inrerface';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-property-list',
    templateUrl: './property-list.component.html',
    styleUrls: ['./property-list.component.css']
})
export class PropertyListComponent implements OnInit {
  SellRent =1;
  properties :IProperty[] ;

  constructor(private route:ActivatedRoute, private housingService:HousingService) {

    }
    ngOnInit(): void{
      if(this.route.snapshot.url.toString()){
        this.SellRent=2;
      }
      this.housingService.getAllProperties(this.SellRent).subscribe({
        next: data=>{
          this.properties=data
          console.log(this.route)
        },
        error: err=>{
          console.log('httperror:' + err);
        }
      })
  }
}
