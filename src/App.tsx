import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

// I Added A Password Confirmation Field To The Form
// I Also Added A Refinement To Check If The Passwords Match

const inputSchema = z.object({
  email: z.string().email(),
  firstName: z.string().min(3),
  lastName: z.string().min(3),
  password: z.string().min(6, "password should contain at least 6 characters"),
  confirmPassword: z.string().min(6, "password should contain at least 6 characters")
}).refine((data) => data.password === data.confirmPassword, {
  message: "passwords do not match",
  path: ['confirmPassword']
});

type formInputs = z.infer<typeof inputSchema>;


const App  = () =>{

  const { register, reset, handleSubmit, formState: { errors }} = useForm<formInputs>({
    resolver: zodResolver(inputSchema),
    defaultValues: {
      email: '',
      firstName: '',
      lastName: '',
      password: '',
      confirmPassword: ''
    }
  });

  const onSubmit = (data: formInputs) => {
    console.log(data);
    reset();
  };
  
   return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} style={
        {
        display: 'flex', 
        flexDirection: 'column', 
        gap: '2px',
        width: '300px', 
        margin: 'auto',
        marginTop: '100px',
        height: 'auto',
        padding: '10px',
        border: '1px solid #ccc',
        borderRadius: '5px'
        }
        }>
        <input {...register("email")} style={{padding: '7px', borderRadius: '5px', border: '1px solid #ccc',}}  placeholder="Email" />
        {errors.email && <p style={{color: 'red'}} >{errors.email.message}</p>}

        <input {...register("firstName")} style={{padding: '7px',borderRadius: '5px' , border: '1px solid #ccc',}} placeholder="First Name" />
        {errors.firstName && <p style={{color: 'red'}} >{errors.firstName.message}</p>}

        <input {...register("lastName")} style={{padding: '7px',borderRadius: '5px', border: '1px solid #ccc',}} placeholder="Last Name" />
        {errors.lastName && <p style={{color: 'red'}} >{errors.lastName.message}</p>}

        <input {...register("password")} style={{padding: '7px', borderRadius: '5px', border: '1px solid #ccc',}} placeholder="Password" />
        {errors.password && <p style={{color: 'red'}} >{errors.password.message}</p>}

        <input {...register("confirmPassword")} style={{padding: '7px',borderRadius: '5px', border: '1px solid #ccc',}} placeholder="Confirm Password" />
        {errors.confirmPassword && <p style={{color: 'red'}} >{errors.confirmPassword.message}</p>}

        <button style={{padding: '7px', marginTop: '10px', marginLeft: '110px', width: '80px'}} type="submit">Submit</button>
      </form>
    </div>
  )
}

export default App;

