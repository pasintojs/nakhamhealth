import Link from "next/link";

export default function TestUsersPage() {
  return (
    <div className="min-h-screen bg-white p-8">
      <h1 className="text-2xl font-bold mb-4">User Management Test Page</h1>
      <p className="mb-4">This is a test page to verify routing works.</p>
      <Link href="/admin/dashboard" className="text-blue-600 hover:underline">
        ← Back to Dashboard
      </Link>
    </div>
  );
}
