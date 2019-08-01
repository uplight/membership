import {Observable, Subject} from 'rxjs';
import {FileUpload} from './app-models';

export class VOAccessToken {
  get isLoggedIn(): boolean {
    return !!this.accessToken;
  }

  idToken: string;
  accessToken: string;
  tokenClaims: any;
  userInfoClaims: any;
  accessTokenExpireTime: any;
  scope: string;
  expiresIn: string;
  tokenType: string;
  sessionState: string;

  constructor(obj?: any) {
    if (obj) {
      for (const str in obj) {
        this[str] = obj[str];
      }
    }
  }
}


export class VOAddress {
  id: number;
  dirty?: boolean;
  addressType: string;
  address1: string;
  address2: string;
  country: string;
  city: string;
  province: string;
  postCode: string;
  constructor(obj?: any) {
    if (obj) {
      this.apply(obj);
    }
  }

  apply(obj) {
    for (const str in obj) {
      this[str] = obj[str];
    }
  }
}


export class VOPersonFile implements FileUpload {
  id?: number;
  belongs: string;
  typeOfFile: string;
  filename: string;
  size: number;
  status: string;
  file: File;
  progress: Subject<any>;
  url?: string;
  createdAt?: string;
  constructor(obj?: any) {
    if (obj) {
      this.apply(obj);
    }
  }

  apply(obj) {
    for (const str in obj) {
      this[str] = obj[str];
    }
  }
}


export class VOPerson {
  id: number;
  uid: string;
  roles: string;
  firstName: string;
  lastName: string;
  middleName: string;
  birthday: string;
  gender: string;
  language: string;
  phone: string;
  phone2: string;
  email: string;
  status: string;
  confirmedAt: string;
  submittedAt: string;
  dirty: boolean;

  addresses?: VOAddress[];

  files: VOPersonFile[];
  document: string;


  constructor(obj?: any) {
    if (obj) {
      this.apply(obj);
    }
  }

  apply(obj) {
    for (const str in obj) {
      this[str] = obj[str];
    }
  }
}



export interface VOPaymentType {
  method_id: string;
  method_title: string;
}

export class VOOrder {
  id: number;
  customer: number;
  dateCreated: string;
  datePaid: string;
  orderId: number;
  orderKey: string;
  orderStatus: string;
  billingAddress: VOAddress;
  paymentDetails: VOPaymentType;

  constructor(obj?: any) {
    if (obj) {
      this.apply(obj);
    }
  }

  apply(obj) {
    for (const str in obj) {
      this[str] = obj[str];
    }
  }
}

export class VOMemberSubscription {
  id: number;
  user_id: number;
  cartHash: string;
  cartTax: number;
  customer: number;
  dateCreated: string;
  discountTax: number;
  discountTotal: number;
  orderKey: string;
  paymentMethod: string;
  paymentMethodTitle: string;
  scheduleNextPayment: string;
  shippingTax: number;
  shippingTotal: number;
  subscriptionId: number;
  subscriptionStatus: string;
  total: number;
  totalTax: number;
  billingAddress: VOAddress;
  shippingAddress: VOAddress;
  parentOrder: VOOrder;

  constructor(obj?: any) {
    if (obj) {
      this.apply(obj);
    }
  }

  apply(obj) {
    for (const str in obj) {
      this[str] = obj[str];
    }
  }
}

export class VOMembership {
  id: number;
  user_id: number;
  subscriptions: VOMemberSubscription[];
  squadronID: string;
}




