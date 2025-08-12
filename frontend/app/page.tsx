import AuthComponent from "@/components/auth/AuthComponent";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex justify-center items-center mt-60">
      <AuthComponent />
    </div>
  );
}
