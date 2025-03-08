import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-primary text-primary-foreground p-2 rounded-md">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6"
              >
                <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold">SafeSpot</h1>
          </div>
          <Link href="/login">
            <Button>Login</Button>
          </Link>
        </div>
      </header>

      <main className="flex-1">
        <section className="py-20 bg-gradient-to-r from-secondary to-background">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">SAFESPOT</h1>
            <p className="text-2xl md:text-3xl font-semibold mb-8">TURNING EVERY SPOT INTO A SAFE SPOT</p>
            <div className="max-w-3xl mx-auto bg-card rounded-lg shadow-lg p-8 mb-12">
              <h2 className="text-2xl font-bold mb-4">MAIN PURPOSE:</h2>
              <p className="text-lg mb-4">PROTECT THE FUTURE OF OUR NATION</p>
              <p className="text-lg">REDUCE THE LEVEL OF ILLEGAL DRUG ABUSE IN OUR SOCIETY</p>
            </div>
            <Link href="/login">
              <Button size="lg" className="text-lg px-8 py-6">
                Join the Movement
              </Button>
            </Link>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-card rounded-lg shadow-md p-6 flex flex-col items-center text-center">
                <div className="bg-primary/10 p-4 rounded-full mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-8 w-8 text-primary"
                  >
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Anonymous Reporting System</h3>
                <p>Report drug abuse cases securely and anonymously without fear of retribution.</p>
              </div>

              <div className="bg-card rounded-lg shadow-md p-6 flex flex-col items-center text-center">
                <div className="bg-primary/10 p-4 rounded-full mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-8 w-8 text-primary"
                  >
                    <path d="M12 22v-5" />
                    <path d="M9 8V2" />
                    <path d="M15 8V2" />
                    <path d="M9 12v-1" />
                    <path d="M15 12v-1" />
                    <path d="M12 2v5" />
                    <path d="m19 5-3 3" />
                    <path d="m5 5 3 3" />
                    <path d="M19 14a6 6 0 0 1-6 6h0a6 6 0 0 1-6-6v-3h12z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Gamification for Valid Reports</h3>
                <p>Earn cryptocurrency rewards for submitting valid reports that help authorities combat drug abuse.</p>
              </div>

              <div className="bg-card rounded-lg shadow-md p-6 flex flex-col items-center text-center">
                <div className="bg-primary/10 p-4 rounded-full mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-8 w-8 text-primary"
                  >
                    <path d="M9 2h6" />
                    <rect width="18" height="12" x="3" y="10" rx="2" />
                    <path d="M8 16h8" />
                    <path d="M12 16v-2" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Smart Verification System</h3>
                <p>
                  AI-powered credibility scoring ensures only valid reports receive rewards while blacklisting
                  fraudulent users.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-muted py-6">
        <div className="container mx-auto px-4 text-center">
          <p>© {new Date().getFullYear()} SafeSpot. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

