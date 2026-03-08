export type ContactInquiryStatus = "new" | "reviewed";

export type ContactInquiry = {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  status?: ContactInquiryStatus;
  createdAt?: Date;
  updatedAt?: Date;
};

export type CreateContactInquiryPayload = Pick<
  ContactInquiry,
  "name" | "email" | "phone" | "service" | "message"
>;

export type ContactInquiryRecord = ContactInquiry & {
  _id: string;
  createdAt?: string;
  updatedAt?: string;
};
