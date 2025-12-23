export default function AuthLayout({ title, children }) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md bg-card rounded-2xl p-8 shadow-xl border border-gray-800">
        <h1 className="text-3xl font-bold text-center mb-2">
          Cred<span className="text-primary">Resolve</span>
        </h1>
        <p className="text-muted text-center mb-6">{title}</p>
        {children}
      </div>
    </div>
  );
}
