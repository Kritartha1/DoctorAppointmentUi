import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Doctor } from '../../doctors/models/doctor.model';
import { DoctorService } from '../../doctors/services/doctor.service';

@Component({
  selector: 'app-add-appointment',
  templateUrl: './add-appointment.component.html',
  styleUrls: ['./add-appointment.component.css']
})
export class AddAppointmentComponent implements OnInit {

  docName?: string = '';
  fee?: string = '0';

  constructor(private router: Router,
    private route: ActivatedRoute,
    private doctorService: DoctorService) {

  }



  ngOnInit(): void {
    // Retrieve data from localStorage
    this.docName = localStorage.getItem('Doctor') ?? '';
    this.fee = localStorage.getItem('Fee') ?? '0';

    // Parse or process the data as needed


  }



  printInvoice(): void {
    window.print();
  }
  book(): void {


    // window.location.replace('/slots/SlotBooked/pay/booked');
    this.router.navigateByUrl('/slots/SlotBooked/pay/booked');

  }

}
