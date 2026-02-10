
'use client'
import { CountrySelectField } from '@/components/forms/CountrySelect'
import FooterLink from '@/components/forms/FooterLink'
import InputField from '@/components/forms/InputField'
import SelectField from '@/components/forms/SelectField'
import { Button } from '@/components/ui/button'
import { signUpWithEmail } from '@/lib/actions/auth.actions'
import { INVESTMENT_GOALS, PREFERRED_INDUSTRIES, RISK_TOLERANCE_OPTIONS } from '@/lib/constants'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'






const SignUp = () => {
    const router = useRouter();

    const {
        register,
        handleSubmit,
        watch,
        control,
        formState: { errors, isSubmitting },
    } = useForm<SignUpFormData>({
        defaultValues: {
            fullName: "",
            email: "",
            password: "",
            country: "US",
            investmentGoals: "Growth",
            riskTolerance: "Medium",
            preferredIndustry: "Technology"
        },
        mode: 'onBlur'
    })
    const onSubmit = async (data: SignUpFormData) => {
        try {
            const result = await signUpWithEmail(data);
            if (result.success) {
                toast.success(result.message);
                router.push('/');
            }

        }
        catch (e) {
            console.error(e)
            toast.error("Failed to create a account")
        }
    }

    return (
        <>
            <h1 className='form-title'> Signup & Personalise</h1>
            <form className='space-y-5' onSubmit={handleSubmit(onSubmit)}>


                <InputField name="fullName"
                    label="Full Name"
                    placeholder="Enter your full name"
                    type="text"
                    register={register}
                    error={errors.fullName}
                    validation={{ required: "Full name is required", minLength: 2 }}
                />
                <InputField name="email"
                    label="Email"
                    placeholder="Enter your email"
                    type="email"
                    register={register}
                    error={errors.email}
                    validation={{ required: "Email is required", pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Invalid email format" } }}
                />
                <InputField name="password"
                    label="Password"
                    placeholder="Enter your password"
                    type="password"
                    register={register}
                    error={errors.password}
                    validation={{ required: "Password is required", minLength: { value: 8, message: "Password must be at least 8 characters long" } }}
                />
                <CountrySelectField
                    name="country"
                    label="Country"
                    control={control}
                    error={errors.country}
                    required
                />
                <SelectField name="investmentGoals"
                    label="Investment Goals"
                    placeholder="Select your investment goals"
                    control={control}
                    register={register}
                    error={errors.investmentGoals}
                    validation={{ required: "Investment goals is required" }}
                    options={INVESTMENT_GOALS}
                />
                <SelectField name="riskTolerance"
                    label="Risk Tolerance"
                    placeholder="Select your risk tolerance"
                    control={control}
                    register={register}
                    error={errors.riskTolerance}
                    validation={{ required: "Risk tolerance is required" }}
                    options={RISK_TOLERANCE_OPTIONS}
                />
                <SelectField name="preferredIndustry"
                    label="Preferred Industry"
                    placeholder="Select your preferred industry"
                    control={control}
                    register={register}
                    error={errors.preferredIndustry}
                    validation={{ required: "Preferred industry is required" }}
                    options={PREFERRED_INDUSTRIES}
                />
                <Button type="submit"
                    className='yellow-btn w-full mt-5'
                    disabled={isSubmitting} >
                    {isSubmitting ? 'Creating Account...' : 'Start your investing journey'}
                </Button>
                <FooterLink text="Already have an account?" linkText="Sign In" href="/sign-in" />
            </form>
        </>
    )
}

export default SignUp