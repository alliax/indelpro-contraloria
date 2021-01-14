export interface SolicitudDetalleIndelpro {
  HTML: string;
  PDF: ArrayBuffer;
}
export interface SolicitudDetalleCompras {
  HTML: string;
}
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
  comments: {
    user: string;
    text: string;
    date: string;
    time: string;
  };
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
  deudor?: any;
  condicionPago?: any;
  importeAsegurado?: any;
  limiteCredito?: any;
  termCredito?: any;
  pais?: any;

  tipoNota?: any;
  motivoNota?: any;
  monto?: any;
  leyendaNota?: any;

  destiny?: any;
  place?: any;
  amountDollar?: any;
  amountPesos?: any;

  condPago?: any;
  tipoCliente?: any;
  tipoMovimiento?: any;

  importe?: any;
  justificacion?: any;

  tipoProveedor?: any;
  razonSoc?: any;
  rfc?: any;
  payments?: any;
}
export function createSolicitudDetalle(params: Partial<SolicitudDetalle>) {
  return { ...params } as SolicitudDetalle;
}
