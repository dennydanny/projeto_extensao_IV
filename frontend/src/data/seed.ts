import type { Dia, Formato } from "@/lib/constants"
import type { Professor, Sala, Turma } from "@/lib/types"

export const SEED_SALAS: Sala[] = [
  { id: "s1", nome: "Sala 03", tipo: "sala", predio: "Central", andar: "1º Piso", capacidade: 45 },
  { id: "s2", nome: "Sala 13", tipo: "sala", predio: "Central", andar: "1º Piso", capacidade: 45 },
  { id: "s3", nome: "Nova York", tipo: "sala", predio: "Anexo", andar: "1º Piso", capacidade: 40 },
  { id: "s4", nome: "LAB 01", tipo: "laboratorio", predio: "Central", andar: "Térreo", capacidade: 50 },
  { id: "s5", nome: "Sala 31", tipo: "sala", predio: "Anexo 02", andar: "Térreo", capacidade: 35 },
  { id: "s6", nome: "LAB 02", tipo: "laboratorio", predio: "Central", andar: "Térreo", capacidade: 50 },
  { id: "s7", nome: "Sala 08", tipo: "sala", predio: "Central", andar: "1º Piso", capacidade: 40 },
  { id: "s8", nome: "LAB 04", tipo: "laboratorio", predio: "Anexo", andar: "Térreo", capacidade: 40 },
  { id: "s9", nome: "Sala 20", tipo: "sala", predio: "Central", andar: "1º Piso", capacidade: 40 },
  { id: "s10", nome: "Washington", tipo: "sala", predio: "Anexo", andar: "2º Piso", capacidade: 35 },
  { id: "s11", nome: "LAB 05", tipo: "laboratorio", predio: "Central", andar: "Térreo", capacidade: 40 },
  { id: "s12", nome: "AVA — Ambiente Virtual", tipo: "online", predio: "Virtual", andar: "—", capacidade: 0 },
]

const prof = (id: string, nome: string, email: string, disciplinas: string[]): Professor => ({
  id,
  nome,
  email: `${email}@unisapiens.edu.br`,
  disciplinas,
})

export const SEED_PROFESSORES: Professor[] = [
  prof("p1", "Cláudio Roberto", "claudio.roberto", ["Materiais de Construção", "Hidráulica", "Física Geral e Experimental I"]),
  prof("p2", "Valney Passos", "valney.passos", ["Cálculo I", "Matemática Computacional"]),
  prof("p3", "Georgeano Dantas Maciel", "georgeano.maciel", ["Geometria Analítica e Álgebra Linear", "Fenômenos de Transporte"]),
  prof("p4", "Rosangela Cunha", "rosangela.cunha", ["Algoritmos e Estrutura de Dados II"]),
  prof("p5", "Messias Pimentel Cantanhede", "messias.cantanhede", ["Introdução à Eletrônica", "Eletrônica Digital"]),
  prof("p6", "Ives Lima Batista", "ives.batista", ["Algoritmos e Estrutura de Dados II", "Algoritmos e Estruturas de Dados I"]),
  prof("p7", "Carlos Jesus", "carlos.jesus", ["Probabilidade e Estatística"]),
  prof("p8", "Moisés Santos", "moises.santos", ["Programação Orientada a Objetos"]),
  prof("p9", "Pedro Gomes (PG)", "pedro.gomes", ["Banco de Dados II", "Introdução à Informática"]),
  prof("p10", "Paulo Alexandre Fonseca (Bacalhau)", "paulo.fonseca", ["Governança em TI"]),
  prof("p11", "Rebson Yuko", "rebson.yuko", ["Segurança e Auditoria de Sistemas", "Sistemas Operacionais"]),
  prof("p12", "Márcio Bueno", "marcio.bueno", ["Algoritmos e Estrutura de Dados I (Python)", "Inteligência Artificial"]),
  prof("p13", "Allan K. Gurgel do Amaral", "allan.amaral", ["Projeto de Extensão", "Direito, Legislação e Ética"]),
  prof("p14", "Benito Silva Franco", "benito.franco", ["Cálculo II"]),
  prof("p15", "Leonardo Micheletti", "leonardo.micheletti", ["Fundamentos da Engenharia e Arquitetura"]),
  prof("p16", "Ana Beatriz Lima", "ana.lima", ["Português e Redação"]),
]

const t = (
  id: string,
  curso: string,
  periodo: string,
  disciplina: string,
  professorId: string,
  salaId: string,
  dia: Dia,
  inicio: string | null,
  fim: string | null,
  formato: Formato = "Presencial",
): Turma => ({ id, curso, periodo, disciplina, professorId, salaId, dia, inicio, fim, formato })

