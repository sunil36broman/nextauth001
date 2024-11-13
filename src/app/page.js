
import FaceDetection from "@/components/FaceDetection";
import LoginForm from "@/components/LoginForm";
import MultiStepForm from "@/components/MultiStepForm";


export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center m-4">
      <h1 className="text-3xl my-3">Hey, time to Sign In</h1>
      <MultiStepForm/>
      <LoginForm />
      <FaceDetection />
    </div>
  );
}
