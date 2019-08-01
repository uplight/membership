import {VOPerson} from './user-models';


export enum MemberState {
  FORMER_STUDENT = 'FORMER_STUDENT',
  OTHER = 'OTHER'
}


export class VOMember extends VOPerson{
  id: number;
  user_id: number;
  head_id: number;
  memberType: string;
  memberState: MemberState;
  familyRole: string;
  status: string;
  family: VOMember[];

  constructor(obj?:any) {
    super(obj);
  }

}


export interface SOSquadron {
  city: string;
  districtId: string; // number
  districtNameEN: string;
  districtNameFR: string;
  homePage: string;
  isActive: boolean;
  nameEN: string;
  nameFR: string;
  provinceState: string;
  regionId: string; // number
  regionNameEN: string;
  regionNameFR: string;
  squadronId: string; // number
}


export interface SOSaveMemberProfile {
  mainApplicant: VOMember;
  familyMembers: VOMember[];
  description: string;
  squadronId: string;
  applicationType: string;
  overwrite?: boolean;
}
