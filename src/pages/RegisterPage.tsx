import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth } from '@/context/AuthContext';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { AvatarFallback } from '@radix-ui/react-avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

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
    <div className="flex h-screen rounded-lg shadow-md m-16">
      <div className="w-1/2 flex flex-col justify-center items-center">
        <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md p-8 space-y-4 bg-white">
          <h2 className="text-2xl font-bold text-center">Crea tu usuario</h2>
          <div>
            <Label>Email</Label>
            <Input {...register('email')} type="email" className="border p-2 w-full" />
            {errors.email && <p className="text-red-500">{errors.email.message}</p>}
          </div>
          <div>
            <Label>Contraseña</Label>
            <Input {...register('password')} type="password" className="border p-2 w-full" />
            {errors.password && <p className="text-red-500">{errors.password.message}</p>}
          </div>
          <div>
            <Label>Confirmar Contraseña</Label>
            <Input {...register('confirmPassword')} type="password" className="border p-2 w-full" />
            {errors.confirmPassword && <p className="text-red-500">{errors.confirmPassword.message}</p>}
          </div>
          <Button type="submit" className="p-2 w-full">Registrar</Button>
        </form>
      </div>
      <div className="w-1/2 flex flex-col gap-4 bg-blue-600 justify-between rounded-r-lg text-white">
        <header className='flex gap-2 p-4 self-end'>
            <Avatar>
                <AvatarImage src="/src/assets/WISDOMIA-ACTUALIZADO.png"/>
                <AvatarFallback>Wisdomia</AvatarFallback>
            </Avatar>
            <h1 className="text-2xl font-bold text-center self-center">Wisdomia</h1>
        </header>
        <div className='justify-self-end'>
            <blockquote className="italic text-xl mb-4">“Gracias por ayudarnos a mejorar la educación en el Perú!”</blockquote>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
