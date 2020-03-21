export type Request = {
  address: {
    address: string;
    center: [number, number];
    id: string;
    place_name: string;
    place_name_no: string;
    place_type: Array<string>;
    properties: {
      accuracy: string;
    };
    relevance: number;
    text: string;
    text_no: string;
    type: string;
  };
  arrivalDescription?: string;
  connectedUser?: {
    email: string;
    name: string;
    phoneNumber?: string;
  };
  createdOn: {
    seconds: number;
    nanoseconds: number;
  };
  delivered: boolean;
  email: string;
  items: Array<{
    added: boolean;
    count: number;
    itemName: string;
  }>;
  name?: string;
  otherNeed?: string;
  paymentSolution: 'Vipps' | 'Kontant' | 'Bankoverføring';
  phoneNumber?: string;
  uid: string;
};
