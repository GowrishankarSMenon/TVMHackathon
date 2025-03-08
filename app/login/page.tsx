"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function LoginPage() {
  const [isConnecting, setIsConnecting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  async function handleLogin() {
    setIsConnecting(true)
    setError(null)

    try {
      // Check if MetaMask is installed
      if (typeof window.ethereum === "undefined") {
        throw new Error("MetaMask is not installed. Please install MetaMask to continue.")
      }

      // Request account access
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" })

      if (accounts.length === 0) {
        throw new Error("No accounts found. Please unlock your MetaMask and try again.")
      }

      // Successfully connected
      console.log("Connected with account:", accounts[0])

      // Redirect to role selection
      router.push("/role-select")
    } catch (err) {
      console.error("Login error:", err)
      setError(err instanceof Error ? err.message : "Failed to connect to MetaMask. Please try again.")
    } finally {
      setIsConnecting(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-muted/30">
      <header className="border-b bg-background">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
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
          </Link>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-4">
        <Card className="max-w-md w-full">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Login to SafeSpot</CardTitle>
            <CardDescription>Connect with MetaMask to access the platform</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4">
              <Button
                onClick={handleLogin}
                className="w-full flex items-center justify-center gap-2"
                disabled={isConnecting}
              >
                {isConnecting ? (
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                ) : (
                  <svg width="24" height="24" viewBox="0 0 212 189" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M61.4385 0.952148L105.34 59.7402L88.0856 30.8562L61.4385 0.952148Z" fill="#E17726" />
                    <path d="M150.381 0.952148L106.211 60.0121L123.734 30.8562L150.381 0.952148Z" fill="#E27625" />
                    <path
                      d="M41.1541 136.391L53.6791 166.019L20.0151 177.471L23.1849 147.839L41.1541 136.391Z"
                      fill="#E27625"
                    />
                    <path
                      d="M170.655 136.391L188.624 147.839L191.795 177.471L158.131 166.019L170.655 136.391Z"
                      fill="#E27625"
                    />
                    <path
                      d="M67.5957 83.1306L86.5479 100.022L53.3064 114.388L55.9966 79.6096L67.5957 83.1306Z"
                      fill="#E27625"
                    />
                    <path
                      d="M144.213 83.1306L155.813 79.6096L158.503 114.388L125.261 100.022L144.213 83.1306Z"
                      fill="#E27625"
                    />
                    <path d="M158.131 166.019L125.53 152.197L135.438 137.831L158.131 166.019Z" fill="#E27625" />
                    <path d="M53.6791 166.019L76.3726 137.831L86.2789 152.197L53.6791 166.019Z" fill="#E27625" />
                    <path d="M101.897 123.464L125.53 152.197L86.2789 152.197L101.897 123.464Z" fill="#D5BFB2" />
                    <path d="M139.569 0.952148L150.381 0.952148L150.381 29.768L139.569 0.952148Z" fill="#233447" />
                    <path d="M72.2502 0.952148L61.4385 0.952148L61.4385 29.768L72.2502 0.952148Z" fill="#233447" />
                    <path d="M144.213 83.1306L125.261 100.022L128.73 69.3108L144.213 83.1306Z" fill="#CC6228" />
                    <path d="M67.5957 83.1306L83.0787 69.3108L86.5479 100.022L67.5957 83.1306Z" fill="#CC6228" />
                    <path
                      d="M83.8525 41.4834L86.5479 69.3108L67.5957 83.1306L58.6276 65.4277L54.1225 49.3334L83.8525 41.4834Z"
                      fill="#CC6228"
                    />
                    <path
                      d="M127.957 41.4834L156.898 49.3334L152.393 65.4277L143.425 83.1306L125.261 100.022L127.957 69.3108L127.957 41.4834Z"
                      fill="#CC6228"
                    />
                    <path d="M158.503 114.388L125.261 100.022L128.73 69.3108L158.503 114.388Z" fill="#E27525" />
                    <path d="M53.3064 114.388L83.0787 69.3108L86.5479 100.022L53.3064 114.388Z" fill="#E27525" />
                    <path
                      d="M127.957 41.4834L125.261 100.022L86.5479 100.022L83.8525 41.4834L127.957 41.4834Z"
                      fill="#F5841F"
                    />
                    <path d="M158.503 114.388L158.503 147.839L125.261 147.839L158.503 114.388Z" fill="#763E1A" />
                    <path d="M53.3064 114.388L86.5479 147.839L53.3064 147.839L53.3064 114.388Z" fill="#763E1A" />
                  </svg>
                )}
                {isConnecting ? "Connecting..." : "Connect with MetaMask"}
              </Button>

              {error && (
                <div className="p-3 bg-destructive/10 border border-destructive rounded-md text-destructive text-sm">
                  {error}
                </div>
              )}

              <div className="text-sm text-muted-foreground text-center mt-2">
                <p>Don&apos;t have MetaMask?</p>
                <a
                  href="https://metamask.io/download/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary underline"
                >
                  Download MetaMask
                </a>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

