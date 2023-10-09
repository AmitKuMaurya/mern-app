export interface IProduct {
    productName: string;
    quantity: number;
    price: number;
    // discountType: 'flat' | 'percentage';
    discount : string;
    // userId :  string;
    productThumbnail: string;
  }

export interface IUserChangePswd {
    password : string;
    newPassword : string;
    confirmNewPassword : string;
}
  