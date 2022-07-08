export interface Chamado
{
  id: any;
  dataAbertura : string;
  dataFechamento: string;
  status: string;
  prioridade: any;
  titulo: string;
  observacoes: string;
  cliente: any;
  nomeCliente: string;
  tecnico: any;
  nomeTecnico: string;
  itensPedidoEstoque:[]
}
