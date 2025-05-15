import { useState, useCallback } from 'react';

interface FormState<T> {
  values: T;
  errors: Partial<Record<keyof T, string>>;
  touched: Partial<Record<keyof T, boolean>>;
  isSubmitting: boolean;
  isValid: boolean;
}

type Validator<T> = (values: T) => Partial<Record<keyof T, string>>;

interface UseFormOptions<T> {
  initialValues: T;
  validators?: Validator<T>[];
  onSubmit?: (values: T) => void | Promise<void>;
}

/**
 * Hook personalizat pentru gestionarea formularelor
 * @param options Opțiuni pentru formular (valori inițiale, validatori, handler submit)
 */
export const useForm = <T extends Record<string, unknown>>(options: UseFormOptions<T>) => {
  const { initialValues, validators = [], onSubmit } = options;

  const [formState, setFormState] = useState<FormState<T>>({
    values: initialValues,
    errors: {},
    touched: {},
    isSubmitting: false,
    isValid: true,
  });

  /**
   * Validează valorile formularului folosind validatorii furnizați
   */
  const validate = useCallback(
    (values: T) => {
      const errors: Partial<Record<keyof T, string>> = {};

      validators.forEach(validator => {
        const validationErrors = validator(values);
        Object.assign(errors, validationErrors);
      });

      const isValid = Object.keys(errors).length === 0;
      return { errors, isValid };
    },
    [validators],
  );

  /**
   * Actualizează o valoare în formular
   */
  const handleChange = useCallback(
    (name: keyof T, value: unknown) => {
      const newValues = { ...formState.values, [name]: value };
      const { errors, isValid } = validate(newValues);

      setFormState(prev => ({
        ...prev,
        values: newValues,
        errors,
        isValid,
        touched: { ...prev.touched, [name]: true },
      }));
    },
    [formState.values, validate],
  );

  /**
   * Marchează un câmp ca atins (pentru validare)
   */
  const handleBlur = useCallback((name: keyof T) => {
    setFormState(prev => ({
      ...prev,
      touched: { ...prev.touched, [name]: true },
    }));
  }, []);

  /**
   * Procesează trimiterea formularului
   */
  const handleSubmit = useCallback(
    async (e?: React.FormEvent) => {
      if (e) {
        e.preventDefault();
      }

      const { errors, isValid } = validate(formState.values);

      // Marchează toate câmpurile ca atinse
      const touched = Object.keys(formState.values).reduce(
        (acc, key) => ({ ...acc, [key]: true }),
        {} as Partial<Record<keyof T, boolean>>,
      );

      setFormState(prev => ({
        ...prev,
        errors,
        isValid,
        touched,
        isSubmitting: true,
      }));

      if (isValid && onSubmit) {
        try {
          await onSubmit(formState.values);
        } finally {
          setFormState(prev => ({
            ...prev,
            isSubmitting: false,
          }));
        }
      } else {
        setFormState(prev => ({
          ...prev,
          isSubmitting: false,
        }));
      }
    },
    [formState.values, validate, onSubmit],
  );

  /**
   * Resetează formularul la valorile inițiale
   */
  const resetForm = useCallback(() => {
    setFormState({
      values: initialValues,
      errors: {},
      touched: {},
      isSubmitting: false,
      isValid: true,
    });
  }, [initialValues]);

  return {
    values: formState.values,
    errors: formState.errors,
    touched: formState.touched,
    isSubmitting: formState.isSubmitting,
    isValid: formState.isValid,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm,
    setValues: (values: Partial<T>) =>
      setFormState(prev => ({
        ...prev,
        values: { ...prev.values, ...values },
      })),
  };
};

export default useForm;