export const SEED_TURMAS: Turma[] = [
  // Quinta-feira — espelha o horário enviado pelo coordenador
  t("t1", "Eng. Civil", "4º", "Materiais de Construção", "p1", "s1", "Quinta-feira", "19:00", "21:45"),
  t("t2", "Eng. Computação / Eng. Elétrica", "1º", "Cálculo I", "p2", "s2", "Quinta-feira", "19:00", "21:45"),
  t("t3", "Eng. Computação", "2º", "Geometria Analítica e Álgebra Linear", "p3", "s3", "Quinta-feira", "19:00", "21:45"),
  t("t4", "Eng. Computação", "4º", "Algoritmos e Estrutura de Dados II", "p4", "s4", "Quinta-feira", "19:00", "21:45"),
  t("t5", "Eng. Computação", "6º", "Introdução à Eletrônica", "p5", "s5", "Quinta-feira", "19:00", "21:45"),
  t("t6", "Eng. Software", "2º B", "Algoritmos e Estrutura de Dados II", "p6", "s12", "Quinta-feira", null, null, "Assíncrona"),
  t("t7", "Sist. de Informação", "2º B", "Probabilidade e Estatística", "p7", "s7", "Quinta-feira", "19:00", "21:45"),
  t("t8", "Sist. de Informação", "4º A", "Programação Orientada a Objetos", "p8", "s8", "Quinta-feira", "19:00", "21:45"),
  t("t9", "Sist. de Informação", "5º", "Banco de Dados II", "p9", "s6", "Quinta-feira", "19:00", "21:45"),
  t("t10", "Sist. de Informação", "6º", "Governança em TI", "p10", "s9", "Quinta-feira", "19:00", "21:45"),
  t("t11", "Sist. de Informação", "7º", "Segurança e Auditoria de Sistemas", "p11", "s10", "Quinta-feira", "19:00", "21:45"),
  // Segunda-feira
  t("t12", "Eng. Computação", "1º A", "Fundamentos da Engenharia e Arquitetura", "p15", "s2", "Segunda-feira", "19:00", "21:45"),
  t("t13", "Eng. Civil", "6º", "Hidráulica", "p1", "s1", "Segunda-feira", "19:00", "21:45"),
  t("t14", "Sist. de Informação", "1º Vesp.", "Português e Redação", "p16", "s12", "Segunda-feira", "15:00", "17:45", "Assíncrona"),
  t("t15", "Eng. Computação", "6º", "Banco de Dados I", "p9", "s4", "Segunda-feira", "19:00", "21:45"),
  // Terça-feira — Sala 13 com conflito de exemplo (t16 × t17)
  t("t16", "Eng. Computação", "2º A", "Cálculo II", "p14", "s2", "Terça-feira", "19:00", "21:45"),
  t("t17", "Eng. Elétrica", "2ª", "Física Geral e Experimental I", "p1", "s2", "Terça-feira", "20:00", "21:45"),
  t("t18", "Eng. Computação", "7º", "Programação Web", "p12", "s4", "Terça-feira", "19:00", "21:45"),
  t("t19", "Eng. Software", "1º A", "Algoritmos e Estruturas de Dados I", "p6", "s11", "Terça-feira", "19:00", "21:45"),
  t("t20", "Sist. de Informação", "2º A", "Algoritmos e Estrutura de Dados II", "p4", "s9", "Terça-feira", "19:00", "21:45"),
  // Quarta-feira
  t("t21", "Eng. Computação", "8º", "Inteligência Artificial", "p12", "s11", "Quarta-feira", "19:00", "21:45"),
  t("t22", "Eng. Software", "1º A", "Matemática Computacional", "p2", "s2", "Quarta-feira", "19:00", "21:45", "Híbrida"),
  t("t23", "Sist. de Informação", "2ª", "Empreendedorismo e Inovação", "p13", "s9", "Quarta-feira", "19:00", "21:45", "Síncrona"),
  t("t24", "Eng. Computação", "6º", "Redes Avançadas", "p12", "s4", "Quarta-feira", "19:00", "21:45"),
  // Sexta-feira
  t("t25", "Eng. Computação", "8º", "Sistemas Distribuídos", "p11", "s7", "Sexta-feira", "19:00", "21:45"),
  t("t26", "Eng. Civil", "4º", "Ciências do Meio Ambiente", "p1", "s5", "Sexta-feira", "19:00", "20:15", "Síncrona"),
  t("t27", "Sist. de Informação", "6º A", "Sistemas Operacionais", "p11", "s6", "Sexta-feira", "19:00", "21:45"),
  t("t28", "Jogos Digitais", "1º", "Game Design: Regras e Mecânicas", "p8", "s12", "Sexta-feira", "19:00", "21:45", "Assíncrona"),
  // Sábado
  t("t29", "Eng. Computação", "9º", "Projeto de Extensão V — Machine Learning", "p13", "s3", "Sábado", "08:00", "09:00"),
  t("t30", "Eng. Computação", "1º A", "Desenho Técnico", "p15", "s2", "Sábado", "08:00", "10:45"),
]
