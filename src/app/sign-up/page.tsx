import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 dark:bg-slate-950">
      <SignUp 
        appearance={{
          elements: {
            formButtonPrimary: "bg-indigo-600 hover:bg-indigo-700 text-sm normal-case",
            card: "shadow-2xl border border-slate-200 dark:border-slate-800 rounded-2xl"
          }
        }}
      />
    </div>
  );
}
