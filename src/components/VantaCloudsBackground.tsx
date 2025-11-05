import { useEffect, useRef } from 'react';

export const VantaCloudsBackground = () => {
  const vantaRef = useRef<HTMLDivElement>(null);
  const vantaEffect = useRef<any>(null);

  useEffect(() => {
    if (!vantaRef.current) return;

    const loadVanta = async () => {
      // Load Three.js
      if (!(window as any).THREE) {
        const threeScript = document.createElement('script');
        threeScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js';
        threeScript.async = true;
        document.head.appendChild(threeScript);
        
        await new Promise((resolve) => {
          threeScript.onload = resolve;
        });
      }

      // Load Vanta Clouds
      if (!(window as any).VANTA?.CLOUDS) {
        const vantaScript = document.createElement('script');
        vantaScript.src = 'https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.clouds.min.js';
        vantaScript.async = true;
        document.head.appendChild(vantaScript);
        
        await new Promise((resolve) => {
          vantaScript.onload = resolve;
        });
      }

      // Initialize Vanta effect
      if (vantaRef.current && (window as any).VANTA?.CLOUDS) {
        vantaEffect.current = (window as any).VANTA.CLOUDS({
          el: vantaRef.current,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.00,
          minWidth: 200.00,
          skyColor: 0xf5f5f5,
          cloudColor: 0xe8e8e8,
          cloudShadowColor: 0xd0d0d0,
          sunColor: 0xff6f00,
          sunGlareColor: 0xff8c00,
          sunlightColor: 0xffa500,
          speed: 0.5
        });
      }
    };

    loadVanta();

    return () => {
      if (vantaEffect.current) {
        vantaEffect.current.destroy();
      }
    };
  }, []);

  return <div ref={vantaRef} className="absolute inset-0 opacity-30" />;
};
