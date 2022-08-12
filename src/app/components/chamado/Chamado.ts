import { Servico } from './../servico/Servico';
import { PedidoEstoque } from './../pedido/PedidoEstoque';
import { ItensEstoque } from './../itens/ItensEstoque';
export interface Chamado
{
  id: any;
  dataAbertura : string;
  dataFechamento: string;
  status: string;
  prioridade: any;
  titulo: string;
  modelo: string;
  recibo: string;
  observacoes: string;
  telefoneCliente: string;
  cliente: any;
  nomeCliente: string;
  tecnico: any;
  nomeTecnico: string;
  itensEstoque: ItensEstoque[],
  servicos: Servico[],
  adicionarIten: boolean;
}
