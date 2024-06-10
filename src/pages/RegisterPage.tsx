import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth } from '../context/AuthContext';

const schema = z.object({
  email: z.string().email({ message: 'Email inválido' }),
  password: z.string().min(6, { message: 'La contraseña debe tener al menos 6 caracteres' }),
  confirmPassword: z.string().min(6, { message: 'La contraseña debe tener al menos 6 caracteres' }),
}).refine(data => data.password === data.confirmPassword, {
  message: "Las contraseñas no coinciden",
  path: ["confirmPassword"],
});

type RegisterFormValues = z.infer<typeof schema>;

const RegisterPage: React.FC = () => {
  const { register: authRegister } = useAuth();
  const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormValues>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: RegisterFormValues) => {
    try {
      await authRegister(data.email, data.password);
      // redirigir al usuario o mostrar un mensaje de éxito
    } catch (error) {
      // manejar error
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md p-8 space-y-4 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-bold text-center">Registrate</h2>
        <div>
          <label>Email</label>
          <input {...register('email')} type="email" className="border p-2 w-full" />
          {errors.email && <p className="text-red-500">{errors.email.message}</p>}
        </div>
        <div>
          <label>Contraseña</label>
          <input {...register('password')} type="password" className="border p-2 w-full" />
          {errors.password && <p className="text-red-500">{errors.password.message}</p>}
        </div>
        <div>
          <label>Confirmar Contraseña</label>
          <input {...register('confirmPassword')} type="password" className="border p-2 w-full" />
          {errors.confirmPassword && <p className="text-red-500">{errors.confirmPassword.message}</p>}
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2 w-full">Registrar</button>
      </form>
    </div>
  );
};

export default RegisterPage;
