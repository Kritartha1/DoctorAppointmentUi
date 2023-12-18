import { Doctor } from "../../doctors/models/doctor.model";
import { Doc } from "./doc.model";

export interface Slot {

    id: string;
    startTime: string;
    endTime: string;
    timeSpan: string;
    userId: string;
    doctorId: string;
    doctor: Doctor;


}