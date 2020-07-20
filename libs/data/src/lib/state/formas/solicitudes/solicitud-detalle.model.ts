export interface SolicitudDetalle {
  submitDate: string;
  createDate: string;
  approveDate: string;
  approveTime: string;
  createTime: string;
  submitTime: string;
  config: {
    idwf: number;
    status: string;
    step: number;
    object: string;
    tpoSol: string;
    document: string;
    variant: {
      description: string;
      id: string;
    };
  };
  partition: {
    id: string;
    description: string;
  };
  preparer: {
    description: string;
    id: number;
    account: string;
  };
  comments: string;
  date: string;
  title: string;
  totalAmount: number;
  amexCard: string;
  supplier: {
    id: number;
    description: string;
    oneTime: string;
    retention: string;
  };
  currency: {
    id: string;
    description: string;
  };
  payType: {
    id: string;
    description: string;
  };
  supplierOT: {
    name: string;
    city: string;
  };
  office: {
    id: number;
    description: string;
  };
  rubro: {
    id: number;
    description: string;
  };
  requester: {
    id: number;
    description: string;
    account: string;
    bankAccount: string;
    tpoUser: string;
    acreedor: number;
  };
  company: {
    id: number;
    description: string;
  };
  invoices: {
    totalInvoices: string;
  };
  comment: any;
  files: any;
  approvalFlow: [
    {
      userAccount: string;
      userName: string;
      approvalStatus: string;
      step: number;
      isRol: boolean;
      date: string;
      time: string;
    }
  ];
}
export function createSolicitudDetalle(params: Partial<SolicitudDetalle>) {
  return { ...params } as SolicitudDetalle;
}
