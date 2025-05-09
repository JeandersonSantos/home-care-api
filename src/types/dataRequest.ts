export interface DataRequest {
  date: string;
  name: string;
  phone: string;
  cep: string;
  street: string;
  number: number;
  complement?: string; 
  neighborhood: string;
  city: string;
  state: string;
}