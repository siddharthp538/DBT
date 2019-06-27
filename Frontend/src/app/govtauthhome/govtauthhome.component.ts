import { Component, OnInit } from '@angular/core';
import { GovtdataService } from '../govtdata.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-govtauthhome',
  templateUrl: './govtauthhome.component.html',
  styleUrls: ['./govtauthhome.component.scss']
})
export class GovtauthhomeComponent implements OnInit {

  titleID = '';
  dashboardData: any;
  releaseFundsSuccessToggle: boolean = false;

  releaseFundsData:any;

  subsidyData:any;

  releaseFundsPostData:any = {
    gasAgencyRegistrationId: '',
    govAuthorityId: ''
  }

  releaseFundsPostData2: any = {
    gasAgencyRegistrationId: '',
    govAuthorityTitle: '',
    govAuthorityId: ''
  }

  constructor(private localGovStorageService: GovtdataService, private http: HttpClient) { }

  ngOnInit() {
    this.titleID = this.localGovStorageService.getFromLocalStorageGov();
    this.http.get('http://localhost:3000/api/GovAuthority/'+this.titleID).subscribe(data => {
      console.log(data)
      this.dashboardData = data;
    });

    this.http.get('http://localhost:3000/api/GasAgency/').subscribe(data => {
      console.log(data)
      this.releaseFundsData = data;
    });

    this.http.get('http://localhost:3000/api/SubsidyAmount/').subscribe(data => {
      console.log(data)
      this.subsidyData = data;
    });
  }

  releaseFunds(id: string ){
    this.http.get('http://localhost:3000/api/GasAgency/'+ id).subscribe(data => {
      console.log(data)
      this.releaseFundsPostData = data;
      this.releaseFundsPostData2.gasAgencyRegistrationId = this.releaseFundsPostData.gasAgencyRegistrationId;
      this.releaseFundsPostData2.govAuthorityTitle = this.dashboardData.govAuthorityTitle;
      this.releaseFundsPostData2.govAuthorityId = this.dashboardData.govAuthorityId;

      console.log(this.releaseFundsPostData2);

      const headers = new HttpHeaders()
    .set('Authorization', 'my-auth-token')
    .set('Content-Type', 'application/json');

      this.http.post('http://localhost:3000/api/RelaseFunds', JSON.stringify(this.releaseFundsPostData2), {
        headers: headers
        })
        .subscribe(data => {
        console.log(data);
        this.releaseFundsSuccessToggle = true;
       });
    });


  }

}
