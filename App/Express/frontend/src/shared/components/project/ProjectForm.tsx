import { useEffect, useMemo } from "react"
import { useForm } from "react-hook-form"
import type { SubmitHandler } from "react-hook-form"
import { Field, Input, Button, Stack, NativeSelect , Textarea } from "@chakra-ui/react"
import type { Project } from "../../../models/project"

export type FormValues = Pick<Project, 'nombre' | 'descripcion' | 'estado' | 'fecha_inicio' | 'fecha_fin'>

type ProjectFormProps = {
    defaultValues?: Partial<FormValues>;
    formId?: string;
    onSubmit: SubmitHandler<FormValues>;
};

function normalizeDateInput(value?: string) {
    if (!value) return "";
    // Si viene en ISO (YYYY-MM-DDTHH:mm:ssZ), recortar a YYYY-MM-DD
    const isoDate = value.split("T")[0];
    // Si ya es YYYY-MM-DD, devolver tal cual
    return isoDate;
}



function ProjectForm({ defaultValues, formId, onSubmit }: ProjectFormProps) {
    const computedDefaults: FormValues = useMemo(() => ({
        nombre: defaultValues?.nombre ?? "",
        descripcion: defaultValues?.descripcion ?? "",
        estado: defaultValues?.estado ?? "definido",
        fecha_inicio: normalizeDateInput(defaultValues?.fecha_inicio),
        fecha_fin: normalizeDateInput(defaultValues?.fecha_fin),
    }), [defaultValues]);

    const { register, handleSubmit, formState: { errors }, reset, watch } = useForm<FormValues>({
        defaultValues: computedDefaults,
    });

    const fechaInicio = watch("fecha_inicio");
    const fechaFin = watch("fecha_fin");

    useEffect(() => {
        // Si cambian los valores iniciales (por ejemplo en actualizar), reseteamos el formulario
        reset(computedDefaults);
    }, [computedDefaults, reset]);

    return (
        <form id={formId} onSubmit={handleSubmit(onSubmit)}>
            <Stack gap="4" align="flex-start" maxW="100%">
                <Field.Root invalid={!!errors.nombre}>
                    <Field.Label>Nombre</Field.Label>
                    <Input {...register("nombre" , { required: "el nombre es requerido" })} />
                    <Field.ErrorText>{errors.nombre?.message}</Field.ErrorText>
                </Field.Root>

                <Field.Root invalid={!!errors.descripcion}>
                    <Field.Label>Descripción</Field.Label>
                    <Textarea
                        placeholder="Describe el proyecto"
                        {...register("descripcion", { required: "la descripción es requerida" })}
                    />
                    <Field.ErrorText>{errors.descripcion?.message}</Field.ErrorText>
                </Field.Root>

                <Field.Root>
                    <Field.Label>Estado</Field.Label>
                    <NativeSelect.Root>
                        <NativeSelect.Field {...register("estado", { required: true })}>
                            <option value="definido">Definido</option>
                            <option value="en proceso">En proceso</option>
                            <option value="finalizado">Finalizado</option>
                            <option value="bloqueo">Bloqueo</option>
                        </NativeSelect.Field>
                        <NativeSelect.Indicator />
                    </NativeSelect.Root>
                </Field.Root>

                <Field.Root invalid={!!errors.fecha_inicio}>
                    <Field.Label>Fecha inicio</Field.Label>
                    <Input 
                        type="date" 
                        {...register("fecha_inicio", { 
                            required: "la fecha de inicio es requerida",
                            validate: (value) => {
                                if (!fechaFin) return true;
                                return value <= fechaFin || "La fecha de inicio debe ser anterior o igual a la fecha de fin";
                            }
                        })} 
                    />
                    <Field.ErrorText>{errors.fecha_inicio?.message}</Field.ErrorText>
                </Field.Root>

                <Field.Root invalid={!!errors.fecha_fin}>
                    <Field.Label>Fecha fin</Field.Label>
                    <Input 
                        type="date" 
                        {...register("fecha_fin", { 
                            required: "la fecha de fin es requerida",
                            validate: (value) => {
                                if (!fechaInicio) return true;
                                return value >= fechaInicio || "La fecha de fin debe ser posterior o igual a la fecha de inicio";
                            }
                        })} 
                    />
                    <Field.ErrorText>{errors.fecha_fin?.message}</Field.ErrorText>
                </Field.Root>

                <Button type="submit" w={'100%'}>Guardar</Button>
            </Stack>
        </form>
    )
}

export default ProjectForm