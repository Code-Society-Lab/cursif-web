export default function WarningBanner({ if: condition, children }: { if: boolean, children: React.ReactNode }) {
  if (condition)
    return (
      <div className="flex justify-center w-full bg-yellow-400 p-3 print:hidden">
        <p className="text-sm text-gray-800 text-center">
          {children}
        </p>
      </div>
    );

  return null;
}
