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
import { Link } from 'react-router-dom';

const schema = z.object({
  email: z.string().email({ message: 'Email inválido' }),
  password: z.string().min(6, { message: 'La contraseña debe tener al menos 6 caracteres' }),
});

type LoginFormValues = z.infer<typeof schema>;

const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormValues>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: LoginFormValues) => {
    try {
      await login(data.email, data.password);
      // redirigir al usuario o mostrar un mensaje de éxito
    } catch (error) {
      // manejar error
    }
  };

  return (
        <div className="flex h-[720px] rounded-lg shadow-md m-16">
          <div className="w-1/2 flex flex-col gap-4 bg-blue-600 h- justify-between rounded-l-lg text-white">
            <header className='flex gap-2 text-start p-4'>
                <Avatar>
                    <AvatarImage src="/src/assets/WISDOMIA-ACTUALIZADO.png"/>
                    <AvatarFallback>Wisdomia</AvatarFallback>
                </Avatar>
                <h1 className="text-2xl font-bold text-center self-center">Wisdomia</h1>

            </header>
            <div className='justify-self-end'>
                <blockquote className="italic text-xl mb-4">“Gracias por ayudarnos a mejorar la educacion en el Peru!”</blockquote>
                {/* <p className="mt-4">- Team</p> */}
            </div>
            
          </div>
          <div className="w-1/2 flex flex-col justify-center items-center">
            <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md p-8 space-y-4 bg-white ">
              <h2 className="text-2xl font-bold text-center">Iniciar Sesión</h2>
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
              <Button type="submit" className="p-2 w-full">Iniciar Sesión</Button>
            </form>
            <small>¿No tienes cuenta? <Link to="/register" className='text-blue-500 hover:border-b border-b-blue-500'>Regístrate ahora</Link></small>  
          </div>
        </div>
      );
    };

export default LoginPage;
