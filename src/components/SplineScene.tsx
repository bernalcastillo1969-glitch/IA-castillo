import React, { Suspense, lazy, useState, useEffect } from 'react'
const Spline = lazy(() => import('@splinetool/react-spline'))

interface SplineSceneProps {
  scene: string
  className?: string
}

// Componente ErrorBoundary sencillo para evitar que Spline rompa la app
class SplineErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean }> {
  constructor(props: any) {
    super(props);
    this.hasError = false;
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error) {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error("Spline Crash Detenido:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="w-full h-full flex items-center justify-center bg-[#1e1e2c]/40 border border-white/5 rounded-[3rem]">
          <div className="text-center p-6">
            <p className="text-[#cbc3d7] text-sm italic">IA Core se está reiniciando...</p>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default function SplineScene({ scene, className }: SplineSceneProps) {
  return (
    <SplineErrorBoundary>
      <Suspense 
        fallback={
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-8 h-8 border-4 border-[#4cd7f6] border-t-transparent rounded-full animate-spin"></div>
          </div>
        }
      >
        <Spline
          scene={scene}
          className={className}
        />
      </Suspense>
    </SplineErrorBoundary>
  )
}
