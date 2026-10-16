import { DoorOpen, FlaskConical, Laptop, Layers, type LucideIcon } from "lucide-react"
import type { Formato, TipoSala } from "@/lib/constants"

export const salaIcon = (tipo: TipoSala): LucideIcon =>
  tipo === "laboratorio" ? FlaskConical : tipo === "online" ? Laptop : DoorOpen

export const formatoIcon = (f: Formato): LucideIcon =>
  f === "Presencial" ? DoorOpen : f === "Híbrida" ? Layers : Laptop
