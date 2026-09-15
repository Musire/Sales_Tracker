'use client';

import { FormStatusProvider } from "@/context/FormStatusProvider";
import { ActionResponse } from "@/domains/identity/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { startTransition, useActionState, useEffect, useRef } from "react";
import { DefaultValues, FieldValues, FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import StatusButton from "./StatusButton";


interface FormProps<T, S extends z.ZodObject<FieldValues>> {
    schema: S;
    initialValues: DefaultValues<z.infer<S>>; 
    isMulti?: boolean;
    children?: React.ReactNode;
    actionFn: (_: any, formData: FormData) => ActionResponse<T> | Promise<ActionResponse<T>>;
    onSuccess?: () => void;
}

export default function ActionForm<T, S extends z.ZodObject<FieldValues>>({ 
    schema,
    initialValues,
    isMulti, 
    actionFn,
    onSuccess,
    children 
}: FormProps<T, S>) {
    
    // 💡 FIX: Cast the initial state object to the correct ActionResponse type so useActionState behaves correctly
    const [state, formAction, pending] = useActionState(
        actionFn, 
        { 
            success: false, 
            error: undefined,
            data: undefined // Using undefined fits standard optional typing better than null
        } as ActionResponse<T>
    );

    const form = useForm<z.infer<S>>({
      resolver: zodResolver(schema) as any, 
      defaultValues: initialValues,
      mode: "onChange"
    });

    const onValidSubmit = async () => {
      const isValid = await form.trigger();
      if (!isValid) {
        console.log('Validation errors:', form.formState.errors);
        return;
      }

      const formValues = form.getValues();

      // 1. Explicitly build the FormData instance from RHF values
      const formData = new FormData();
      Object.entries(formValues).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          formData.append(key, String(value));
        }
      });

      startTransition(async () => {
        formAction(formData); 
      });
    };

    const onSuccessRef = useRef(onSuccess);

    // Keep ref in sync safely inside an effect
    useEffect(() => {
      onSuccessRef.current = onSuccess;
    }, [onSuccess]);

    useEffect(() => {
      // Check if the submission was successful
      if (state.success) {
        onSuccessRef.current?.();
        form.reset(); 
      }
    }, [state.success, form]); 

    return (
      <FormProvider {...form}>
        <FormStatusProvider state={state} pending={pending} >
          <form
            className="flex flex-col rounded-xl max-w-lg w-full p-6 stacked space-y-2"
            action={onValidSubmit}
            >
            {children}
            {state.error && <p className="text-error text-sm">{state.error}</p>}
            {!isMulti && <StatusButton isPending={pending} state={state} />}
          </form>
        </FormStatusProvider>
      </FormProvider>
    );
}
