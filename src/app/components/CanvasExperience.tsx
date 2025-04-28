"use client";

import { useEffect, useRef } from 'react';
import { Pane } from 'tweakpane';

const ELEMENTS = ["PILL", "PARTICLES", "PLANET"] as const;

export default function CanvasExperience() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const paneRef = useRef<Pane | null>(null);
  const paramsRef = useRef({
    NEON_COLOR: "#35ff00",
    NEON_COLOR_BLUE_CHROME: "#7171FB",
    NEON_COLOR_CHROME: "#E0E0FF",
    BACKGROUND_COLOR: "#000000",
    GLOW_INTENSITY: 1,
    WAVE_COUNT: 4,
    WAVE_AMPLITUDE: 50, // Reduced from 100
    WAVE_FREQUENCY: 0.006, // Adjusted for smaller size
    BLUR_STRENGTH: 15, // Reduced from 25
    REGENERATE: false,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = 384;
    const height = 384;

    canvas.width = width;
    canvas.height = height;

    function drawNeonText(text: string, x: number, y: number, fontSize: number, fontFamily: string = 'Climate Crisis') {
      ctx!.font = `${fontSize}px '${fontFamily}'`;
      ctx!.fillStyle = paramsRef.current.NEON_COLOR;
      ctx!.shadowColor = paramsRef.current.NEON_COLOR;
      ctx!.shadowBlur = paramsRef.current.BLUR_STRENGTH;
      ctx!.fillText(text, x, y);
    }

    function createNeonSpectrum() {
      for(let layer = 0; layer < 3; layer++) {
        for(let wave = 0; wave < paramsRef.current.WAVE_COUNT; wave++) {
          ctx!.beginPath();
          ctx!.strokeStyle = paramsRef.current.NEON_COLOR_BLUE_CHROME;
          ctx!.lineWidth = 1 + (3 - layer);
          ctx!.shadowColor = paramsRef.current.NEON_COLOR_BLUE_CHROME;
          ctx!.shadowBlur = paramsRef.current.BLUR_STRENGTH * paramsRef.current.GLOW_INTENSITY * (2 - layer);
          
          const baseOffset = height * 0.7;
          const waveOffset = baseOffset - (wave * (height * 0.15));
          
          ctx!.moveTo(0, waveOffset);
          
          for(let x = 0; x < width; x += 10) { // Reduced step from 20 to 10
            const individualAmplitude = paramsRef.current.WAVE_AMPLITUDE * (1 + Math.sin(wave * 0.5) * 0.5);
            
            const distortY = 
              Math.sin(x * paramsRef.current.WAVE_FREQUENCY + wave * 0.5) * individualAmplitude +
              Math.sin(x * paramsRef.current.WAVE_FREQUENCY * 2 + wave) * (individualAmplitude * 0.5) +
              Math.sin(x * paramsRef.current.WAVE_FREQUENCY * 0.5) * (individualAmplitude * 0.3);
            
            const y = waveOffset + distortY;
            
            if(x === 0) {
              ctx!.moveTo(x, y);
            } else {
              const prevX = x - 10;
              const prevDistortY = 
                Math.sin(prevX * paramsRef.current.WAVE_FREQUENCY + wave * 0.5) * individualAmplitude +
                Math.sin(prevX * paramsRef.current.WAVE_FREQUENCY * 2 + wave) * (individualAmplitude * 0.5) +
                Math.sin(prevX * paramsRef.current.WAVE_FREQUENCY * 0.5) * (individualAmplitude * 0.3);
              
              const prevY = waveOffset + prevDistortY;
              
              const cpx = prevX + (x - prevX) / 2;
              const cpy = prevY + (y - prevY) / 2;
              
              ctx!.quadraticCurveTo(cpx, cpy, x, y);
            }
          }
          ctx!.stroke();
        }
      }
    }

    function createNeonSpectrumForPlanet() {
      const centerX = width/2;
      const centerY = height/2;
      const planetRadius = 150; // Reduced from 450
      const orbitRadius = planetRadius + 30; // Reduced from 100

      for(let layer = 0; layer < 4; layer++) {
        for(let wave = 0; wave < paramsRef.current.WAVE_COUNT; wave++) {
          ctx!.beginPath();
          ctx!.strokeStyle = paramsRef.current.NEON_COLOR_BLUE_CHROME;
          ctx!.lineWidth = 1 + (3 - layer);
          ctx!.shadowColor = paramsRef.current.NEON_COLOR_BLUE_CHROME;
          ctx!.shadowBlur = paramsRef.current.BLUR_STRENGTH * paramsRef.current.GLOW_INTENSITY * (2 - layer);
          
          for(let angle = 0; angle < Math.PI * 2; angle += 0.15) {
            const baseX = centerX + Math.cos(angle) * orbitRadius;
            const baseY = centerY + Math.sin(angle) * orbitRadius;
            
            const distortion = Math.sin(angle * 6 + wave * 0.5) * paramsRef.current.WAVE_AMPLITUDE * 0.5;
            const x = baseX + Math.cos(angle + Math.PI/2) * distortion;
            const y = baseY + Math.sin(angle + Math.PI/2) * distortion;
            
            if(angle === 0) {
              ctx!.moveTo(x, y);
            } else {
              ctx!.lineTo(x, y);
            }
          }
          ctx!.closePath();
          ctx!.stroke();
        }
      }
    }

    function drawPill() {
      ctx!.save();
      
      const pillWidth = 150; // Reduced from 300
      const pillHeight = 60; // Reduced from 120
      const radius = pillHeight / 2;
      const x = width/2 - pillWidth/2;
      const y = height/2 - pillHeight/2;
      
      // Draw pill outline with glow
      ctx!.beginPath();
      ctx!.moveTo(x + radius, y);
      ctx!.lineTo(x + pillWidth - radius, y);
      ctx!.arcTo(x + pillWidth, y, x + pillWidth, y + radius, radius);
      ctx!.arcTo(x + pillWidth, y + pillHeight, x + pillWidth - radius, y + pillHeight, radius);
      ctx!.lineTo(x + radius, y + pillHeight);
      ctx!.arcTo(x, y + pillHeight, x, y + pillHeight - radius, radius);
      ctx!.arcTo(x, y, x + radius, y, radius);
      ctx!.closePath();
      
      // Multiple strokes for glow effect
      ctx!.strokeStyle = '#00ff0020';
      ctx!.lineWidth = 15; // Reduced from 30
      ctx!.shadowColor = '#00ff00';
      ctx!.shadowBlur = 25; // Reduced from 50
      ctx!.stroke();
      
      // Inner glow
      ctx!.strokeStyle = '#00ff0030';
      ctx!.lineWidth = 10; // Reduced from 20
      ctx!.shadowBlur = 20; // Reduced from 40
      ctx!.stroke();
      
      // Fill
      ctx!.fillStyle = '#000000';
      ctx!.shadowColor = '#000000';
      ctx!.shadowBlur = 15; // Reduced from 30
      ctx!.shadowOffsetY = 5; // Reduced from 10
      ctx!.fill();
      
      // Details
      ctx!.strokeStyle = '#00ff0040';
      ctx!.lineWidth = 4; // Reduced from 8
      ctx!.shadowColor = '#00ff00';
      ctx!.shadowBlur = 17; // Reduced from 35
      ctx!.stroke();
      
      // Final outline
      ctx!.strokeStyle = '#00ff00';
      ctx!.lineWidth = 2; // Reduced from 3
      ctx!.shadowBlur = 12; // Reduced from 25
      ctx!.shadowOffsetY = 0;
      ctx!.stroke();
      
      // Center line
      ctx!.beginPath();
      ctx!.moveTo(x + pillWidth/2, y);
      ctx!.lineTo(x + pillWidth/2, y + pillHeight);
      ctx!.strokeStyle = '#00ff0040';
      ctx!.lineWidth = 4;
      ctx!.shadowBlur = 17;
      ctx!.stroke();
      
      ctx!.beginPath();
      ctx!.moveTo(x + pillWidth/2, y);
      ctx!.lineTo(x + pillWidth/2, y + pillHeight);
      ctx!.strokeStyle = '#00ff00';
      ctx!.lineWidth = 2;
      ctx!.shadowBlur = 12;
      ctx!.stroke();
      
      // Reflections
      const gradient = ctx!.createLinearGradient(x, y, x + pillWidth, y + pillHeight);
      gradient.addColorStop(0, 'rgba(255, 255, 255, 0.1)');
      gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0)');
      gradient.addColorStop(1, 'rgba(255, 255, 255, 0.1)');
      
      ctx!.fillStyle = gradient;
      ctx!.globalCompositeOperation = 'overlay';
      ctx!.fill();
      
      ctx!.restore();
    }

    function drawParticles() {
      const particleCount = 100; // Reduced from 250
      ctx!.shadowColor = paramsRef.current.NEON_COLOR_BLUE_CHROME;
      ctx!.shadowBlur = paramsRef.current.BLUR_STRENGTH;
      ctx!.fillStyle = paramsRef.current.NEON_COLOR_BLUE_CHROME;
      
      for(let i = 0; i < particleCount; i++) {
        const x = Math.random() * width;
        const y = Math.random() * height;
        const size = 2 + Math.random() * 2; // Reduced from 4 + random * 4
        
        ctx!.beginPath();
        ctx!.arc(x, y, size, 0, Math.PI * 2);
        ctx!.fill();
        
        const clusterSize = Math.floor(Math.random() * 3) + 2;
        for(let j = 0; j < clusterSize; j++) {
          const distance = 10 + Math.random() * 15; // Reduced from 20 + random * 30
          const angle = Math.random() * Math.PI * 2;
          const clusterX = x + Math.cos(angle) * distance;
          const clusterY = y + Math.sin(angle) * distance;
          const clusterSize = size * (0.3 + Math.random() * 0.5);
          
          ctx!.beginPath();
          ctx!.arc(clusterX, clusterY, clusterSize, 0, Math.PI * 2);
          ctx!.fill();
        }
      }
    }

    function drawBinaryLines() {
      ctx!.font = "16px monospace"; // Reduced from 32px
      ctx!.textAlign = 'center';
      
      const columnWidth = 20; // Reduced from 40
      const columns = Math.floor(width / columnWidth);
      const verticalSpacing = 16; // Reduced from 32
      const centerX = width/2;
      const centerY = height/2;
      const elementRadius = 175; // Reduced from 350
      
      for(let i = 0; i < columns; i++) {
        const x = i * columnWidth;
        const columnHeight = Math.random() * height;
        const startY = -Math.random() * height;
        
        const gradient = ctx!.createLinearGradient(x, startY, x, columnHeight);
        gradient.addColorStop(0, 'transparent');
        gradient.addColorStop(0.2, paramsRef.current.NEON_COLOR);
        gradient.addColorStop(0.8, paramsRef.current.NEON_COLOR);
        gradient.addColorStop(1, 'transparent');
        
        ctx!.fillStyle = gradient;
        ctx!.shadowColor = paramsRef.current.NEON_COLOR;
        ctx!.shadowBlur = paramsRef.current.BLUR_STRENGTH;
        
        let shouldContinue = true;
        const charCount = Math.floor(columnHeight / verticalSpacing);
        
        for(let j = 0; j < charCount && shouldContinue; j++) {
          const y = (startY + j * verticalSpacing) % height;
          
          const distanceToCenter = Math.sqrt(
            Math.pow(x - centerX, 2) + 
            Math.pow(y - centerY, 2)
          );
          
          if (distanceToCenter <= elementRadius) {
            shouldContinue = false;
          } else {
            const opacity = Math.random() * 0.5 + 0.5;
            ctx!.globalAlpha = opacity;
            ctx!.fillText(Math.random() > 0.5 ? '1' : '0', x, y);
          }
        }
      }
      ctx!.globalAlpha = 1;
    }

    function drawPlanetWithPill() {
      const planetGradient = ctx!.createRadialGradient(
        width/2, height/2, 0,
        width/2, height/2, 150 // Reduced from 450
      );
      planetGradient.addColorStop(0, paramsRef.current.NEON_COLOR);
      planetGradient.addColorStop(0.3, `${paramsRef.current.NEON_COLOR}60`);
      planetGradient.addColorStop(1, 'transparent');

      ctx!.shadowColor = paramsRef.current.NEON_COLOR;
      ctx!.shadowBlur = paramsRef.current.BLUR_STRENGTH * 4;
      ctx!.fillStyle = planetGradient;
      ctx!.beginPath();
      ctx!.arc(width/2, height/2, 100, 0, Math.PI * 2); // Reduced from 300
      ctx!.fill();

      ctx!.strokeStyle = paramsRef.current.NEON_COLOR;
      ctx!.lineWidth = 2; // Reduced from 3
      ctx!.beginPath();
      ctx!.ellipse(width/2, height/2, 200, 50, Math.PI / 6, 0, Math.PI * 2); // Reduced from 600, 150
      ctx!.stroke();

      // Center pill
      ctx!.save();
      ctx!.strokeStyle = paramsRef.current.NEON_COLOR;
      ctx!.lineWidth = 2; // Reduced from 4
      ctx!.shadowColor = paramsRef.current.NEON_COLOR;
      ctx!.shadowBlur = paramsRef.current.BLUR_STRENGTH * 2;

      const pillWidth = 140; // Reduced from 280
      const pillHeight = 60; // Reduced from 120
      const radius = pillHeight / 2;
      const x = width/2 - pillWidth/2;
      const y = height/2 - pillHeight/2;

      ctx!.beginPath();
      ctx!.moveTo(x + radius, y);
      ctx!.lineTo(x + pillWidth - radius, y);
      ctx!.arcTo(x + pillWidth, y, x + pillWidth, y + radius, radius);
      ctx!.arcTo(x + pillWidth, y + pillHeight, x + pillWidth - radius, y + pillHeight, radius);
      ctx!.lineTo(x + radius, y + pillHeight);
      ctx!.arcTo(x, y + pillHeight, x, y + pillHeight - radius, radius);
      ctx!.arcTo(x, y, x + radius, y, radius);
      ctx!.closePath();
      
      for(let i = 0; i < 4; i++) {
        ctx!.stroke();
      }

      ctx!.beginPath();
      ctx!.moveTo(x + pillWidth/2, y);
      ctx!.lineTo(x + pillWidth/2, y + pillHeight);
      ctx!.stroke();

      ctx!.restore();
    }
    
    function drawRandomElement() {
      const elementIndex = Math.floor(Math.random() * ELEMENTS.length);
      const element = ELEMENTS[elementIndex];
      
      switch(element) {
        case "PILL":
          drawPill();
          createNeonSpectrum();
          break;
        case "PARTICLES":
          drawParticles();
          createNeonSpectrum();
          break;
        case "PLANET":
          drawPlanetWithPill();
          createNeonSpectrumForPlanet();
          break;
      }
    }

    function drawCover() {
      if (!ctx) return;

      ctx.fillStyle = paramsRef.current.BACKGROUND_COLOR;
      ctx.fillRect(0, 0, width, height);

      drawRandomElement();
      drawBinaryLines();

      ctx.textAlign = "center";
      drawNeonText("GREEN PILL", width/2, height/5, 60, 'Climate Crisis'); // Reduced from 180
      drawNeonText("LAYLOW", width/2, height/2.5 + height/2, 40, 'Kode Mono'); // Reduced from 120
    }

    // Initialize Tweakpane
    if (!paneRef.current) {
      paneRef.current = new Pane({
        title: 'Cover Controls',
      });

      const colorsFolder = paneRef.current.addFolder({
        title: 'Colors',
      });

      colorsFolder.addBinding(paramsRef.current, "NEON_COLOR", { 
        view: "color",
        label: 'Primary Neon'
      }).on("change", drawCover);

      colorsFolder.addBinding(paramsRef.current, "BACKGROUND_COLOR", { 
        view: "color",
        label: 'Background'
      }).on("change", drawCover);

      const waveFolder = paneRef.current.addFolder({
        title: 'Wave Settings',
      });

      waveFolder.addBinding(paramsRef.current, "WAVE_COUNT", { 
        min: 0, 
        max: 10, 
        step: 1,
        label: 'Count'
      }).on("change", drawCover);

      waveFolder.addBinding(paramsRef.current, "WAVE_AMPLITUDE", { 
        min: 0, 
        max: 150, // Reduced from 300
        step: 5, // Reduced from 10
        label: 'Amplitude'
      }).on("change", drawCover);

      waveFolder.addBinding(paramsRef.current, "WAVE_FREQUENCY", { 
        min: 0.001, 
        max: 0.02, // Increased from 0.01 for better effect at smaller size
        step: 0.001,
        label: 'Frequency'
      }).on("change", drawCover);

      const effectsFolder = paneRef.current.addFolder({
        title: 'Effects',
      });

      waveFolder.addBinding(paramsRef.current, "GLOW_INTENSITY", { 
        min: 0, 
        max: 2, 
        step: 0.1,
        label: 'Intensity'
      }).on("change", drawCover);

      effectsFolder.addBinding(paramsRef.current, "BLUR_STRENGTH", { 
        min: 5, 
        max: 25, // Reduced from 50
        step: 2, // Reduced from 5
        label: 'Blur'
      }).on("change", drawCover);

      paneRef.current.addButton({
        title: '🔄 Generate New Cover',
        label: 'Generate'
      }).on('click', drawCover);
    }

    drawCover();

    return () => {
      if (paneRef.current) {
        paneRef.current.dispose();
        paneRef.current = null;
      }
    };
  }, []);

  return (
    <div className="relative w-full flex items-center justify-center bg-black">
      <canvas
        ref={canvasRef}
        className="w-[384px] h-[384px]"
      />
    </div>
  );
}