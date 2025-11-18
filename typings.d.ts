type ArtisanPreviousWorksProp = {
  image: any;
  service: string;
  date: string;
  price: number;
  clientPrdouct: string;
};

type ArtisansDataObjProps = {
  id: string;
  name: string;
  rating: number;
  image: any;
  profession: string;
  service: string;
  verified: boolean;
  price: number;
  otherServices: Array<string>;
  reviews: number;
  gallery: Array<any>;
  previousWorks: Array<ArtisanPreviousWorksProp>;
  city?: string;
  region?: string;
  completedServices: Array<{
    id: string;
    service: string;
    category: string;
    minimumPrice: number;
    maximumPrice: number;
    image: any;
  }>;
};

type BookingsDataProps = {
  id?: string;
  service: string;
  clientProduct: string;
  image: any;
  dateTime: string;
  status?: "Pending" | "Confirmed" | "Cancelled";
  address: string;
  provider: ArtisansDataObjProps;
};

type ArtisanCategoryObjProps = {
  id: string;
  profession: string;
};

type ClientMessageObjProps = {
  id: string;
  parentId: string;
  text: string;
  time: any;
  sender: "client" | "artisan";
  unread?: false | boolean;
  image?: any;
  type: "text" | "media";
};
type ClientMessagesProps = {
  id: string;

  artisan: ArtisansDataObjProps;
  messages: Array<ClientMessageObjProps>;
};

type ArtisanPaymentDataProps = {
  id: string;
  image: string | any;
  clientName: string;
  amount: number;
  paymentMethod: "cash" | "mobileMoney";
  refNumber: number;
  paymentTime: any;
  senderName: string;
  serviceCharge: number;
  paymentStatus: "success" | "failure";
};

type UserDataProps = {
  id: string;
  firstName?: string;
  lastName?: string;
  email: string;
  phoneNo: string;
  password: string;
  accountType: "client" | "artisan";
  clientType?: "individual" | "company";
  artisanType?: "individual" | "company";
  street: string;
  region: string;
  city: string;
  town: string;
  companyIndustry?: string;
  companyName?: string;
  image: any;
  service: string;
  artisanSuscribed?: boolean;
  artisanIdVerifyStatus?: "done" | "failed";
  artisanMomoStatus?: "done" | "failed";
};

type ArtisanRatingsProps = {
  id: string;
  image: any;
  firstName: string;
  lastName: string;
  review: string;
  rating: number;
};

type ArtisanNewOrdersProp = {
  id: string;
  firstName: string;
  lastName: string;
  date: string;
  time: string;
  service: string;
  startingPrice: number;
  price: number;
  image: any;
  address: string;
  comment?: string;
};

type JobsProp = {
  id: string;
  firstName: string;
  lastName: string;
  date: string;
  time: string;
  service: string;
  startingPrice: number;
  price: number;
  image: any;
  status?: "pending" | "completed";
  clientRating?: number;
  clientData?: ClientDataObjProps;
};

type AllNotificationProps = {
  id: string;
  firstName: string;
  lastName: string;
  date: string;
  time: string;
  service: string;
  startingPrice: number;
  price: number;
  image: any;
  address?: string;
  comment?: string;
  status?: "pending" | "completed";
  clientRating?: number;
  clientData?: ClientDataObjProps;
};

type ArtisanBookingsProps = {
  status: "pending" | "completed" | "cancelled";
  id: string;
  image: any;
  firstName: string;
  lastName: string;
  bookDate: string;
  bookTime: string;
  updatedTime: number;
  service: string;
  startingPrice: number;
  price: number;
  clientRating?: number;
  paymentMethod: "online" | "offline";
  ongoing?: boolean;
  paymentMade?: boolean;
  clientData?: ClientDataObjProps;
};

type ClientDataObjProps = {
  id: string;
  firstName: string;
  lastName: string;
  image: any;
  phoneNo?: string;
};

type ArtisanMessageObjProps = {
  id: string;
  parentId: string;
  text?: string;
  time: number;
  sender: "client" | "artisan";
  unread?: boolean;
  image?: any;
  type: "text" | "media";
};
type ArtisanMessagesProps = {
  id: string;
  client: ClientDataObjProps;
  messages: Array<ArtisanMessageObjProps>;
};

type ArtisanPaymentHistoryProps = {
  id: string;
  time: number;
  status: "expired" | "active";
  price: number;
};

type ArtisanEarnings = {
  id: string;
  firstName: string;
  lastName: string;
  service: string;
  date: number;
  image: any;
  price: number;
  status: "settled" | "awaiting";
};

type ArtisanDebts = {
  id: string;
  firstName: string;
  lastName: string;
  service: string;
  date: number;
  image: any;
  price: number;
  status: "pending" | "paid";
};

type ArtisanServicesProps = {
  id: string;
  service: string;
  category: string;
  status: "pending" | "approved" | "rejected";
  minimumPrice: number;
  maximumPrice: number;
  image: any;
  features: Array<string>;
};

Message;
