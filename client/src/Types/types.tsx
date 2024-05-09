export type linkArrType = {
  url: string;
  title?: string;
  Icon?: any;
  action?: (target?: any) => void;
  isTarget?: boolean;
};

export type imgHolderType = {
  alt?: string;
  imgHolderClass?: string;
  src: any;
  height?: number;
  width?: number;
  action?: (e: any) => void;
};
export type imageType = {
  public_id: string;
  url: string;
};

export type briefFormArrObjType = {
  value: any;
  inputType?: string;
  name: string;
  label: string;
  placeholder?: string;
  selectOptions?: string[];
  inputHolderClass?: string;
  action?: (e: any) => void;
};

export type briefType = {
  jobType: string;
  _id?: string;
  __v?: number;
  createdAt?: string;
  updatedAt?: string;
  brandName: String;
  brandServices: string[];
  brandContact: number;
  brandColors: string[];
  brandValues: string[];
  brandEmail: string;
  brandLocation: string;
  brandDescription: string;
  jobDescription: string;
  brandVisuals: imageType[];
  // client
  clientContact: number;
  clientName: string;
  clientEmail: string;
  clientLocation: string;
};
export type urlType = {
  link: string,
  type:"server" | "client"
}
export type projectType = {
  _id?: string;
  __v?: number;
  status?: "ongoing" | "completed";
  createdAt?: string;
  updatedAt?: string;
  brief: briefType;
  name: string;
  type: "software" | "design";
  cost: number;
  webUrls?: urlType[];
  designs?: imageType[];
  deploymentPlatforms?: string[];
  techStacks?: string[];
};

export type resultType = {
  err: null | string;
  data: any[] | null | object;
};

export type passcodeType = {
  key: string;
  _id?: string;
  __v?: number;
  createdAt?: string;
  updatedAt?: string;
  isUsed: boolean;
  isLocked: boolean;
  projectId?: string;
};

export type briefSliceType = {
  passcode: passcodeType;
  allow: boolean;
  brief: briefType;
  isLoading: boolean;
};

export type weakProjectType = {
  _id?: string;
  __v?: number;
  status?: "ongoing" | "completed";
  createdAt?: string;
  updatedAt?: string;
  brief?: briefType;
  name?: string;
  type?: "software" | "design";
  cost?: number;
  webUrls?: urlType[];
  designs?: imageType[];
  deploymentPlatforms?: string[];
  techStacks?: string[];
};

export type projectSliceType = {
  search?: string;
  projectList?: projectType[] | null;
  duplicatedProjectList?: projectType[] | null;
  singleProject?: weakProjectType;
  isLoading?: boolean;
};
