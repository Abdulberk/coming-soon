"use client"
import Image from 'next/image'
import { useEffect, useState } from 'react'

interface CountdownState {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
}

interface TimeUnitProps {
  value: string;
  label: string;
}

interface SubscribeResponse {
  message?: string;
  error?: string;
}

export default function Home() {
  const [countdown, setCountdown] = useState<CountdownState>({
    days: '00',
    hours: '00',
    minutes: '00',
    seconds: '00'
  })

  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({
    type: null,
    message: ''
  });

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const calculateTime = () => {
      const dest = new Date()
      dest.setDate(dest.getDate() + 7)
      dest.setHours(23, 59, 59, 999)
      
      const now = new Date().getTime()
      const diff = dest.getTime() - now

      if (diff <= 0) {
        setCountdown({ days: '00', hours: '00', minutes: '00', seconds: '00' })
        return
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24))
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((diff % (1000 * 60)) / 1000)

      setCountdown({
        days: days < 10 ? `0${days}` : days.toString(),
        hours: hours < 10 ? `0${hours}` : hours.toString(),
        minutes: minutes < 10 ? `0${minutes}` : minutes.toString(),
        seconds: seconds < 10 ? `0${seconds}` : seconds.toString()
      })
    }

    calculateTime()
    const timer = setInterval(calculateTime, 1000)
    return () => clearInterval(timer)
  }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setSubmitStatus({ type: null, message: '' });

    const form = e.currentTarget;
    const emailInput = form.elements.namedItem('email') as HTMLInputElement;

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: emailInput.value }),
      });

      const data: SubscribeResponse = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Subscription failed');
      }

      setSubmitStatus({
        type: 'success',
        message: 'Thank you for subscribing! Please check your email.'
      });
      form.reset();
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: error instanceof Error ? error.message : 'Something went wrong'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="relative overflow-hidden">
        {/* Desktop Logo */}
        <div className="hidden lg:block absolute w-full top-0 z-10 bg-white/80 backdrop-blur-sm">
          <div className="mx-auto max-w-6xl px-4 py-4">
            <Image 
              src="/SingleLineLogo.png" 
              alt="esimtime logo" 
              className="h-10 w-auto"
              width={160} 
              height={40} 
              priority
            />
          </div>
        </div>

        <div className="bg-white pt-10 pb-14 sm:pt-16 lg:overflow-hidden lg:pt-24 lg:pb-24">
          <div className="mx-auto max-w-6xl lg:px-8">
            {/* Mobile Logo */}
            <div className="lg:hidden flex justify-center mb-8">
              <Image 
                src="/SingleLineLogo.png" 
                alt="esimtime logo" 
                className="h-12 w-auto"
                width={200} 
                height={48} 
                priority
              />
            </div>

            <div className="lg:grid lg:grid-cols-2 lg:gap-8">
              <div className="mx-auto max-w-md px-4 text-center sm:max-w-2xl sm:px-6 lg:flex lg:items-center lg:px-0 lg:text-left">
                <div className="lg:py-24">
                  <h1 className="mt-4 text-4xl font-bold tracking-tight text-black sm:mt-5 sm:text-6xl lg:mt-6 xl:text-6xl">
                    <span className="block text-blue-600">Coming Soon</span>
                  </h1>
                  <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                    The future of eSIM technology is coming. Join the waitlist to be among the first to experience seamless global connectivity.
                  </p>

                  {/* Countdown Timer */}
                  <div className="mt-8 flex justify-center lg:justify-start space-x-4">
                    <TimeUnit value={countdown.days} label="DAYS" />
                    <Separator />
                    <TimeUnit value={countdown.hours} label="HRS" />
                    <Separator />
                    <TimeUnit value={countdown.minutes} label="MINS" />
                    <Separator />
                    <TimeUnit value={countdown.seconds} label="SECS" />
                  </div>

                  <div className="mt-10 sm:mt-12">
                    <form className="sm:mx-auto sm:max-w-xl lg:mx-0" onSubmit={handleSubmit}>
                      <div className="sm:flex">
                        <div className="min-w-0 flex-1">
                          <label htmlFor="email" className="sr-only">Email address</label>
                          <input 
                            type="email"
                            name="email" 
                            className="block w-full rounded-md border-0 bg-gray-100 px-4 py-3 text-base text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your email address..." 
                            required
                            disabled={isLoading}
                          />
                        </div>
                        <div className="mt-3 sm:mt-0 sm:ml-3">
                          <button 
                            type="submit" 
                            className="block w-full rounded-md bg-blue-600 py-3 px-4 font-medium text-white shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                            disabled={isLoading}
                          >
                            {isLoading ? (
                              <span className="inline-block animate-spin mr-2">⏳</span>
                            ) : null}
                            <span>
                              {isLoading ? 'Subscribing...' : 'Join Waitlist'}
                            </span>
                          </button>
                        </div>
                      </div>
                      {submitStatus.message && (
                        <p className={`mt-2 text-sm ${
                          submitStatus.type === 'success' ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {submitStatus.message}
                        </p>
                      )}
                    </form>
                  </div>
                </div>
              </div>

              {/* Right Side Image */}
              <div className="mt-12 hidden lg:block relative">
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-100 to-purple-100 rounded-3xl transform rotate-3"></div>
                <Image
                  className="relative rounded-3xl shadow-2xl transform -rotate-3 transition-transform hover:rotate-0 duration-300"
                  src="/esim.png"
                  alt="ESIMtime App"
                  width={600}
                  height={600}
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t">
        <div className="mx-auto max-w-7xl overflow-hidden py-12 px-4 sm:px-6 lg:px-8">
          <nav className="-mx-5 -my-2 flex flex-wrap justify-center" aria-label="Footer">
            <div className="px-5 py-2">
              <a href="#" className="text-base text-gray-500 hover:text-gray-900">About</a>
            </div>
            <div className="px-5 py-2">
              <a href="#" className="text-base text-gray-500 hover:text-gray-900">Privacy</a>
            </div>
            <div className="px-5 py-2">
              <a href="#" className="text-base text-gray-500 hover:text-gray-900">Terms</a>
            </div>
          </nav>
          
          <p className="mt-8 text-center text-base text-gray-400">
            © 2024 ESIMtime. All rights reserved.
            <br />
            <a href="mailto:info@esimtime.com" className="text-blue-600 hover:text-blue-500">
              info@esimtime.com
            </a>
          </p>
        </div>
      </footer>
    </>
  )
}

const TimeUnit: React.FC<TimeUnitProps> = ({ value, label }) => (
  <div className="timer flex flex-col gap-1 bg-blue-50 p-4 rounded-lg shadow-sm min-w-[80px]">
    <div>
      <h3 className="text-center text-blue-600 text-3xl font-bold">{value}</h3>
    </div>
    <p className="text-center text-gray-500 text-xs font-medium">{label}</p>
  </div>
)

const Separator: React.FC = () => (
  <h3 className="text-blue-600 text-3xl font-medium self-start mt-4">:</h3>
)