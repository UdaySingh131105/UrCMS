import AuthForm from "@/components/authForm";
export default function SignUp() {
    
    return (
        <section className="w-full h-screen flex justify-center items-center">
            <AuthForm origin={'signup'} />
        </section>
    )
}