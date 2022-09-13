import { Chamado } from './../chamado/Chamado';
export interface PendenciaStatus
{
  id: any;
  descricao: string;
  chamadoId: Chamado
}
