import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Doctor } from '../../doctors/models/doctor.model';
import { DoctorService } from '../../doctors/services/doctor.service';
import { Doc } from '../models/doc.model';
import { Slot } from '../models/slot.model';
import { User } from '../models/user.model';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-appointments',
  templateUrl: './user-appointments.component.html',
  styleUrls: ['./user-appointments.component.css']
})
export class UserAppointmentsComponent implements OnInit, OnDestroy {
  user?: User;
  id?: string;
  slots?: Slot[];
  doctors: Doc[];

  appointmentSubscription?: Subscription;
  doctorSubscription?: Subscription;
  constructor(private userService: UserService,
    private doctorService: DoctorService) {
    this.doctors = [] as Doc[];

  }

  ngOnInit(): void {
    this.id = localStorage.getItem("user-Id") ?? "";

    this.appointmentSubscription = this.userService.getUserById(this.id)
      .subscribe({
        next: (response) => {
          this.user = response;
          this.slots = this.user.slots;


          this.slots.forEach(slot => {

            this.doctorSubscription = this.doctorService.getDoctorById(slot.doctorId)
              .subscribe(
                {
                  next: (res) => {

                    let doc: Doc = {
                      name: res.name,
                      fee: res.fees
                    }

                    this.doctors.push(doc);

                  }
                }
              )
            // this.doctors?.fill()
            // this.doctorService.getDoctorById(slot.doctorId);
          });
          //this.doctors = Array.from(new Set(this.user.slots.map(slot => slot.doctor)));

        }
      })
  }

  isDateExpired(dateString: string): boolean {
    const currentDate = new Date();

    const dateToCompare = new Date(dateString);



    if (dateToCompare.getFullYear() !== currentDate.getFullYear()) {
      return dateToCompare.getFullYear() < currentDate.getFullYear();
    } else {
      if (dateToCompare.getMonth() === currentDate.getMonth()) {
        return dateToCompare.getDate() < currentDate.getDate();

      } else {
        return dateToCompare.getMonth() < currentDate.getMonth()
      }

    }




  }

  ngOnDestroy(): void {
    this.appointmentSubscription?.unsubscribe();
    this.doctorSubscription?.unsubscribe();
  }





}
