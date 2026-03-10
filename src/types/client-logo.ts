export type ClientLogo = {
  name: string;
  src: string;
  publicId?: string;
  isActive?: boolean;
  sortOrder?: number;
  createdAt?: Date | string;
  updatedAt?: Date | string;
};

export type UploadClientLogoPayload = {
  name: string;
  file: File;
};

export type CreateClientLogoPayload = {
  name: string;
  url: string;
};

export type UpdateClientLogoPayload = {
  id: string;
  name: string;
  url: string;
};

export type ClientLogoRecord = ClientLogo & {
  _id: string;
};

export type ClientLogoListItem = {
  id: string;
  name: string;
  src: string;
};

export type UploadFilePayload = {
  file: File;
  folder?: string;
};

export type UploadFileResponseData = {
  url: string;
  pathname: string;
};
