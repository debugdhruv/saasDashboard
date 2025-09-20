import Sidebar from "@/components/Sidebar";

export default function HomePage() {
  return (
    <div>
      <Sidebar />
      <main className="ml-64 p-6"> 
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <p>Content goes here...</p>
      </main>
    </div>
  );
}